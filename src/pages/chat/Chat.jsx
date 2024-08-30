import React from "react";
import { ChatBox, LeftSideBar, RightSideBar } from "../../components";

const Chat = () => {
	return (
		<div className="m-20 w-5/6 h-5/6 bg-white rounded-md grid grid-cols-[1fr_2fr_1fr]">
			<LeftSideBar />
			<ChatBox />
			<RightSideBar />
		</div>
	);
};

export default Chat;
