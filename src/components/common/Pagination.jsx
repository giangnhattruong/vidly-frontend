import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
	let styles = { cursor: 'pointer' };

	const { itemsCount, pageSize, currentPage, onPageChange } = props;

	let pagesCount = itemsCount / pageSize;
	const pages = _.range(1, pagesCount + 1);
	const pageList = pages.map((page) => (
		<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
			<button className="page-link" style={styles} onClick={() => onPageChange(page)} href="#">
				{page}
			</button>
		</li>
	));

	const firstPageNumber = 1;
	const lastPageNumber = pages[pages.length - 1];

	return (
		<nav aria-label="Page navigation" className="d-flex justify-content-center">
			<ul className="pagination">
				<li className="page-item">
					<button
						className="page-link"
						style={styles}
						onClick={() => onPageChange(firstPageNumber)}
						href="#"
						aria-label="Previous"
					>
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				{pageList}
				<li className="page-item">
					<button
						className="page-link"
						style={styles}
						onClick={() => onPageChange(lastPageNumber)}
						href="#"
						aria-label="Next"
					>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	itemsCount   : PropTypes.number.isRequired,
	pageSize     : PropTypes.number.isRequired,
	currentPage  : PropTypes.number.isRequired,
	onPageChange : PropTypes.func.isRequired
};

export default Pagination;
