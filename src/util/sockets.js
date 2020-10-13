import store from '../store'
import router from '../router'
import io from 'socket.io-client'

export default {

    request: function(path, payload) {
        return new Promise((resolve, reject) => {
            connect().then(() => {
                const backend = store.state.socket;
                
                const handler = (response) =>{
                    if(response._path !== path || JSON.stringify(response._payload) !== JSON.stringify(payload)) return;
                    backend.removeListener(path, handler);
    
                    delete response["_path"];
                    delete response["_payload"];
    
                    if(!response.status || response.status < 200 || response.status >= 300) {
                        if(response.status === 403 || (response.status === 400 && !payload.guildId)) return router.currentRoute.path !== "/" ? router.push("/") : null;
                        return reject(`${response.error || "Invalid request"}: ${response.status}`)
                    }
                    resolve(response)
                }
    
                backend.on(path, handler)
                backend.emit(path, payload);
            })
        }) 
    }

}

function connect() {
    return new Promise(r => {
        if(!store.state.socket) {
            store.state.socket = io("http://127.0.0.1:8080", {
                path: "/ws"
            })
            
            store.state.socket.on("connect", () => { console.log("Connected to WebSocket"); r() })
        } else r()
    })
}