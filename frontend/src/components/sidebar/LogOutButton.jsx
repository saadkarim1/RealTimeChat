import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export default function LogOutButton() {
	const { loading, logout } = useLogout();
	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 cursor-pointer text-white' onClick={logout}/>
			) : (
				<span className="loading loasing-spinner"></span>
			)}
		</div>
	);
}
