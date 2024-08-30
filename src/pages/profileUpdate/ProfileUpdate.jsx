import React, { useState } from "react";
import AvatarIcon from "../../assets/avatar_icon.png";
import ChatIcon from "../../assets/chatIcon.png";

const ProfileUpdate = () => {

	const [image, setImage] = useState(false)

	return (
		<div className="min-h-screen flex items-center justify-center">
			{" "}
			{/* profile */}
			<div className="bg-white flex items-center justify-between min-w-700 rounded-md">
				<form action="" className="flex flex-col gap-5 p-10">
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
							src={image? URL.createObjectURL(image) : AvatarIcon}
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
					/>
					<textarea
						placeholder="Write Profile Bio..."
						required
						className="p-2 min-w-72 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
					></textarea>
					<button
						type="submit"
						className="border-none text-white p-2 text-lg cursor-pointer bg-custom-blue hover:bg-customHover"
					>
						Save
					</button>
				</form>
				<img
					src={image ? URL.createObjectURL(image) :ChatIcon}
					alt=""
					className="max-w-40 aspect-square my-5 mx-auto rounded-full"
				/>
			</div>
		</div>
	);
};

export default ProfileUpdate;
