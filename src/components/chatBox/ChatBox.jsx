import React, { useContext, useState } from "react";
import ProfileImg from "../../assets/Unknown_person.jpg";
import GreenDot from "../../assets/green_dot.png";
import HelpIcon from "../../assets/help_icon.png";
import GalleryIcon from "../../assets/gallery_icon.png";
import SendIcon from "../../assets/send-icon.png";
import { AppContext } from "../../context/AppContext";

const ChatBox = () => {
	const { userData, messagesId, chatUser, messages, setMessages } =
		useContext(AppContext);
	const [input, setInput] = useState("");

	return (
		// Top bar
		<div className="h-full relative rounded-md bg-chat-box overflow-auto">
			<div className="px-2.5 py-3.5 flex items-center gap-2.5 border-b border-black bg-black">
				<img
					src={ProfileImg}
					alt=""
					className="w-10 aspect-square rounded-full"
				/>
				<p
					className="flex-1 font-semibold text-base text-white flex items-center gap-1 dotIcon"
					style={{ width: "15px !important" }}
				>
					Lady Person <img src={GreenDot} alt="" />
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
				{" "}
				{/* chat-msg */}
				<div className="flex items-end gap-1.5 px-0 py-4 flex-row-reverse justify-end">
					{" "}
					{/* r-msg */}
					<p className="bg-orange-600 text-white p-2 max-w-48 text-sm font-light mb-8 rounded-[8px_8px_8px_0]">
						{" "}
						{/* msg */}
						Lorem ipsum dolor sit amet.
					</p>
					<div className="text-center text-xs">
						<img
							src={ProfileImg}
							alt=""
							className="w-7 aspect-square rounded-full"
						/>
						<p>2:44 PM</p>
					</div>
				</div>
				{/* Receive photo */}
				<div className="mb-8 rounded-md flex items-end justify-end gap-1.5 px-0 py-4 flex-row-reverse">
					{" "}
					{/* msg-img */}
					<img src={ProfileImg} alt="" className="w-56 aspect-square" />
					<div className="text-center text-xs">
						<img
							src={ProfileImg}
							alt=""
							className="w-7 aspect-square rounded-full"
						/>
						<p>2:44 PM</p>
					</div>
				</div>
				{/* Send message */}
				<div className="flex items-end justify-end gap-1.5 px-0 py-4 ">
					{" "}
					{/* r-msg */}
					<p className="bg-orange-600 text-white p-2 max-w-48 text-sm font-light rounded-[8px_8px_0_8px] mb-8">
						{" "}
						{/* msg */}
						Lorem ipsum dolor sit amet.
					</p>
					<div className="text-center text-xs">
						<img
							src={ProfileImg}
							alt=""
							className="w-7 aspect-square rounded-full"
						/>
						<p>2:44 PM</p>
					</div>
				</div>
				<div className="flex items-end justify-end gap-1.5 px-0 py-4 ">
					{" "}
					{/* s-msg */}
					<p className="bg-orange-600 text-white p-2 max-w-48 text-sm font-light rounded-[8px_8px_0_8px] mb-8">
						{" "}
						{/* msg */}
						Lorem ipsum dolor etret.
					</p>
					<div className="text-center text-xs">
						<img
							src={ProfileImg}
							alt=""
							className="w-7 aspect-square rounded-full"
						/>
						<p>2:44 PM</p>
					</div>
				</div>
				{/* Send photo */}
				<div className="flex items-end justify-end gap-1.5 px-0 py-4 ">
					{" "}
					{/* r-msg */}
					<img src={ProfileImg} alt="" className="w-56 aspect-square" />
					<div className="text-center text-xs">
						<img
							src={ProfileImg}
							alt=""
							className="w-7 aspect-square rounded-full"
						/>
						<p>2:44 PM</p>
					</div>
				</div>
			</div>

			{/* Send message input */}
			<div className="flex items-center gap-3 px-2.5 py-4 rounded-md bg-white absolute bottom-0 right-0 left-0">
				<input
					type="text"
					placeholder="Send a message"
					className="flex-1 border-none outline-none"
				/>
				<input type="file" id="image" accept="image/png, image/jpeg" hidden />
				<label htmlFor="image" className="flex ">
					<img src={GalleryIcon} alt="" className="w-6 cursor-pointer" />
				</label>
				<img src={SendIcon} alt="" className="w-7 cursor-pointer ml-4" />
			</div>
		</div>
	);
};

export default ChatBox;
