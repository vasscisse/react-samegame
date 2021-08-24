import React, { Component } from 'react';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			errorMsg: ''
		};
		this.regEx = new RegExp('^[a-zA-Z]*$');
	}

	render() {
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
						value={this.state.username}
						placeholder="Enter your name"
						onChange={(evt) => {
							evt.preventDefault();
							let value = evt.target.value.trim().substr(0, 20);
							this.setState({ username: value, errorMsg: '' });
						}}
					/>
					<button
						type="button"
						className="btn btn-secondary input-group-text"
						onClick={() => {
							const username = this.state.username;
							if (username && username.length > 0) {
								if (this.regEx.test(username)) {
									this.props.launchGame(username);
								} else {
									this.setState({ errorMsg: 'Name can contain only letters' });
								}
							} else {
								this.setState({ errorMsg: 'Name cannot be empty' });
							}
						}}
					>
						Play
					</button>
				</div>
				<br />
				<span className="badge badge-light">
					<font color="red">{this.state.errorMsg}</font>
				</span>
			</nav>
		);
	}
}
