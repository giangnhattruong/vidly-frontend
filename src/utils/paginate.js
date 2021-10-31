import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;
	return _(items).slice(startIndex).take(pageSize).value();
}

// My paginate function without npm lodash
// export function paginate(items, pageNumber, pageSize) {
// 	let startIndex = (pageNumber - 1) * pageSize;
// 	let endIndex = pageNumber * pageSize;
// 	if (pageNumber * pageSize >= items.length) {
// 		endIndex = undefined;
// 	}
// 	return items.slice(startIndex, endIndex);
// }
