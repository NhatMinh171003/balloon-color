/**
 * Thêm hiệu ứng hover + press vào button Phaser
 * @param {Phaser.Scene} scene - Scene hiện tại
 * @param {Phaser.GameObjects.Image|Phaser.GameObjects.Shape} btn - Button object
 */
export function addButtonEffect(scene, btn) {
    const baseScale = btn.scaleX;

    btn.on('pointerover', () => {
        scene.tweens.add({
            targets: btn,
            scale: baseScale * 1.12,
            duration: 100,
            ease: 'Back.Out'
        });
    });

    btn.on('pointerout', () => {
        scene.tweens.add({
            targets: btn,
            scale: baseScale,
            duration: 100,
            ease: 'Sine.Out'
        });
    });

    btn.on('pointerdown', () => {
        scene.tweens.add({
            targets: btn,
            scale: baseScale * 0.93,
            duration: 80,
            ease: 'Sine.In'
        });
    });

    btn.on('pointerup', () => {
        scene.tweens.add({
            targets: btn,
            scale: baseScale * 1.12,
            duration: 80,
            ease: 'Back.Out'
        });
    });
}
