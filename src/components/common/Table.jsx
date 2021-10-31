import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ columns, sortingValue, onMovieSort, movies }) => {
	return (
		<table className="table">
			<TableHeader columns={columns} sortingValue={sortingValue} onMovieSort={onMovieSort} />
			<TableBody data={movies} columns={columns} />
		</table>
	);
};

export default Table;
