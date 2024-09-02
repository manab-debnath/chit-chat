import React, { useContext } from "react";
import ProfileImage from "../../assets/Unknown_person.jpg";
import GreenDot from "../../assets/green_dot.png";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

const RightSideBar = () => {

	const {chatUser, userData} = useContext(AppContext)

	return (
		<div className="text-white bg-blue-500 relative h-full overflow-y-scroll rounded-md">
			{" "}
			{/* rs */}
			<div className="pt-15 text-center max-w-70% m-auto">
				{" "}
				{/* rs-profile */}
				<img
					src={ProfileImage}
					alt=""
					className="max-w-32 aspect-square rounded-full"
				/>
				<h3 className="text-lg font-normal flex items-center justify-center gap-1.5 mx-0 my-1.5">
					Men Person <img src={GreenDot} alt="" />
				</h3>{" "}
				{/* dot */}
				<p className="text-xs opacity-80% font-light">
					Hey, There I am using ChitChat
				</p>
			</div>
			<hr className="border-borderColor mx-0 my-4" />
			<div className="py-0 ml-8 px-5 text-sm ">
				{" "}
				{/* rs-media */}
				<p>Media</p>
				<div className="max-h-44 overflow-y-scroll no-scrollbar grid grid-cols-[1fr_1fr_1fr] gap-1.5 mt-2">
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
					<img
						src={ProfileImage}
						alt=""
						className="w-15 rounded-md cursor-pointer"
					/>
				</div>
			</div>
			<button
				className="absolute bottom-5 left-24 bg-orange-600 text-white border-none text-sm font-light py-2 px-65 rounded-lg cursor-pointer"
				onClick={() => logout()}
			>
				Log out
			</button>
		</div>
	);
};

export default RightSideBar;
