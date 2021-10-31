import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<input {...rest} autoFocus={name === 'username'} id={name} name={name} className="form-control" />
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
		</div>
	);
};

export default Input;
