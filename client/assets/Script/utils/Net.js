var Global = cc.Class({
    extends: cc.Component,
    statics: {
        ip:"",
        sio:null,
        isPinging:false,
        fnDisconnect:null,
        handlers:{},
        addHandler:function(event,fn){
            if(this.handlers[event]){
                console.log("event:" + event + "' handler has been registered.");
                return;
            }

            var handler = function(data){
                //console.log(event + "(" + typeof(data) + "):" + (data? data.toString():"null"));
                // if(event != "disconnect" && typeof(data) == "string"){
                //     data = JSON.parse(data);
                // }
                fn(data);
            };
            
            this.handlers[event] = handler; 
            console.log("register:function " + event);
         
        },
        connect:function(fnConnect, fnError){
            var self = this;
            this.sio  = new WebSocket(this.ip);
            
            this.sio.onopen = function (event) {
                console.log("Send Text WS was opened.");
                self.sio.connected = true;
                fnConnect(event.data);
            };
            this.sio.onmessage = function (event) {
                console.log("response text msg: " + event.data);
                try{
                    data = JSON.parse(event.data);
                }catch(err){
                    console.log("data parse json error");
                    return;
                }
                cmd = data["command"]
                if(cmd == "undefined"){
                    console.log("command not define");
                    return;
                }
                if (!(cmd in self.handler)){
                    console.log("command not found");
                    return;
                }
                self.handler[cmd](data);
            };
            this.sio.onerror = function (event) {
                console.log("Send Text fired an error");
                if (fnError!=null){
                    fnError(event.data);
                }
            };
            this.sio.onclose = function (event) {
                console.log("WebSocket instance closed.");
                self.sio.connected = false;
                this.sio = null;
            };
            
            this.startHearbeat();
        },
        
        startHearbeat:function(){
            var self = this;
            this.addHandler('game_pong', function(){
                console.log('game_pong');
                self.lastRecieveTime = Date.now(); 
            });

            if(!self.isPinging){
                console.log(1);
                self.isPinging = true;
                setInterval(function(){
                    console.log(3);
                    if(self.sio){
                        console.log(4);
                        if(Date.now() - self.lastRecieveTime > 10000){
                            self.close();
                        }
                        else{
                            self.ping();
                        }                        
                    }
                },5000);
            }   
        },

        ping:function(){
            this.send("ping");
        },

        send:function(event,data){
            if(this.sio.connected){
                if(event==="ping"){
                    this.sio.send(event);
                    return;
                }
                if(data != null && (typeof(data) == "object")){
                    data["command"] = event;
                    data = JSON.stringify(data);
                    //console.log(data);              
                }
                this.sio.send(data);                
            }
        },
    },
});