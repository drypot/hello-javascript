var mongo = require("mongodb")
var mongoServer = new mongo.Server("localhost", mongo.Connection.DEFAULT_PORT, {})
var mongoDBConn = new mongo.Db('test', mongoServer, {})
var db = null

function drop1() {
	db.collection("t1", function(err, coll) {
		coll.drop()
	})
}
function insert1() {
	db.collection("t1", function(err, coll) {
		coll.insert({name : "snowman", address : "123"})
		coll.insert({name : "snowman2", address : "456"})
		coll.insert({name : "snowman3", address : "789"})
	})
}

function dump1() {
	db.collection("t1", function(err, coll) {
		coll.find(function(err, cursor) {
			cursor.each(function(err, item) {
				if (item) {
					console.log(item)
				} else {
					console.log("loop end")
				}
			})
		})
	})
}

mongoDBConn.open(function(err, db_) {
	db = db_
	drop1()
	insert1()
	dump1()
})

console.log("start")