import React from 'react';

const Like = ({ id, userLikes, onMovieLike }) => {
	let classes = 'fa fa-heart';
	if (!userLikes.includes(id)) {
		classes += '-o';
	}

	let styles = { cursor: 'pointer' };

	return <i className={classes} onClick={() => onMovieLike(id)} style={styles} aria-hidden="true" />;
};

export default Like;
