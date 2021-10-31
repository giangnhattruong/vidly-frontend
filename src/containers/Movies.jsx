import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from '../components/common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../components/ListGroup';
import MoviesTable from '../components/MoviesTable';
import SearchForm from '../components/common/SearchForm';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies          : [],
		genres          : [],
		currentUser     : { likes: [] },
		pageSize        : 3,
		currentPage     : 1,
		selectedGenreId : '',
		sortingValue    : { path: 'title', order: 'asc' },
		searchQuery     : ''
	};

	getPagedData = () => {
		const { movies: allMovies, pageSize, currentPage, selectedGenreId, sortingValue, searchQuery } = this.state;
		let filteredMovies = this.filterMoviesByGenre(allMovies, selectedGenreId);
		if (searchQuery) {
			filteredMovies = this.filterMovieBySearch(allMovies, searchQuery);
		}
		const sortedMovies = _.orderBy(filteredMovies, [ sortingValue.path ], [ sortingValue.order ]);
		const movies = paginate(sortedMovies, currentPage, pageSize);
		const { length: totalCount } = sortedMovies;
		return { totalCount, data: movies };
	};

	view = () => {
		const { movies, currentUser, pageSize, currentPage, sortingValue, searchQuery } = this.state;
		const { totalCount, data } = this.getPagedData();
		const { user } = this.props;

		let text = 'There are no movies';
		let table = null;

		if (totalCount !== 0) {
			text = `Showing ${totalCount} movies`;
			table = (
				<React.Fragment>
					<MoviesTable
						movies={data}
						currentUser={currentUser}
						onMovieDelete={this.handleDelete}
						onMovieLike={this.handleLike}
						onMovieSort={this.handleSort}
						sortingValue={sortingValue}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{user && (
					<Link to="/movies/new" className="btn btn-primary mb-3">
						New Movie
					</Link>
				)}
				<p className="mb-3 text-muted">{text}</p>
				<SearchForm data={movies} value={searchQuery} labelKey="title" onChange={this.handleSearchChange} />
				{table}
			</React.Fragment>
		);
	};

	handlePageChange = (page) => {
		this.setState({
			currentPage : page
		});
	};

	handleLike = (movieId) => {
		let currentUser = { ...this.state.currentUser };
		if (currentUser.likes.includes(movieId)) {
			let spliceIndex = currentUser.likes.indexOf(movieId);
			currentUser.likes.splice(spliceIndex, 1);
		} else {
			currentUser.likes.push(movieId);
		}
		this.setState({
			...this.state,
			currentUser
		});
	};

	handleDelete = async (id) => {
		const originalMovies = this.state.movies;

		const movies = originalMovies.filter((m) => m._id !== id);
		this.setState({ movies });

		try {
			await deleteMovie(id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error('This movie has already been deleted.');
			}

			this.setState({ movies: originalMovies });
		}
	};

	handleGenreSelect = (selectedGenreId = '') => {
		this.setState({
			selectedGenreId,
			searchQuery     : '',
			currentPage     : 1
		});
	};

	handleSearchChange = (searchQuery = '') => {
		this.setState({
			searchQuery,
			selectedGenreId : '',
			currentPage     : 1
		});
	};

	handleSort = (sortingValue) => {
		this.setState({ sortingValue });
	};

	async componentDidMount() {
		const { data: movies } = await getMovies();
		const { data: genres } = await getGenres();
		this.setState({
			movies,
			genres : [ { _id: '', name: 'All Genres' }, ...genres ]
		});
	}

	componentDidUpdate() {
		const { movies: allMovies, currentPage, pageSize, selectedGenreId, searchQuery } = this.state;
		let filteredMovies = this.filterMoviesByGenre(allMovies, selectedGenreId);
		if (searchQuery) {
			filteredMovies = this.filterMovieBySearch(allMovies, searchQuery);
		}
		const { length: totalCount } = filteredMovies;
		if ((currentPage - 1) * pageSize + 1 > totalCount && currentPage > 1) {
			this.handlePageChange(currentPage - 1);
		}
	}

	render() {
		const { genres, selectedGenreId } = this.state;
		return (
			<React.Fragment>
				<h2 className="my-5 text-center">Movie List</h2>
				<div className="row">
					<div className="col-4 col-md-3">
						<ListGroup
							genres={genres}
							onItemSelect={this.handleGenreSelect}
							selectedItem={selectedGenreId}
						/>
					</div>
					<div className="col">{this.view()}</div>
				</div>
			</React.Fragment>
		);
	}

	filterMovieBySearch = (allMovies, string) => {
		if (string) {
			return allMovies.filter((m) => m.title.toLowerCase().includes(string.toLowerCase()));
		}
		return allMovies;
	};

	filterMoviesByGenre = (allMovies, selectedGenreId) => {
		if (selectedGenreId) {
			return allMovies.filter((m) => m.genre._id === selectedGenreId);
		}
		return allMovies;
	};
}

export default Movies;
