import React, { useState } from "react";
import { login, signup, resetPass } from "../../config/firebase";

const SignUp = () => {
	const [currentState, setCurrentState] = useState("Sign up");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (currentState === "Sign up") {
			signup(username, email, password);
		} else if (currentState === "Login") {
			login(email, password);
		}
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-md w-80">
			<form onSubmit={onSubmitHandler} className="flex flex-col space-y-4">
				<h1 className="text-2xl font-semibold mb-4"> {currentState} </h1>
				{currentState === "Sign up" ? (
					<input
						type="text"
						placeholder="Username"
						required
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				) : null}
				<input
					type="email"
					placeholder="Email"
					required
					className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					placeholder="Password"
					required
					className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button
					type="submit"
					className="w-full bg-custom-blue border-none  text-white font-semibold py-2 px-4 rounded hover:bg-custom-blue cursor-pointer"
				>
					{currentState === "Sign up" ? "Create account" : currentState}
				</button>

				{currentState === "Sign up" ? (
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="terms"
							className="h-4 w-4 accent-custom-blue border-none rounded"
							required
						/>
						<label htmlFor="terms" className="text-xs text-custom-grey">
							Agree to the terms of use & privacy policy
						</label>
					</div>
				) : (
					""
				)}
				{currentState === "Sign up" ? (
					<p
						className="pl-2 text-sm text-gray-600"
						onClick={() => setCurrentState("Login")}
					>
						Already have an account?{" "}
						<span href="#" className="text-blue-500 underline cursor-pointer">
							Login here
						</span>
					</p>
				) : (
					<p
						className="pl-2 text-sm text-gray-600"
						onClick={() => setCurrentState("Sign up")}
					>
						Create an account{"  "}
						<span href="#" className="text-blue-500 underline cursor-pointer">
							click here
						</span>
					</p>
				)}
				{currentState === "Login" ? (
					<p
						className="pl-2 text-sm text-gray-600"
						onClick={() => resetPass(email)}
					>
						Forgot Password?{"  "}
						<span href="#" className="text-blue-500 underline cursor-pointer">
							Reset here
						</span>
					</p>
				) : null}
			</form>
		</div>
	);
};

export default SignUp;
