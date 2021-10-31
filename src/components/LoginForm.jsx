import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import auth from '../services/authService';
import Form from './common/Form';

class LoginForm extends Form {
	state = {
		data   : { email: '', password: '' },
		errors : {}
	};

	schema = Joi.object({
		email    : Joi.string().required().label('Email'),
		password : Joi.string().required().label('Password')
	});

	doSubmit = async () => {
		const { email, password } = this.state.data;
		// Call the server
		try {
			await auth.login(email, password);
			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const data = { ...this.state.data };
				const errors = { ...this.state.errors };
				data.password = '';
				errors.email = ex.response.data;
				this.setState({ data, errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;

		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
