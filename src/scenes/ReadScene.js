import Phaser from "phaser";
import { addButtonEffect } from '../utils/buttonEffect.js';

export default class ReadScene extends Phaser.Scene {
    constructor() {
        super('ReadScene');
    }

    preload() {

    }

    create() {
        const bg = this.add.image(0, 0, 'bg_home').setOrigin(0, 0);
        const poetry_guide_sound = this.sound.add('poetry_guide_sound');
        this.audioPlaying = true;
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
        //banner
        const banner = this.add.image(this.scale.width / 2, 50, 'banner');
        banner.setScale(
            Math.min(
                this.scale.width / boardImg.width,
                this.scale.height / boardImg.height
            )
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
        addButtonEffect(this, btnReplay);
        addButtonEffect(this, btnSound);

        // âm thanh hướng dẫn
        this.time.delayedCall(1000, () => {
            poetry_guide_sound.play();
            poetry_guide_sound.once('complete', () => {
                this.audioPlaying = false;
            });
        });

        //event reolay button
        btnReplay.on('pointerdown', () => {
            if (this.audioPlaying) return;
            this.sound.play('click_sound');
            this.scene.start('ReadScene');
            this.audioPlaying = true;
        });

        //event sound button
        btnSound.on('pointerdown', () => {
            if (this.audioPlaying) return;
            this.sound.play('click_sound');
            this.scene.start('SpeakScene');
        });

    }

    update() {

    }
}