import Phaser from "phaser";
export default class ColorScene extends Phaser.Scene {
    constructor() {
        super('ColorScene');
    }
    preload() {

    }
    create() {
        const { width, height } = this.scale;

        // ── Background ──
        const bg = this.add.image(0, 0, 'bg_home').setOrigin(0);
        bg.displayWidth = width;
        bg.displayHeight = height;

        // ── Container căn giữa màn hình, scale = 1 ──
        // Mỗi object bên trong tự có scale riêng
        // Tọa độ là offset tương đối từ tâm màn hình
        const container = this.add.container(width / 2, height / 2);
        //scale helper
        const sc = (img, factor) => Math.min(
            width / img.width * factor,
            height / img.height * factor
        );

        const board = this.add.image(0, 55, 'board')
            .setScale(sc({
                width: this.textures.get('board').getSourceImage().width,
                height: this.textures.get('board').getSourceImage().height
            }, 0.8));

        const balloonLine = this.add.image(170, 0, 'balloonLine').setScale(0.4);

        const txtLetter = this.add.image(-170, 0, 'txtLetter')
            .setScale(sc({
                width: this.textures.get('txtLetter').getSourceImage().width,
                height: this.textures.get('txtLetter').getSourceImage().height
            }, 0.2));

        const txtBalloon = this.add.image(-170, 150, 'txtBalloon')
            .setScale(sc({
                width: this.textures.get('txtBalloon').getSourceImage().width,
                height: this.textures.get('txtBalloon').getSourceImage().height
            }, 0.2));

        const colors = this.add.image(0, 280, 'colors')
            .setScale(sc({
                width: this.textures.get('colors').getSourceImage().width,
                height: this.textures.get('colors').getSourceImage().height
            }, 0.6))
            .setInteractive({ useHandCursor: true });

        container.add([board, balloonLine, txtLetter, txtBalloon, colors]);

        // ── UI ngoài container ──
        const title = this.add.image(width / 2 - 40, 80, 'title')
            .setOrigin(0.5)
            .setScale(sc({
                width: this.textures.get('title').getSourceImage().width,
                height: this.textures.get('title').getSourceImage().height
            }, 0.57));

        const btnReplay = this.add.image(width - 250, 75, 'btn_replay')
            .setScale(0.46)
            .setInteractive({ useHandCursor: true });

        // ── Audio ──
        const color_guide_sound = this.sound.add('color_guide_sound');
        this.audioPlaying = true;

        this.time.delayedCall(1000, () => {
            color_guide_sound.play();
            color_guide_sound.once('complete', () => {
                this.audioPlaying = false;
            });
        });

        // ── Events ──
        btnReplay.on('pointerdown', () => {
            if (this.audioPlaying) return;
            this.sound.play('click_sound');
            this.scene.start('ReadScene');
        });

        colors.on('pointerdown', () => {
            if (this.audioPlaying) return;
            this.sound.play('click_sound');
            this.scene.start('OnColorScene');
        });
    }
    update() {
    }
}