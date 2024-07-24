import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSinup from "../../hooks/useSinup";

export default function Signup() {
	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const {loading, signup} = useSinup();
	const hadleOnchengeCheckbox = (gender) => {
		setInputs({ ...inputs, gender: gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('ww')
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full rounded-lg p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign up <span className='text-blue-500'>ChatApp</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10'
							defaultValue={inputs.fullName}
							onChange={(e) => {
								setInputs({ ...inputs, fullName: e.target.value });
							}}
						/>
					</div>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Usename</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10'
							defaultValue={inputs.userName}
							onChange={(e) =>
								setInputs({ ...inputs, userName: e.target.value })
							}
						/>
					</div>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							defaultValue={inputs.password}
							onChange={(e) =>
								setInputs({ ...inputs, password: e.target.value })
							}
						/>
					</div>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							defaultValue={inputs.confirmPassword}
							onChange={(e) =>
								setInputs({ ...inputs, confirmPassword: e.target.value })
							}
						/>
					</div>
					<GenderCheckBox
						onChangeCheckBox={hadleOnchengeCheckbox}
						selectedGender={inputs.gender}
					/>
					<Link
						to='/login'
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have a account?
					</Link>
					<div>
						<button className='btn btn-block btn-sm mt-2'
						disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}</button>
					</div>
				</form>
			</div>
		</div>
	);
}
