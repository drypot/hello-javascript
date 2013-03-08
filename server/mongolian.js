var mongolian = require("mongolian")
var mongoServer = new mongolian("localhost:27017")
var db = mongoServer.db("test")
var col = db.collection("t1")

col.drop()

col.insert({name : "1", value : "123"})
col.insert({name : "2", value : "456"})
col.insert({name : "3", value : "789"})
col.insert({name : "4", value : 123})
col.insert({name : "5", value : 4294967295})
col.insert({name : "6", value : 4294967296})
col.insert({name : "7", value : 123.5})
col.insert({name : "8", value : new Date()})

col.find().forEach(
	function (doc) {
		console.log(doc)
		console.log(doc._id.generationTime)
	},
	function () {
		console.log("loop end")
	}
)

console.log(new Date())
console.log("start")
