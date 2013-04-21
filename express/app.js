var express = require('express');
var app = express();

app.disable('x-powered-by');

app.engine('jade', require('jade').renderFile);
app.set('view engine', 'jade'); // default view engine
app.set('views', 'express/views'); // view root
app.locals.pretty = true;

app.use(app.router);

app.get('/', function (req, res) {
	res.render('hello', {
		title: 'Home'
	})
});

app.use(express.errorHandler());

app.listen(8888);