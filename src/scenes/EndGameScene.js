import Phaser from "phaser";
export default class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGameScene');
    }

    create() {

        this.cameras.main.setBackgroundColor(0xffffff);

        // 🔥 BẮT BUỘC clear
        this.cameras.main.setAlpha(1);
        this.cameras.main.clearBeforeRender = true;

        const complete = this.add.image(this.scale.width / 2, this.scale.height / 2 - this.scale.height * 0.1, "complete").setOrigin(0.5);
        const applause_sound = this.sound.add('applause_sound');
        const correct_sound = this.sound.add('complete_sound');




        complete.displayWidth = this.scale.width * 1.2;
        complete.displayHeight = this.scale.height * 1.2;
        this.tweens.add({
            targets: complete,
            scale: 0.6,
            duration: 600,
            ease: 'Back.Out',
            onComplete: () => {

                // pulse nhẹ sau khi xuất hiện
                this.tweens.add({
                    targets: complete,
                    scale: 0.8,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });

            }
        });

        applause_sound.play();
        correct_sound.play();

    }
}