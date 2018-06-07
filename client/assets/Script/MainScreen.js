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
        this.unschedule(this.loadingCallback);
        this.loadingLabel.enabled = false;
        // 头像昵称
        this.headOther.active = true;
        this.PokerBackCenter.active = true;
        this.cards.active = true;

        this.moveCards();

        
        
        this.control.active = true;
       
    },

    moveCards(){
        //  移牌动作
        this.PokerBackUp.active = true;
        this.PokerBackDown.active = true;
        var upRestCardsLabel = this.PokerBackUp.getChildByName("restcard");
        var downRestCardsLabel = this.PokerBackDown.getChildByName("restcard");

        var upPosition = this.PokerBackUp.getPosition();
        var downPosition = this.PokerBackDown.getPosition();

        var moveToUp = cc.moveTo(0.1, upPosition);
        var moveToDown = cc.moveTo(0.1, downPosition);
        var moveUpFinished = cc.callFunc(function(target, upRestCardsLabel){
            console.log(upRestCardsLabel.string);
            upRestCardsLabel.string =  (parseInt(upRestCardsLabel.string) + 1).toString();
        }, this, upRestCardsLabel); 
        var moveDownFinished = cc.callFunc(function(target, downRestCardsLabel){
            downRestCardsLabel.string =  (parseInt(downRestCardsLabel.string) + 1).toString();
        }, this, downRestCardsLabel); 

        var sq = cc.sequence(cc.sequence(moveToUp, moveUpFinished), cc.sequence(moveToDown, moveDownFinished));
        var rp = cc.repeat(sq, 26);
        this.PokerBackCenter.runAction(rp);
    },

    update (dt) {

    },

    chuPai(){
        console.log("出牌");
    },

    shuttle(){
        console.log("洗牌");
    }


});
