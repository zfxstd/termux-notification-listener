const termux = require('termux');
const ipc = require('./ipc/main.js');
const random = require('nanoid').nanoid
const path = require('path');


const callbackPath = path.join(__dirname, "callback.js");
const basicAction = "/data/data/com.termux/files/usr/bin/env node " + callbackPath + " "

ipc.start();

if(!termux.hasTermux){
	return console.log("Please install Termux-API. ");
}

function formAction(args){
	return basicAction + args.join(" ")
}

async function showText(title, ask, btnTable){
	// todo here (some) type checks with deep-defaults or joi

	let notify = termux.notification()
		.title(title)
		.content(ask)
		

		for (let i = 1; i < 4; i++) {		
		
			if(btnTable["btn"+i] && btnTable["btn"+i].name){
				if(btnTable["btn"+i].click){
					const randomId = random();

					ipc.register("ok-"+randomId, btnTable["btn"+i].click);
					notify = notify["button"+i](btnTable["btn"+i].name, formAction(["--click", randomId]))

				}
			}

		};

		if(btnTable.delete){
			const randomId = random();

			ipc.register("delete-"+randomId, btnTable.delete);
			notify = notify.delete(formAction(["--delete", randomId]))

		}


		if(btnTable.tap){
			const randomId = random();

			ipc.register("tap-"+randomId, btnTable.tap);
			notify = notify.tap(formAction(["--tap", randomId]))
		}


		await notify.run()

}


module.exports = {
	showText,
	hasTemux: termux.hasTermux
}