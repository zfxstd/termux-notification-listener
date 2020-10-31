const ipc = require('node-ipc')
const os = require('os')
const cbs = {}
const conf = require('./conf')

ipc.config.id = 'main'
ipc.config.retry = 1500
ipc.config.socketRoot = conf.socketRoot
ipc.config.silent = true

ipc.serve(function() {
    // console.log("IPC server started!")
    ipc.server.on('message', function(data, socket) {


        if(data.type=="button"){

            if(data.click && cbs["ok-"+data.click]){
                cbs["ok-"+data.click]()
            }

            if(data.delete && cbs["delete-"+data.delete]){
                cbs["delete-"+data.delete]()
            }

            if(data.tap && cbs["tap-"+data.tap]){
                cbs["tap-"+data.tap]()
            }
        
        }

    })
})

// todo here some checks
module.exports = {
    start(name = 'main') {
        // console.log('starting IPC: ' + name)
        ipc.config.id = name
        ipc.server.start()
    },
    register(name, cb) {
        cbs[name] = cb
    },
    unregister(){},
    find(){},
    get(){ return ipc; }
}
