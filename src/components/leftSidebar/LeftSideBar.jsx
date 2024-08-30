import React from "react";
import ChatIcon from "../../assets/chatIcon.png";
import MenuBars from "../../assets/menu-bars.png";
import Person from "../../assets/Unknown_person.jpg";
import Search from "../../assets/search.png";

const LeftSideBar = () => {
	return (
		<div className="bg-blue-500 text-white h-screen-4/5 rounded-md overflow-auto">
			<div className="p-5">
				<div className="flex justify-between items-center">
					<img src={ChatIcon} className="size-8 mr-4" />
					<span className="mr-auto">ChitChat</span>
					<div>
						<img
							src={MenuBars}
							alt=""
							className="max-h-12 opacity-60 cursor-pointer"
						/>
					</div>
				</div>
				<div className="bg-red-500 flex items-center mt-3 gap-6 px-2.5 py-3 rounded-md">
					<img src={Search} alt="" className="w-6 cursor-pointer" />
					<input
						type="text"
						placeholder="Search here..."
						className="bg-transparent border-none outline-none text-sm text-white"
					/>
				</div>
			</div>
			<div className="flex flex-col h-80% overflow-y-scroll no-scrollbar">
				{Array(12)
					.fill("")
					.map((item, index) => (
						<div
							key={index}
							className="flex items-center gap-2.5 px-5 py-5 text-sm cursor-pointer hover:bg-msg-color group"
						>
							<img
								src={Person}
								alt=""
								className="w-9 aspect-square rounded-full "
							/>
							<div className="flex flex-col">
								<p className="m-0 font-bold">Male Person</p>
								<span className="text-xs text-msg-color group-hover:text-white">
									Hello, How are you?
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default LeftSideBar;
