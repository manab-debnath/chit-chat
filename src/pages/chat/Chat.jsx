import React, { useContext, useEffect, useState } from "react";
import { ChatBox, LeftSideBar, RightSideBar } from "../../components";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
	const { chatData, userData } = useContext(AppContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (chatData && userData) {
			setLoading(false);
		}
	}, [chatData, userData]);

	return (
		<div className="h-full flex justify-center items-center">
			{loading ? (
				<p className="text-2xl text-white m-auto">Loading...</p>
			) : (
				<div className="m-20 w-5/6 h-5/6 bg-white rounded-md grid grid-cols-[1fr_2fr_1fr]">
					<LeftSideBar />
					<ChatBox />
					<RightSideBar />
				</div>
			)}
		</div>
	);
};

export default Chat;
