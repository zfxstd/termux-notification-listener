// called from termux itself, NEED TEST ON OTHER DEVICES

const ipc = require('node-ipc');
const fs = require('fs');
const conf = require('./ipc/conf.js');
const args = require('minimist')(process.argv.slice(2));


ipc.config.socketRoot = conf.socketRoot;
ipc.config.silent = true;

ipc.connectTo("main", function(){
	let send = {
		...args,
		type: "button"
	}

	ipc.of.main.emit("message", send)
	setTimeout(process.exit, 5000 ); // no event from ipc lib to handle this. OR???
})