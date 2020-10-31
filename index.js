const termux = require('termux');
const ipc = require('./ipc/main.js');
const random = require('nanoid').nanoid
const path = require('path');


const callbackPath = path.join(__dirname, "callback.js");
const basicAction = path.join(process.env["PREFIX"], "bin/env") + " node " + callbackPath + " "

ipc.start();

function formAction(args){
	return basicAction + args.join(" ")
}

async function makeRun(title, ask, table){
	(await make(title, ask, table)).run()
}
function make(title, ask, table){
	// todo here (some) type checks with deep-defaults or joi

	let notify = termux.notification()
		.title(title)
		.content(ask)
		

	for (let i = 1; i < 4; i++) {		
	
		if(table["btn"+i] && table["btn"+i].name){
			if(table["btn"+i].click){
				const randomId = random();

				ipc.register("ok-"+randomId, table["btn"+i].click);
				notify = notify["button"+i](table["btn"+i].name, formAction(["--click", randomId]))

			}
		}

	};

	if(table.delete){
		const randomId = random();

		ipc.register("delete-"+randomId, table.delete);
		notify = notify.delete(formAction(["--delete", randomId]))

	}


	if(table.tap){
		const randomId = random();
		ipc.register("tap-"+randomId, table.tap);
		notify = notify.tap(formAction(["--tap", randomId]))
	}


	return notify

}


module.exports = {
	make,
	makeRun,
	hasTemux: termux.hasTermux
}