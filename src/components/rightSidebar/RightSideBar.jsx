import React, { useContext, useState, useEffect } from "react";
import ProfileImage from "../../assets/Unknown_person.jpg";
import GreenDot from "../../assets/green_dot.png";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

const RightSideBar = () => {
	const { chatUser, messages } = useContext(AppContext);
	const [msgImages, setMsgImages] = useState([])

	useEffect(() => {
	  let tempVar = [];
	  messages.map((msg) => {
		if(msg.image)	{
			tempVar.push(msg.image)
		}
	  })
	  
	  setMsgImages(tempVar);
	  

	}, [messages])
	

	return chatUser ? (
		<div className="text-white bg-blue-500 relative h-full overflow-y-scroll rounded-[0_6px_6px_0]">
			{" "}
			{/* rs */}
			<div className="pt-15 text-center max-w-70% m-auto">
				{" "}
				{/* rs-profile */}
				<img
					src={chatUser.userData.avatar}
					alt=""
					className="max-w-28 w-28 aspect-square rounded-[50%]"
				/>
				<h3 className="text-lg font-normal flex items-center justify-center gap-1.5 mx-0 my-1.5">
					{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={GreenDot} alt="" /> : null}
				</h3>{" "}
				{/* dot */}
				<p className="text-xs opacity-80% font-light">
					{chatUser.userData.bio}
				</p>
			</div>
			<hr className="border-borderColor mx-0 my-4" />
			<div className="py-0 ml-8 px-5 text-sm ">
				{" "}
				{/* rs-media */}
				<p>Media</p>
				<div className="max-h-44 overflow-y-scroll no-scrollbar grid grid-cols-[1fr_1fr_1fr] gap-1.5 mt-2">
					{msgImages.map((url, index) => (
						<img
						onClick={() => window.open(url)}
						key={index}
						src={url}
						alt=""
						className="w-20 rounded-md cursor-pointer"
					/>
					))}
					
				</div>
			</div>
			<button
				className="absolute bottom-5 left-24 bg-orange-600 text-white border-none text-sm font-light py-2 px-65 rounded-lg cursor-pointer"
				onClick={() => logout()}
			>
				Log out
			</button>
		</div>
	) : (
		<div className="text-white bg-blue-500 relative h-full overflow-y-scroll rounded-md">
			<button
				className="absolute bottom-5 left-24 bg-orange-600 text-white border-none text-sm font-light py-2 px-65 rounded-lg cursor-pointer"
					onClick={() => logout()}
			>
				Logout
			</button>
		</div>
	);
};

export default RightSideBar;
