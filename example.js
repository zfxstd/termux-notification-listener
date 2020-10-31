const {make, makeRun} = require('./index')

async function run(){
	const notify = make("Confirm", "Do you sure???", {
		btn1: {
			name: "im yes",
			click(){
				console.log("clickkKK: yepps!!!")
			}
		},
		btn2: {
			name: "maybe?",
			click(){
				console.log("unsure ~_~")
			}
		},
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

	notify.image("/data/data/com.termux/files/home/1.jpg");
	await notify.run()


}
run()