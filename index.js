'use strict';

function Destinations(where, options, result) {
	//what type of reroute do we need?
	var type = typeof where;
	switch (type) {
		case 'function':
			//single func call
			result.push(function (req, res, next) {
				return where(req, res, next, options);
			});
			break;

		case 'object':
			//route based on request method
			result.push(function (req, res, next) {
				var method = req.method.toLowerCase();
				//check for error
				if (typeof where[method] != 'function') {
					throw(Error('WhereTo unknown request method ' + req.method));
				}

				//call it now!
				return where[method](req, res, next, options);
			});
			break;

		case 'array':
			//recurse array
			for (var item of where) {
				Destinations(item, options, result);
			}
			break;
		default:
			throw(Error('WhereTo invalid type ' + type));
	}

	//chain
	return result;
}

module.exports = function (where, options) {
	//get routes
	var result = [];
	Destinations(where, options, result);

	//check for error
	if (result.length == 0) {
		throw(Error('WhereTo no routes specified'));
	}

	//do return
	if (result.length == 1) {
		//return 1 item
		return result[0];
	} else {
		//return the array of
		return result;
	}
}