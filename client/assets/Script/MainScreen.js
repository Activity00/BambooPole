cc.Class({
    extends: cc.Component,

    properties: {
        loadingLabel: cc.Label,
        headOther: cc.Node,
        PokerBackUp: cc.Node,
        PokerBackDown: cc.Node,
        PokerBackCenter: cc.Node,
        control: cc.Node,
        cards: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.vv = {};
        // cc.vv.http = require("HTTP");
        
    },

    start () {
        this.loadingCallback = function() {
            //这里的 this 指向 component
            if(this.loadingLabel.string.split(" ")[1].length >= 6){
                this.loadingLabel.string  = this.loadingLabel.string.split(" ")[0]  + " ";
            }else{
                this.loadingLabel.string += "."
            }
        }
        this.schedule(this.loadingCallback, 1);
        // 获取匹配结果信息
        this.getMatchInfo();

    },

    getMatchInfo(){
        var self = this;
        this.unschedule(this.loadingCallback);
        this.loadingLabel.enabled = false;
        // 头像昵称
        this.headOther.active = true;
        this.PokerBackCenter.active = true;
        this.cards.active = true;
       
        this.net = require("Net");
        this.net.ip = "ws://localhost:8888/game/";
        this.net.connect(function(data){
            self.moveCards();
        }, function(data){
            console.log("failed");
        });
    
    },

    moveCards(){
        //  移牌动作
        self = this;
        this.PokerBackUp.active = true;
        this.PokerBackDown.active = true;
        var upRestCardsLabel = this.PokerBackUp.getChildByName("restcard").getComponent(cc.Label);;
        var downRestCardsLabel = this.PokerBackDown.getChildByName("restcard").getComponent(cc.Label);;
        upRestCardsLabel.string = "0";
        downRestCardsLabel.string = "0";

        var upPosition = this.PokerBackUp.getPosition();
        var downPosition = this.PokerBackDown.getPosition();

        var moveToUp = cc.moveTo(0.1, upPosition);
        var moveToDown = cc.moveTo(0.1, downPosition);
        var moveUpFinished = cc.callFunc(function(target, upRestCardsLabel){
            upRestCardsLabel.string =  (parseInt(upRestCardsLabel.string) + 1).toString();
        }, this, upRestCardsLabel); 
        var moveDownFinished = cc.callFunc(function(target, downRestCardsLabel){
            downRestCardsLabel.string =  (parseInt(downRestCardsLabel.string) + 1).toString();
        }, this, downRestCardsLabel); 

        var moveCardsFinished = cc.callFunc(function(target){
            target.destroy();
            self.control.active = true;
        },this);

        var sq = cc.sequence(cc.sequence(moveToUp, moveUpFinished), cc.sequence(moveToDown, moveDownFinished));
        var rp = cc.repeat(sq, 26);
        this.PokerBackCenter.runAction(cc.sequence(rp, moveCardsFinished));
    },

    update (dt) {

    },

    chuPai(){
        console.log("出牌");
        this.net.send("xxx",{xxx:'ooo'});

    },

    shuttle(){
        console.log("洗牌");
    }


});
