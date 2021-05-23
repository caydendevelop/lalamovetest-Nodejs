const fs = require("fs");
const mainFunc = require("./mainFunc");

let myArgs = process.argv.slice(2); // get the args without the path
let orderList;

// check whether the json file exist. If not, create one. Else, read it into orderList variable.
if (fs.existsSync("./database.json")) {
	orderList = JSON.parse(fs.readFileSync("database.json"));
	mainFunc(myArgs, orderList);
} else {
	let createStream = fs.createWriteStream("database.json");
	orderList = [];
	fs.writeFile("database.json", JSON.stringify(orderList), function (err) {
		if (err) return console.log(err);
	});
	createStream.end();
	mainFunc(myArgs, orderList);
}
