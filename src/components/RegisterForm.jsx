import React from 'react';
import Form from './common/Form';
import Joi from 'joi';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
	state = {
		data   : { email: '', password: '', name: '' },
		errors : {}
	};

	schema = Joi.object({
		email    : Joi.string()
			.email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: [ 'com', 'net', 'vn' ] } })
			.required()
			.label('Email'),
		password : Joi.string()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,16}$/)
			.message(
				'Minimum 8 and maximun 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character(@$!%*?&.,)'
			)
			.required()
			.label('Password'),
		name     : Joi.string().required().label('Name')
	});

	doSubmit = async () => {
		const { data } = this.state;
		// Call the server
		try {
			const { headers } = await userService.register(data);
			const jwt = headers['x-auth-token'];
			auth.loginWithJwt(jwt);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
