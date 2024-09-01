import React, { useContext, useEffect, useState } from "react";
import AvatarIcon from "../../assets/avatar_icon.png";
import ChatIcon from "../../assets/chatIcon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

const ProfileUpdate = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState(false);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [uid, setUid] = useState("");
	const [prevImg, setPrevImg] = useState("");
	const { setUserData } = useContext(AppContext);

	const profileUpdate = async (e) => {
		e.preventDefault();

		try {
			if (!prevImg && !image) {
				toast.error("Upload profile picture");
			}

			const docRef = doc(db, "users", uid);

			if (image) {
				const imgUrl = await upload(image);
				setPrevImg(imgUrl);
				await updateDoc(docRef, {
					avatar: imgUrl,
					bio: bio,
					name: name,
				});
			} else {
				await updateDoc(docRef, {
					bio: bio,
					name: name,
				});
			}

			const snap = await getDoc(docRef);
			setUserData(snap.data());
			navigate("/chat");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUid(user.uid);
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				console.log(docSnap.data);

				if (docSnap.data().name) {
					setName(docSnap.data.name);
					console.log("name fetch");
				}
				if (docSnap.data().bio) {
					setBio(docSnap.data().bio);
					console.log("bio fetch");
				}
				if (docSnap.data().avatar) {
					setPrevImg(docSnap.data().avatar);
				}
			} else {
				navigate("/");
			}
		});
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center">
			{" "}
			{/* profile */}
			<div className="bg-white flex items-center justify-between min-w-700 rounded-md">
				<form
					action=""
					className="flex flex-col gap-5 p-10"
					onSubmit={profileUpdate}
				>
					<h3 className="font-medium">Profile Details</h3>
					<label
						htmlFor="avatar"
						className="flex items-center gap-2 text-gray-500 cursor-pointer"
					>
						<input
							onChange={(e) => setImage(e.target.files[0])}
							type="file"
							name=""
							id="avatar"
							accept=".png, .jpg, .jpeg"
							hidden
						/>
						<img
							src={image ? URL.createObjectURL(image) : AvatarIcon}
							alt=""
							className="w-12 aspect-square rounded-full"
						/>
						upload profile image
					</label>
					<input
						type="text"
						placeholder="Your name"
						required
						className="p-2 min-w-72 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<textarea
						placeholder="Write Profile Bio..."
						required
						className="p-2 min-w-72 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
						onChange={(e) => setBio(e.target.value)}
						value={bio}
					></textarea>
					<button
						type="submit"
						className="border-none text-white p-2 text-lg cursor-pointer bg-custom-blue hover:bg-customHover"
					>
						Save
					</button>
				</form>
				<img
					src={
						image ? URL.createObjectURL(image) : prevImg ? prevImg : ChatIcon
					}
					alt=""
					className="max-w-40 aspect-square my-5 mx-auto rounded-full"
				/>
			</div>
		</div>
	);
};

export default ProfileUpdate;
