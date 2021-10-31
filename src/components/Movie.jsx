import React from 'react';
import Like from './common/Like';

const Movie = ({ movie, index, onMovieDelete, userLikes, onMovieLike }) => {
	return (
		<tr>
			<th scope="row">{index + 1}</th>
			<td>{movie.title}</td>
			<td>{movie.genre.name}</td>
			<td>{movie.numberInStock}</td>
			<td>{movie.dailyRentalRate}</td>
			<td>
				<Like userLikes={userLikes} onMovieLike={onMovieLike} id={movie._id} />
			</td>
			<td className="d-flex justify-content-end">
				<button onClick={() => onMovieDelete(movie._id)} className="btn btn-danger btn-sm">
					Delete
				</button>
			</td>
		</tr>
	);
};

export default Movie;
