import React, { useState } from 'react';

const regEx = /^[a-zA-Z]*$/;

const Login = ({ launchGame }) => {
	const [ username, setUsername ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState('');

	const handleChange = (evt) => {
		evt.preventDefault();
		const value = evt.target.value.trim().substr(0, 20);
		setUsername(value);
		setErrorMsg('');
	};

	const handlePlay = () => {
		if (username && username.length > 0) {
			if (regEx.test(username)) {
				launchGame(username);
			} else {
				setErrorMsg('Name can contain only letters');
			}
		} else {
			setErrorMsg('Name cannot be empty');
		}
	};

	return (
		<nav className="navbar navbar-brand bg-light">
			<div className="input-group">
				<div className="input-group-prepend">
					<div className="input-group-text">Name</div>
				</div>
				<input
					type="text"
					className="form-control"
					name="username"
					value={username}
					placeholder="Enter your name"
					onChange={handleChange}
				/>
				<button type="button" className="btn btn-secondary input-group-text" onClick={handlePlay}>
					Play
				</button>
			</div>
			<br />
			<span className="badge badge-light">
				<font color="red">{errorMsg}</font>
			</span>
		</nav>
	);
};

export default Login;
