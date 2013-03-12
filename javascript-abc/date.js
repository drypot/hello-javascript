	// Today

	console.log(new Date());           // ex: 'Tue Mar 12 2013 09:02:56 GMT+0900 (KST)'

	console.log(new Date().getTime()); // ex: 1363046619852
	console.log(Date.now());           // ex: 1363046619852

	// Specific

	// month: 0 ~ 11

	console.log(new Date(1995, 11, 25));                 // 'Mon Dec 25 1995 00:00:00 GMT+0900 (KST)'
	console.log(new Date(1995, 11, 25, 13, 30, 0));      // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'
	console.log(new Date('December 25, 1995'));          // 'Mon Dec 25 1995 00:00:00 GMT+0900 (KST)'
	console.log(new Date('December 25, 1995 13:30:00')); // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'
	console.log(new Date('1995-12-25 13:30:00'));        // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'
	console.log(new Date(819865800000));                 // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'

	console.log(Date.parse('December 25, 1995 13:30:00')); // 819865800000
	console.log(Date.parse('1995-12-25 13:30:00'));        // 819865800000

	console.log(Date.parse('December 25, 1995 13:30:00 GMT+0')); // 819898200000
	console.log(Date.parse('1995-12-25T13:30:00+00:00'));        // 819898200000
	console.log(Date.parse('1995-12-25T13:30:00Z'));             // 819898200000

	console.log(Date.UTC(1995, 11, 25, 13, 30, 0));              // 819898200000

	// gets

	var d = new Date(1995, 11, 25, 13, 30, 0);

	console.log(d.getFullYear()); // 1995
	console.log(d.getMonth()); // 11, 0 ~ 11
	console.log(d.getDate()); // 25

	console.log(d.getDay()); // 1, 0 ~ 6, sunday: 0

	console.log(d.getHours()); // 13
	console.log(d.getMinutes()); // 30
	console.log(d.getSeconds()); // 0

	console.log(d.getMilliseconds()); // 0

	console.log(d.getTime()); // 819865800000
	console.log(d.getTimezoneOffset()); // -540, time-zone offset in minutes

	// gets, UTC

	console.log(d.getUTCFullYear()); // 1995
	console.log(d.getUTCMonth()); // 11, 0 ~ 11
	console.log(d.getUTCDate()); // 25

	console.log(d.getUTCDay()); // 1, 0 ~ 6, sunday: 0

	console.log(d.getUTCHours()); // 4
	console.log(d.getUTCMinutes()); // 30
	console.log(d.getUTCSeconds()); // 0

	console.log(d.getUTCMilliseconds()); // 0

	// sets

	// d.setXXX(...);
	// d.setUTCXXX(...);

	// toString

	console.log(d.toString());       // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'
	console.log(d.toLocaleString()); // 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)'
	console.log(d.toUTCString());    // 'Mon, 25 Dec 1995 04:30:00 GMT'
	console.log(d.toISOString());    // '1995-12-25T04:30:00.000Z'

	console.log(d.toDateString());       // 'Mon Dec 25 1995'
	console.log(d.toLocaleDateString()); // 'Monday, December 25, 1995'

	console.log(d.toTimeString());       // '13:30:00 GMT+0900 (KST)'
	console.log(d.toLocaleTimeString()); // '13:30:00'

	// toString, Custom

	function pad(n) {
		var s = "0" + n;
		return s.substr(s.length - 2, 2);
	}

	function formatDateTime (d) {
		return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
	};

	console.log(formatDateTime(d)); // 1995-12-25 13:30