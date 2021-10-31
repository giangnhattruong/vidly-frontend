import React from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';
import Form from './common/Form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
	state = {
		data   : { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
		genres : [],
		errors : {}
	};

	schema = Joi.object({
		title           : Joi.string().required().label('Title'),
		genreId         : Joi.string().required().label('Genre'),
		numberInStock   : Joi.number()
			.ruleset.min(1)
			.max(100)
			.rule({ message: 'Number must be between 1 and 100' })
			.label('Stock'),
		dailyRentalRate : Joi.number()
			.ruleset.min(0)
			.max(10)
			.rule({ message: 'Number must be between 0 and 10' })
			.label('Rate')
	});

	doSubmit = async () => {
		const { match, history } = this.props;
		const { data } = this.state;
		let { id } = match.params;
		id = id !== 'new' ? id : null;
		// Call the server
		try {
			await saveMovie(id, data);
			history.push('/movies');
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				toast.error('Please login first to do this kind of stuff.');
			}
		}
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovie() {
		const { match, history } = this.props;

		try {
			const movieId = match.params.id;
			if (movieId === 'new') return;

			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				return history.replace('/not-found');
			}
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	mapToViewModel(movie) {
		const { title, genre, numberInStock, dailyRentalRate } = movie;
		return {
			title,
			genreId         : genre._id,
			numberInStock,
			dailyRentalRate
		};
	}

	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', genres, '_id', 'name')}
					{this.renderInput('numberInStock', 'Number In Stock', 'number')}
					{this.renderInput('dailyRentalRate', 'Rate', 'number')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default MovieForm;
