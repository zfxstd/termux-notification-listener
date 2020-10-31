const {showText} = require('./index')

async function run(){
	await showText("Test Title", "Im ASK", {
		btn1: {
			name: "im yes",
			click(){
				console.log("clickk! yepps!!!")
			}
		},
		btn2: {},
		btn3: {
			name: "im no",
			click(){
				console.log("click no @_@")
			}
		},
		delete(){
			console.log("im deleted -_-")
		},
		tap(){
			console.log("im tapped and removed")
		}
	});
	console.log("test ok?")
}
run()