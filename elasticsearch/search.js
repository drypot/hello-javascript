var init = require('../main/init');
var tokenize = require('./tokenizer').tokenize;
var mongo = require('../main/mongo');

init.add(function () {

	console.log('search:');

	function search(user, query, pg, pgsize, next) {

		if (query.length == 0) { // es 에 '' 넘어가면 에러난다.
			return next(null, []);
		}
		var form = {
			query: { query_string: { query: query, default_operator: 'and' } },
			sort: [ { cdate : "desc" } ],
			size: pgsize,
			from: pg
		}
		es.search(form, function (err, res) {
			if (err) return next(err);
			if (!res.body.hits) {
				return next(null, []);
			}
			var results = [];
			var categories = user.categories;
			res.body.hits.hits.forEach(function (hit) {
				var s = hit._source;
				var category = categories[s.cid];
				if (category && (s.visible || user.admin)) {
					results.push({
						pid: hit._id,
						tid: s.tid,
						cid: s.cid,
						cdate: s.cdate.getTime(),
						writer: s.writer,
						title: s.title,
						text: s.text.substring(0, 512)
					});
				}
			});
			next(null, results);
		});
	}

});
