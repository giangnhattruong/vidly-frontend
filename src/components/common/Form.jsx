import React, { Component } from 'react';
import Input from './Input';
import Select from './Select';

class Form extends Component {
	state = {
		data   : {},
		errors : {}
	};

	validate = () => {
		const { data } = this.state;
		const options = { abortEarly: false };
		const { error } = this.schema.validate(data, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const { schema } = this.schema.$_terms.keys.find((k) => k.key === name);
		const { error } = schema.validate(value);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}

	renderInput(name, label, type = 'text') {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				onChange={this.handleChange}
				label={label}
				value={data[name]}
				type={type}
				error={errors[name]}
			/>
		);
	}

	renderSelect(name, label, options, valueKey, labelKey) {
		const { data, errors } = this.state;
		return (
			<Select
				name={name}
				label={label}
				options={options}
				onChange={this.handleChange}
				value={data[name]}
				error={errors[name]}
				valueKey={valueKey}
				labelKey={labelKey}
			/>
		);
	}
}

export default Form;
