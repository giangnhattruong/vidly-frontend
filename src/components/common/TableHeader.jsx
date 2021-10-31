import React, { Component } from 'react';

class TableHeader extends Component {
	raiseSort = (path) => {
		if (path) {
			const { sortingValue: currentSortingValue, onMovieSort } = this.props;
			let order = 'asc';
			if (currentSortingValue.path === path) {
				order = currentSortingValue.order === 'asc' ? 'desc' : 'asc';
			}
			onMovieSort({ path, order });
		}
	};

	raiseSortIcon = (column) => {
		const { sortingValue } = this.props;
		if (!column.path || column.path !== sortingValue.path) return null;
		let classes = sortingValue.order === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
		return <i className={classes} aria-hidden="true" />;
	};

	render() {
		const { columns } = this.props;
		const styles = { cursor: 'pointer' };
		const tableHeaders = columns.map((column) => (
			<th
				key={column.label || column.key}
				style={column.label ? styles : {}}
				onClick={() => this.raiseSort(column.path)}
				scope="col"
			>
				{column.label} {this.raiseSortIcon(column)}
			</th>
		));

		return (
			<thead>
				<tr>
					<th key="Numth" scope="col">
						#
					</th>
					{tableHeaders}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
