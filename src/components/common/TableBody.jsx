import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
	renderCell = (item, column) => {
		if (column.content) return <td key={column.path || column.key}>{column.content(item)}</td>;
		return <td key={column.path}>{_.get(item, column.path)}</td>;
	};

	render() {
		const { data, columns } = this.props;
		return (
			<tbody>
				{data.map((item, index) => (
					<tr key={item._id}>
						<th key="numth" scope="row">
							{index + 1}
						</th>
						{columns.map((column) => {
							return this.renderCell(item, column);
						})}
					</tr>
				))}
			</tbody>
		);
	}
}

export default TableBody;
