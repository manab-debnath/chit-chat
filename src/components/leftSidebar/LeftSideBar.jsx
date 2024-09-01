import React, { useContext, useState } from "react";
import ChatIcon from "../../assets/chatIcon.png";
import MenuBars from "../../assets/menu-bars.png";
import Person from "../../assets/Unknown_person.jpg";
import Search from "../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { db, logout } from "../../config/firebase";
import { toast } from "react-toastify";
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { AppContext } from "../../context/AppContext";

const LeftSideBar = () => {
	const navigate = useNavigate();
	const {
		userData,
		chatData,
		chatUser,
		setChatUser,
		messagesId,
		setMessagesId,
	} = useContext(AppContext);
	const [user, setUser] = useState(null);
	const [showSearch, setShowSearch] = useState(false);

	const inputHandler = async (e) => {
		try {
			const input = e.target.value;
			if (input) {
				setShowSearch(true);
				const userRef = collection(db, "users");
				const q = query(userRef, where("username", "==", input.toLowerCase()));
				const querySnap = await getDocs(q);

				if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
					let userExist = false;
					chatData.map((user) => {
						if (user.rId === querySnap.docs[0].data().id) {
							userExist = true;
						}
					});
					if (!userExist) {
						setUser(querySnap.docs[0].data());
					}
				} else {
					// setUser(null)
				}
			} else {
				setShowSearch(false);
			}
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	const addChat = async () => {
		const messagesRef = collection(db, "messages");
		const chatsRef = collection(db, "chats");
		try {
			const newMessagesRef = doc(messagesRef);
			await setDoc(newMessagesRef, {
				createAt: serverTimestamp(),
				messages: [],
			});

			await updateDoc(doc(chatsRef, user.id), {
				chatsData: arrayUnion({
					messageId: newMessagesRef.id,
					lastMessage: "",
					rId: userData.id,
					updatedAt: Date.now(),
					messageSeen: true,
				}),
			});

			await updateDoc(doc(chatsRef, userData.id), {
				chatsData: arrayUnion({
					messageId: newMessagesRef.id,
					lastMessage: "",
					rId: user.id,
					updatedAt: Date.now(),
					messageSeen: true,
				}),
			});
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const setChat = async (item) => {
		setMessagesId(item.messageId);
		setChatUser(item);
	};

	return (
		<div className="bg-blue-500 text-white h-screen-4/5 rounded-md overflow-auto">
			<div className="p-5">
				<div className="flex justify-between items-center">
					<img src={ChatIcon} className="size-8 mr-4" />
					<span className="mr-auto">ChitChat</span>
					<div className="relative py-2 px-0 group">
						{" "}
						{/* menu */}
						<img
							src={MenuBars}
							alt=""
							className="max-h-12 opacity-60 cursor-pointer"
						/>
						<div className="absolute top-full right-0 w-32 p-4 rounded-md bg-white text-black hidden group-hover:block">
							{" "}
							{/* sub-menu*/}
							<p
								className="cursor-pointer text-sm hover:bg-gray-200 pl-2 py-2 rounded-md"
								onClick={() => navigate("/profile")}
							>
								Edit Profile
							</p>
							<hr className="border-none h-0.5 bg-dropMenu my-2 mx-0" />
							<p
								className="cursor-pointer text-sm hover:bg-gray-200 pl-2 py-2 rounded-md"
								onClick={() => logout()}
							>
								Logout
							</p>
						</div>
					</div>
				</div>
				<div className="bg-red-500 flex items-center mt-3 gap-6 px-2.5 py-3 rounded-md">
					<img src={Search} alt="" className="w-6 cursor-pointer" />
					<input
						type="text"
						placeholder="Search here..."
						className="bg-transparent border-none outline-none text-sm text-white"
						onChange={inputHandler}
					/>
				</div>
			</div>
			<div className="flex flex-col h-80% overflow-y-scroll no-scrollbar">
				{showSearch && user ? (
					<div
						onClick={addChat}
						className="flex items-center gap-2.5 px-5 py-5 text-sm cursor-pointer hover:bg-msg-color group"
					>
						{" "}
						{/* friends add-user */}
						<img
							src={user?.avatar}
							alt=""
							className="w-9 aspect-square rounded-full "
						/>
						<p className="m-0 font-bold">{user?.name}</p>
					</div>
				) : (
					chatData?.map((item, index) => (
						<div
							onClick={() => setChat(item)}
							key={index}
							className="flex items-center gap-2.5 px-5 py-5 text-sm cursor-pointer hover:bg-msg-color group"
						>
							<img
								src={item.userData.avatar}
								alt=""
								className="w-9 aspect-square rounded-full "
							/>
							<div className="flex flex-col">
								<p className="m-0 font-bold">{item.userData.name}</p>
								<span className="text-xs text-msg-color group-hover:text-white">
									{item.lastMessage}
								</span>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default LeftSideBar;
