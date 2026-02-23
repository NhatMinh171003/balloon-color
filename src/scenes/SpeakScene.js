import Phaser from "phaser";
import { addButtonEffect } from '../utils/buttonEffect.js';

export default class SpeakScene extends Phaser.Scene {
    constructor() {
        super('SpeakScene')
    }
    preload() {

    }
    create() {
        const bg = this.add.image(0, 0, 'bg_home').setOrigin(0, 0);
        const poetry_sound = this.sound.add('poetry_sound');
        // set background
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;
        const container = this.add.container(
            this.scale.width / 2,
            this.scale.height / 2 * 0.95
        );


        const board = this.add.image(0, 0, 'board');
        const rectConner = this.add.image(0, this.scale.height, 'rectConner').setOrigin(0, 1).setScale(1.5);
        const txtSpeaking = this.add.image(
            (rectConner.width * 1.5) / 2,
            this.scale.height - (rectConner.height * 1.5) / 2,
            'txtSpeaking'
        ).setOrigin(0.5);
        const chicken = this.add.image(300, 0, 'chicken');
        const txtChicken = this.add.image(-600, 0, 'txtChicken');

        container.add([board, chicken, txtChicken]);
        const btnReplay = this.add.image(this.scale.width - 20, 20, 'btn_replay')
            .setOrigin(1, 0)
            .setScale(0.46)
            .setInteractive({ useHandCursor: true });

        //scale
        const scale = Math.min(
            this.scale.width / board.width,
            this.scale.height / board.height
        ) * 0.8;

        container.setScale(scale);
        txtChicken.setScale(0.5 / scale);
        chicken.setScale(0.4 / scale);




        // Slide animation
        container.x = this.scale.width + 500;

        this.tweens.add({
            targets: container,
            x: this.scale.width / 2,
            duration: 800,
            ease: 'Power3'
        });

        addButtonEffect(this, btnReplay);

        btnReplay.on('pointerdown', () => {
            this.sound.play('click_sound');
            this.scene.start('ReadScene');
            poetry_sound.stop();
        });


        this.time.delayedCall(1000, () => {
            poetry_sound.play();
            poetry_sound.once('complete', () => {

                this.time.delayedCall(2000, () => {
                    this.scene.start('OnColorScene');
                });
            });
        });


    }
}