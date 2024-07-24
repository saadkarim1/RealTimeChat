import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useSinup() {
	const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

	const signup = async ({
		fullName,
		userName,
		password,
		confirmPassword,
		gender,
	}) => {
    // console.log('ss')
		const succes = handleInputError({
			fullName,
			userName,
			password,
			confirmPassword,
			gender,
		});

		if (!succes) return;
		setLoading(true);

		try {
      const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					fullName,
					userName,
					password,
					confirmPassword,
					gender,
				}),
			});

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message)
    }finally {
      setLoading(false);
    }
	};

  return {loading, signup}
}

const handleInputError = ({
					fullName,
					userName,
					password,
					confirmPassword,
					gender,
				}) => {
          if (!fullName || !userName || !password || !confirmPassword || !gender) {
            // console.log('not')
            toast.error('Please fill in all fields')
            return false
          }

          if (password !== confirmPassword) {
            toast.error('Passwords do not mathc')
            return false;
          }

          if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return false
          }

          return true;
        }
