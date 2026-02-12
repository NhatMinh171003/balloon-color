import Phaser from "phaser";
export default class ReadScene extends Phaser.Scene {
    constructor() {
        super('ReadScene');
    }

    preload() {
        this.load.image('bg_home', 'assets/images/bg/bg_home.jpg');
        this.load.image('btn_replay', 'assets/images/ui/btn_replay.png');
        this.load.image('read_board', 'assets/images/ui/read_board.png');
        this.load.image('sound', 'assets/images/ui/play_sound.png');
        this.load.image('hand', 'assets/images/ui/hand.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'bg_home').setOrigin(0, 0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        //content board
        const boardImg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'read_board').setOrigin(0.5, 0.5);
        boardImg.setScale(
            Math.min(
                this.scale.width / boardImg.width,
                this.scale.height / boardImg.height
            ) * 0.95
        );

        //replay button
        const btnReplay = this.add.image(this.scale.width - 250, 50, 'btn_replay');
        btnReplay.setScale(
            Math.min(
                this.scale.width / btnReplay.width,
                this.scale.height / btnReplay.height
            ) * 0.1
        ).setInteractive({ useHandCursor: true });

        //sound button
        const btnSound = this.add.image(this.scale.width - 350, 620, 'sound');
        btnSound.setScale(
            Math.min(
                this.scale.width / btnSound.width,
                this.scale.height / btnSound.height
            ) * 0.1
        ).setInteractive({ useHandCursor: true });


        //event reolay button
        btnReplay.on('pointerdown', () => {
            console.log('replay');
        });

        //event sound button
        btnSound.on('pointerdown', () => {
            console.log('sound');
        });

    }

    update() {

    }
}