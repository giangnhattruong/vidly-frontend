import React from 'react';
import './ListGroup.css';

const ListGroup = (props) => {
	const { genres: allGenres, onItemSelect, selectedItem, textProperty, valueProperty } = props;
	let styles = { cursor: 'pointer' };
	const genres = allGenres.map((g) => (
		<li
			key={g[valueProperty]}
			onClick={() => onItemSelect(g[valueProperty])}
			style={styles}
			className={`list-group-item ${selectedItem === g[valueProperty] ? 'active' : ''}`}
		>
			{g[textProperty]}
		</li>
	));
	return <ul className="list-group">{genres}</ul>;
};

ListGroup.defaultProps = {
	textProperty  : 'name',
	valueProperty : '_id'
};

export default ListGroup;
