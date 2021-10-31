import React from 'react';

const Select = ({ name, label, options, error, valueKey, labelKey, ...rest }) => {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<select {...rest} name={name} id={name} className="form-select" aria-label="Select Input">
				<option key="select-label" value="">{`Select ${label}`}</option>
				{options.map((o) => (
					<option key={o[valueKey]} value={o[valueKey]}>
						{o[labelKey]}
					</option>
				))}
			</select>
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
		</div>
	);
};

export default Select;
