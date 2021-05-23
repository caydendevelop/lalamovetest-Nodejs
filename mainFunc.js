const fs = require("fs");

let add;
let mainFunc = (myArgs, orderList) => {
	switch (myArgs[0]) {
		case "create_order":
			add = {
				orderID: orderList.length + 1,
				from: myArgs[1],
				to: myArgs[2],
				isTaken: false,
			};
			orderList.push(add);
			JSON_orderList = JSON.stringify(orderList);
			fs.writeFile("database.json", JSON_orderList, function (err) {
				if (err) return console.log(err);
				console.log(add.orderID);
			});
			break;

		case "list_orders":
			for (let i = 0; i < orderList.length; i++) {
				if (orderList[i].isTaken == false) {
					console.log(
						orderList[i].orderID +
							"," +
							orderList[i].from +
							"," +
							orderList[i].to
					);
				}
			}
			break;

		case "take_order":
			for (let i = 0; i < orderList.length; i++) {
				if (orderList[i].orderID == myArgs[1]) {
					if (orderList[i].isTaken == false) {
						orderList[i].isTaken = true;
						JSON_orderList = JSON.stringify(orderList);
						fs.writeFile("database.json", JSON_orderList, function (err) {
							if (err) return console.log(err);
						});
						return;
					} else {
						console.log("order already taken");
						return;
					}
				}
			}
			console.log("order does not exist");
			break;

		default:
			console.log("Please input a valid command.");
	}
};

module.exports = mainFunc;
