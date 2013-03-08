var mysql = require('mysql');

var client = new mysql.Client();

client.host = "localhost";
client.user = "root";
client.database = "test";

client.connect();

//client.query(
//	'select * from postthread where id between ? and ?', [50, 60], function (err, results, fields) {
//		if (err) throw err;
//		console.log(results);
//		console.log(fields);
//		client.end();
//	}
//);

client.query(
	'insert into t1(title) values ("hello")', function (err, info) {
		console.log(info.insertId);
		console.log(info);
	}
);