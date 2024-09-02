import React, { useContext, useEffect, useState } from "react";
import ProfileImg from "../../assets/Unknown_person.jpg";
import GreenDot from "../../assets/green_dot.png";
import HelpIcon from "../../assets/help_icon.png";
import GalleryIcon from "../../assets/gallery_icon.png";
import SendIcon from "../../assets/send-icon.png";
import ChatIcon from "../../assets/chatIcon.png";
import { AppContext } from "../../context/AppContext";
import {
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import upload from "../../lib/upload";

const ChatBox = () => {
	const { userData, messagesId, chatUser, messages, setMessages } =
		useContext(AppContext);
	const [input, setInput] = useState("");

	const sendMessage = async () => {
		try {
			if (input && messagesId) {
				await updateDoc(doc(db, "messages", messagesId), {
					messages: arrayUnion({
						sId: userData.id,
						text: input,
						createdAt: new Date(),
					}),
				});

				const userIDs = [chatUser.rId, userData.id];

				userIDs.forEach(async (id) => {
					const userChatsRef = doc(db, "chats", id);
					const userChatsSnapshot = await getDoc(userChatsRef);

					if (userChatsSnapshot.exists()) {
						const userChatData = userChatsSnapshot.data();
						const chatIndex = userChatData.chatsData.findIndex(
							(c) => c.messageId === messagesId
						);
						userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
						userChatData.chatsData[chatIndex].updatedAt = Date.now();

						if (userChatData.chatsData[chatIndex].rId === userData.id) {
							userChatData.chatsData[chatIndex].messageSeen = false;
						}

						await updateDoc(userChatsRef, {
							chatsData: userChatData.chatsData,
						});
					}
				});
			}
		} catch (error) {
			toast.error(error.message);
		}

		setInput("");
	};

	const sendImage = async (e) => {
		try {
			const fileUrl = await upload(e.target.files[0]);

			if (fileUrl && messagesId) {
				await updateDoc(doc(db, "messages", messagesId), {
					messages: arrayUnion({
						sId: userData.id,
						image: fileUrl,
						createdAt: new Date(),
					}),
				});

				const userIDs = [chatUser.rId, userData.id];

				userIDs.forEach(async (id) => {
					const userChatsRef = doc(db, "chats", id);
					const userChatsSnapshot = await getDoc(userChatsRef);

					if (userChatsSnapshot.exists()) {
						const userChatData = userChatsSnapshot.data();
						const chatIndex = userChatData.chatsData.findIndex(
							(c) => c.messageId === messagesId
						);
						userChatData.chatsData[chatIndex].lastMessage = "Image";
						userChatData.chatsData[chatIndex].updatedAt = Date.now();

						if (userChatData.chatsData[chatIndex].rId === userData.id) {
							userChatData.chatsData[chatIndex].messageSeen = false;
						}

						await updateDoc(userChatsRef, {
							chatsData: userChatData.chatsData,
						});
					}
				});
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (messagesId) {
			const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
				setMessages(res.data().messages.reverse());
				// console.log(res.data().messages.reverse());
			});

			return () => {
				unSub();
			};
		}
	}, [messagesId]);

	const convertTimeStamp = (timeStamp) => {
		let date = timeStamp.toDate();
		const hour = date.getHours();
		const minutes = date.getMinutes();

		if (hour > 12) {
			return hour - 12 + ":" + minutes + " PM";
		} else {
			return hour + ":" + minutes + " AM";
		}
	};

	return chatUser ? (
		// Top bar
		<div className="h-full relative bg-chat-box overflow-auto">
			<div className="px-2.5 py-3.5 flex items-center gap-2.5 border-b border-black bg-[#adadad]">
				<img
					src={chatUser.userData.avatar}
					alt=""
					className="w-10 aspect-square rounded-full"
				/>
				<p
					className="flex-1 font-semibold text-base text-white flex items-center gap-1 dotIcon"
					style={{ width: "15px !important" }}
				>
					{chatUser.userData.name}{" "}
					{Date.now() - chatUser.userData.lastSeen <= 70000 ? (
						<img src={GreenDot} alt="" />
					) : null}
				</p>
				<img
					src={HelpIcon}
					alt=""
					className="w-6 pr-4 aspect-square cursor-pointer"
				/>
			</div>

			{/* messages section */}
			{/* Receive message */}
			<div className="h-msg mx-2 pb-12 overflow-y-scroll no-scrollbar  flex flex-col-reverse">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={
							msg.sId === userData.id
								? "mb-8 rounded-md flex items-end justify-start gap-1.5 px-0 py-4 ml-auto"
								: "flex items-end gap-1.5 px-0 py-4 flex-row-reverse justify-end"
						}
					>
						{" "}
						{/* r-msg */}
						{msg["image"] ? (
							<img
								onClick={() => window.open(msg.image)}
								src={msg.image}
								className="w-64 aspect-square rounded-lg cursor-pointer"
							/>
						) : (
							<p
								className={
									msg.sId === userData.id
										? "bg-orange-600 text-white p-2 max-w-48 text-sm font-light mb-12 rounded-[8px_8px_0_8px]"
										: "bg-orange-600 text-white p-2 max-w-48 text-sm font-light mb-12 rounded-[8px_8px_8px_0]"
								}
							>
								{" "}
								{/* msg */}
								{msg.text}
							</p>
						)}
						<div className="text-center text-xs">
							<img
								src={
									msg.sId === userData.id
										? userData.avatar
										: chatUser.userData.avatar
								}
								alt=""
								className="w-7 aspect-square rounded-full"
							/>
							<p>{convertTimeStamp(msg.createdAt)}</p>
						</div>
					</div>
				))}{" "}
			</div>

			{/* Send message input */}
			<div className="flex items-center gap-3 px-2.5 py-4 rounded-md bg-white absolute bottom-0 right-0 left-0">
				<input
					type="text"
					placeholder="Send a message"
					className="flex-1 border-none outline-none"
					onChange={(e) => setInput(e.target.value)}
					value={input}
				/>
				<input
					type="file"
					id="image"
					accept="image/png, image/jpeg"
					hidden
					onChange={sendImage}
				/>
				<label htmlFor="image" className="flex ">
					<img src={GalleryIcon} alt="" className="w-6 cursor-pointer" />
				</label>
				<img
					src={SendIcon}
					alt=""
					className="w-7 cursor-pointer ml-4"
					onClick={sendMessage}
				/>
			</div>
		</div>
	) : (
		<div className="w-full flex flex-col justify-center items-center gap-1.5 ">
			<img src={ChatIcon} alt="" className="w-15" />
			<p className="text-sm font-semibold text-[#383838]">Chat with anyone</p>
		</div>
	);
};

export default ChatBox;
