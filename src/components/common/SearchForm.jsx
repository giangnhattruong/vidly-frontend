import React, { Component } from 'react';
import Input from './Input';

class SearchForm extends Component {
	render() {
		const { data, labelKey, value, onChange } = this.props;

		return (
			<div className="mb-3">
				<input
					onChange={(e) => {
						onChange(e.currentTarget.value);
					}}
					value={value}
					className="form-control"
					list="datalistOptions"
					id="exampleDataList"
					placeholder="Type to search..."
				/>
				<datalist id="datalistOptions">{data.map((d) => <option key={d._id} value={d[labelKey]} />)}</datalist>
			</div>
		);
	}
}

export default SearchForm;
