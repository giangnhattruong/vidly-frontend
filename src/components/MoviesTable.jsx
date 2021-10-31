import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/Table';
import Like from './common/Like';
import auth from '../services/authService';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key     : 'like',
			content : (movie) => (
				<Like userLikes={this.props.currentUser.likes} onMovieLike={this.props.onMovieLike} id={movie._id} />
			)
		}
	];

	deleteColumn = {
		key     : 'delete',
		content : (movie) => (
			<button onClick={() => this.props.onMovieDelete(movie._id)} className="btn btn-danger btn-sm">
				Delete
			</button>
		)
	};

	constructor() {
		super();
		const user = auth.getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn);
		}
	}

	render() {
		const { movies, onMovieSort, sortingValue } = this.props;
		return <Table movies={movies} columns={this.columns} sortingValue={sortingValue} onMovieSort={onMovieSort} />;
	}
}

export default MoviesTable;
