import store from '../store'
import router from '../router'
import io from 'socket.io-client'
import { prod } from '../util/config' 

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
                        if(response.status === 403 || (response.status === 400 && !payload.guildId)) {
                            store.commit("pushAlert", { type: "danger", message: "You can't manage this guild" });
                            return router.currentRoute.path !== "/" ? router.push("/") : null;
                        }

                        switch(response.status) {
                            case 429:
                                store.commit("pushAlert", { type: "danger", message: "You are being rate limited, calm down buddy." });
                                break;
                            default:
                                store.commit("pushAlert", { type: "danger", message: `Internal server error (${response.status}), please try again later.` });
                                break;
                        }

                        return reject({ code: response.status, error: response.error || "Invalid request"})
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
            store.state.socket = io(prod ? "https://backend.octodev.xyz:8443" : "https://localhost:8443", {
                path: "/ws"
            })
            
            store.state.socket.on("connect", () => { console.log("Connected to WebSocket"); r() })
        } else r()
    })
}