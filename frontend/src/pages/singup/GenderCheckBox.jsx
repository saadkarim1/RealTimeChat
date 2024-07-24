import React from "react";

export default function GenderCheckBox({ onChangeCheckBox, selectedGender }) {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label
					className={`label gap-2 cursor-poiter ${
						selectedGender === "male" && "selected"
					}`}
				>
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "male"}
						onChange={() => {
							onChangeCheckBox("male");
						}}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label
					className={`label gap-2 cursor-poiter ${
						selectedGender === "female" && "selected"
					}`}
				>
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"}
						onChange={() => {
							onChangeCheckBox("female");
						}}
					/>
				</label>
			</div>
		</div>
	);
}
