import Phaser from "phaser";
export default class SpeakScene extends Phaser.Scene {
    constructor() {
        super('SpeakScene')
    }
    preload() {
        this.load.image('txtChicken', '\assets\images\speaking\chicken_text.png');
        this.load.image('rectConner', '\assets\images\speaking\rect_conner.png');
        this.load.image('txtSpeaking', '\assets\images\speaking\speaking_text.png');
    }
    create() {
        const bg = this.add.image(0, 0, 'bg_home').setOrigin(0, 0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;
    }
}