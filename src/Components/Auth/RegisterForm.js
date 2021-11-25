import React, { useState } from 'react';
import '../FormStyles.css';

const RegisterForm = () => {
	const [initialValues, setInitialValues] = useState({
		name: '',
		lastName: '',
	});

	const handleChange = (e) => {
		if (e.target.name === 'name') {
			setInitialValues({ ...initialValues, name: e.target.value });
		}
		if (e.target.name === 'lastName') {
			setInitialValues({ ...initialValues, lastName: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(initialValues);
		localStorage.setItem('token', 'tokenValueExample');
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<input
				className="input-field"
				name="name"
				placeholder="Enter name"
				type="text"
				value={initialValues.name}
				onChange={handleChange}
			/>
			<input
				className="input-field"
				name="lastName"
				placeholder="Enter last name"
				type="text"
				value={initialValues.lastName}
				onChange={handleChange}
			/>
			<button className="submit-btn" type="submit">
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
