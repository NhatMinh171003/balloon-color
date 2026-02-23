import Phaser from "phaser";
import { addButtonEffect } from "../utils/buttonEffect";

export default class OnColorScene extends Phaser.Scene {
    constructor() {
        super("OnColorScene");
    }

    create() {
        const { width, height } = this.scale;
        const bannerHeight = 60; // khoảng cách dưới title
        const color_guide_sound = this.sound.add('color_guide_sound');
        this.audioPlaying = true;

        const availableHeight = height - bannerHeight;
        const centerY = bannerHeight + availableHeight / 2;
        const centerX = this.scale.width / 2;
        this.brushGraphics = this.make.graphics({ x: 0, y: 0, add: false });

        this.currentColor = 0xe74c3c;
        this.brushSize = 25;
        this.shapes = [];
        this.isGameComplete = false;

        const bg = this.add.image(0, 0, "bg_home").setOrigin(0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        // ── Container bắt đầu ngoài màn hình bên phải ──
        // Tất cả object bên trong dùng tọa độ TƯƠNG ĐỐI so với container

        const container = this.add.container(this.scale.width, bannerHeight);
        this.boardContainer = container;

        const sc = (img, factor) => Math.min(
            width / img.width * factor,
            height / img.height * factor
        );

        const title = this.add.image(width / 2 - 40, 80, 'title')
            .setOrigin(0.5)
            .setScale(sc({
                width: this.textures.get('title').getSourceImage().width,
                height: this.textures.get('title').getSourceImage().height
            }, 0.57));

        const btnReplay = this.add.image(width - 250, 75, 'btn_replay')
            .setScale(0.46)
            .setInteractive({ useHandCursor: true });

        addButtonEffect(this, btnReplay);

        btnReplay.on('pointerdown', () => {
            if (this.audioPlaying) return;
            this.sound.play('click_sound');
            this.scene.start('ReadScene');
        });
        //audio

        this.time.delayedCall(1000, () => {

            color_guide_sound.play();
            color_guide_sound.once('complete', () => {
                this.audioPlaying = false;
            });
        });

        // ── Board ──
        const board = this.add.image(centerX, centerY - 30, "board").setScale(0.45);
        container.add(board);

        // ── Letter O ──
        const letterX = centerX - 220;
        const letterY = centerY - 60;
        const letterScale = 0.4;

        const source = this.textures.get("txtLetter").getSourceImage();
        const oSize = source.width * letterScale;

        const oRT = this.add.renderTexture(letterX, letterY, oSize, oSize);
        oRT.setOrigin(0.5);
        oRT.setDepth(10);
        container.add(oRT);

        // Mask hình donut cho chữ O (GeometryMask dùng tọa độ thế giới)
        const g = this.add.graphics();
        g.setVisible(false);
        g.x = this.scale.width; // bắt đầu cùng vị trí container

        const outerRadius = oSize / 2;
        const innerRadius = outerRadius * 0.52;

        g.fillStyle(0xffffff);
        g.beginPath();
        g.arc(letterX, letterY, outerRadius, 0, Math.PI * 2, false);
        g.arc(letterX, letterY, innerRadius, 0, Math.PI * 2, true);
        g.closePath();
        g.fillPath();

        const oMask = g.createGeometryMask();
        oRT.setMask(oMask);

        this.shapes.push({ rt: oRT, width: oSize, height: oSize, isComplete: false });

        const oLine = this.add.image(letterX, letterY, "txtLetter")
            .setScale(letterScale)
            .setDepth(50);
        container.add(oLine);

        // ── Balloons ──
        const balloonX = centerX + 170;
        const balloonY = centerY - 80;
        const balloonScale = 0.4;

        const balloonLine = this.add.image(balloonX, balloonY, "balloonLine")
            .setScale(balloonScale)
            .setDepth(50);
        container.add(balloonLine);

        // helper tạo từng balloon
        // maskImg ở NGOÀI container để BitmapMask hoạt động đúng
        // rt ở TRONG container để slide cùng container
        const makeBalloon = (key, bx, by, scale) => {
            const maskImg = this.add.image(bx, by, key).setScale(scale).setVisible(false);
            const rt = this.add.renderTexture(bx, by, maskImg.displayWidth, maskImg.displayHeight);
            rt.setMask(maskImg.createBitmapMask());
            rt.setDepth(10);
            container.add(rt); // chỉ rt nằm trong container
            this.shapes.push({ rt, maskImg, width: maskImg.displayWidth, height: maskImg.displayHeight, isComplete: false });
            return { maskImg, rt };
        };

        const b1X = balloonX - 75 * balloonScale - 65, b1Y = balloonY - 60 * balloonScale - 32;
        const b2X = balloonX + 50 * balloonScale - 27, b2Y = balloonY - 70 * balloonScale + 30;
        const b3X = balloonX + 80 * balloonScale - 5, b3Y = balloonY + 20 * balloonScale - 122;
        const b4X = balloonX - 20 * balloonScale + 109, b4Y = balloonY + 40 * balloonScale - 40;

        const { maskImg: m1 } = makeBalloon("balloon1", b1X, b1Y, balloonScale * 0.67);
        const { maskImg: m2 } = makeBalloon("balloon2", b2X, b2Y, balloonScale * 0.67);
        const { maskImg: m3 } = makeBalloon("balloon3", b3X, b3Y, balloonScale);
        const { maskImg: m4 } = makeBalloon("balloon4", b4X, b4Y, balloonScale * 0.67);

        // ── Text txtBalloon ──
        const txtBalloon = this.add.image(centerX - 220, centerY + 80, "txtBalloon").setScale(0.25);
        container.add(txtBalloon);

        // ── Palette & Eraser ──
        this.createPalette(centerX, centerY + 200, container);

        // ── Brush cursor ──
        this.brush = this.add.circle(0, 0, this.brushSize / 2, 0xffffff).setVisible(false);

        // ── Slide-in animation ──
        // BitmapMask dùng world coords → sync maskImg vị trí theo rt world position
        const allMaskImgs = [m1, m2, m3, m4];

        // Lưu vị trí LOCAL ban đầu của rt (tương đối trong container)
        const rtLocalX = [b1X, b2X, b3X, b4X];
        const rtLocalY = [b1Y, b2Y, b3Y, b4Y];

        this.tweens.add({
            targets: container,
            x: 0,
            duration: 600,
            ease: 'Power3',
            onUpdate: () => {
                const cx = container.x;
                const cy = container.y;
                // Sync maskImg theo world position của rt tương ứng
                allMaskImgs.forEach((m, i) => {
                    m.x = rtLocalX[i] + cx;
                    m.y = rtLocalY[i] + cy;
                });
                // Sync GeometryMask (chữ O)
                g.x = cx;
                g.y = bannerHeight;
            },
            onComplete: () => {
                this.enablePaint();
            }
        });
    }

    // Bảng màu
    createPalette(centerX, y, container) {

        const colors = [
            0xe74c3c,
            0xf1c40f,
            0x2ecc71,
            0x3498db,
            0xf39c12,
            0xfd79a8,
            0x000000
        ];

        this.selectedBorder = this.add.graphics();
        this.selectedBorder.setDepth(100);

        colors.forEach((color, i) => {
            const circle = this.add.circle(
                centerX - 300 + i * 80,
                y,
                25,
                color
            ).setScale(1.2).setInteractive().setDepth(100);
            container.add(circle);

            circle.on("pointerdown", () => {
                this.sound.play('click_sound');
                this.currentColor = color;
                // world x = circle.x + container.x
                this.updateSelection(circle.x + container.x, circle.y + container.y);
            });
        });

        const eraser = this.add.image(centerX + 270, y, "rubber")
            .setScale(0.35)
            .setInteractive()
            .setDepth(100);
        container.add(eraser);

        eraser.on("pointerdown", () => {
            this.currentColor = null;
            this.updateSelection(eraser.x + container.x, eraser.y + container.y);
        });

        // highlights màu đầu tiên (red) khi tween xong → container.x = 0
        this.updateSelection(centerX - 800, y);
    }

    updateSelection(x, y) {
        this.selectedBorder.clear();
        this.selectedBorder.lineStyle(3, "#555555");
        this.selectedBorder.strokeCircle(x, y, 32);
    }

    //PAINT 
    enablePaint() {

        this.input.on("pointermove", pointer => {

            if (!pointer.isDown) return;

            //Không cho phép tô sau khi end game
            if (this.isGameComplete) return;

            this.shapes.forEach(shape => {

                const local = shape.rt.getLocalPoint(pointer.x, pointer.y);

                // kiểm tra nằm trong vùng texture
                if (
                    local.x < 0 ||
                    local.y < 0 ||
                    local.x > shape.width ||
                    local.y > shape.height
                ) {
                    return;
                }

                this.brushGraphics.clear();

                if (this.currentColor === null) {

                    this.brushGraphics.fillStyle(0xffffff);
                    this.brushGraphics.fillCircle(
                        local.x,
                        local.y,
                        this.brushSize / 1.5
                    );

                    shape.rt.erase(this.brushGraphics);

                } else {

                    this.brushGraphics.fillStyle(this.currentColor, 1);
                    this.brushGraphics.fillCircle(
                        local.x,
                        local.y,
                        this.brushSize / 1.5
                    );

                    shape.rt.draw(this.brushGraphics);

                }

            });

        });
        this.input.on("pointerup", () => {
            this.checkAllComplete();
        });
    }





    // ================= CHECK COMPLETE =================
    checkAllComplete() {

        if (this.isCheckingComplete) return;
        this.isCheckingComplete = true;

        let completedCount = 0;
        let checkedCount = 0;

        this.shapes.forEach(shape => {

            shape.rt.snapshot((image) => {

                // Tạo canvas trung gian
                const canvas = document.createElement("canvas");
                canvas.width = shape.width;
                canvas.height = shape.height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0);

                const data = ctx.getImageData(
                    0,
                    0,
                    shape.width,
                    shape.height
                ).data;

                let filled = 0;

                for (let i = 3; i < data.length; i += 4) {
                    if (data[i] > 10) filled++;
                }

                const percent = filled / (shape.width * shape.height);

                if (percent >= 0.95) {
                    completedCount++;

                    // Mới hoàn thành lần đầu → effect
                    if (!shape.isComplete) {
                        shape.isComplete = true;
                        this.sound.play('correct_sound_1');
                        this.flashShape(shape.rt);
                    }
                }

                checkedCount++;

                if (checkedCount === this.shapes.length) {

                    if (completedCount === this.shapes.length) {
                        this.isGameComplete = true;
                        this.input.enabled = false;

                        this.time.delayedCall(3000, () => {
                            this.scene.start("EndGameScene");
                        });
                    }

                    this.isCheckingComplete = false;
                }

            });

        });
    }

    // Hiệu ứng nháy khi hoàn thành 1 shape
    flashShape(rt) {
        this.tweens.add({
            targets: rt,
            alpha: { from: 1, to: 0.2 },
            duration: 120,
            yoyo: true,       // đảo ngược về alpha=1
            repeat: 3,        // nháy 3 lần
            ease: 'Sine.easeInOut',
            onComplete: () => {
                rt.setAlpha(1);
            }
        });
    }


}
