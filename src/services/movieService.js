import http from './httpService';

function movieUrl(id) {
	return `/movies/${id ? id : ''}`;
}

export const getMovies = () => {
	return http.get(movieUrl());
};

export const getMovie = (id) => {
	return http.get(movieUrl(id));
};

export const saveMovie = (id, data) => {
	if (id) {
		return http.put(movieUrl(id), data);
	}
	return http.post(movieUrl(), data);
};

export const deleteMovie = (id) => {
	return http.delete(movieUrl(id));
};
