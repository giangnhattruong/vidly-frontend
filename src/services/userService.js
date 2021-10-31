import http from './httpService';

function userUrl(id) {
	return `/users/${id ? id : ''}`;
}

export const register = (user) => {
	const { email, password, name } = user;
	return http.post(userUrl(), { email, password, name });
};
