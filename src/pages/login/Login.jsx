import React, {useState} from "react";

const SignUp = () => {
	const [currentState, setCurrentState] = useState("Sign up")

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-md w-80">
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<h1 className="text-2xl font-semibold mb-4"> {currentState} </h1>
				{currentState === "Sign up" ? 
					<input
						type="text"
						placeholder="Username"
						required
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
					/>
					: null
				}
				<input
					type="email"
					placeholder="Email"
					required
					className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
				/>
				<input
					type="password"
					placeholder="Password"
					required
					className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
				/>
				<button
					type="submit"
					className="w-full bg-custom-blue border-none  text-white font-semibold py-2 px-4 rounded hover:bg-custom-blue cursor-pointer"
				>
					{currentState === "Sign up" ? "Create account" : currentState}
				</button>
				<div className="flex items-center space-x-2">
					<input type="checkbox" id="terms" className="h-4 w-4 accent-custom-blue border-none rounded" />
					<label htmlFor="terms" className="text-xs text-custom-grey">
						Agree to the terms of use & privacy policy
					</label>
				</div>
				{currentState === "Sign up" ?
					<p className="pl-2 text-sm text-gray-600" onClick={() => setCurrentState("Login")}>
						Already have an account?{" "}
						<span href="#" className="text-blue-500 underline cursor-pointer">
							Login here
						</span>
					</p>
				:
					<p className="pl-2 text-sm text-gray-600" onClick={() => setCurrentState("Sign up")}>
						Create an account{"  "}
						<span href="#" className="text-blue-500 underline cursor-pointer">
							click here
						</span>
					</p>
				}
			</form>
		</div>
	);
};

export default SignUp;
