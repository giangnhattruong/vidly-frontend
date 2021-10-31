import http from './httpService';

const apiEndpoint = '/genres';

export const getGenres = () => {
	return http.get(apiEndpoint);
};
