cc.Class({
    extends: cc.Component,

    properties: {
       cards: [],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    addCard(tag){
        cards.push(tag);
        card = cc.Sprite("poker_"+tag);
        this.node.addChild(card);
    
    }

    // update (dt) {},
});
