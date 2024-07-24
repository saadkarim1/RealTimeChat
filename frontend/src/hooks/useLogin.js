import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async ({userName, password}) => {
        
		const succes =  () => {
			if (!userName || !password) {
				toast.error("Please fill in all fields wa lmared");
				return false;
			}
			return true;
		};

		if (!succes()) return;
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( {userName, password}),
			});

			const data = await res.json();
			console.log(data)
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			// console.log(error)
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
}

const handleInputError = (userName, password) => {
    
	if (password === undefined) {
        console.log(userName, password);
		toast.error("Please fill in all fields wa lmared");
		return false;
	}

	return true;
};
