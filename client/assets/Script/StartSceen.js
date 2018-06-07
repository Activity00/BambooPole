cc.Class({
    extends: cc.Component,

    properties: {
        //fastBtn: cc.Button,
        // createRoomBtn: cc.Button,
        // rankBtn: cc.Button,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    fastStartBtnClick(){
        cc.director.loadScene("main");
    },
    createRoomClick(){
        cc.director.loadScene("main");
    },
    randBtnClick(){
        cc.director.loadScene("main");
    }

});
