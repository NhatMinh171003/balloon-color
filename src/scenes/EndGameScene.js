import Phaser from "phaser";
export default class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGameScene');
    }

    create() {
        const bg = this.add.image(0, 0, "bg_home").setOrigin(0);
        const complete = this.add.image(this.scale.width / 2, this.scale.height / 2 - this.scale.height * 0.1, "complete").setOrigin(0.5);
        const applause_sound = this.sound.add('applause_sound');
        const complete_sound = this.sound.add('complete_sound');


        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        complete.displayWidth = this.scale.width * 1.2;
        complete.displayHeight = this.scale.height * 1.2;

        applause_sound.play();
        complete_sound.play();

    }
}