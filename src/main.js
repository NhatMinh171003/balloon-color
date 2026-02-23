import ReadScene from "./scenes/ReadScene.js";
import SpeakScene from "./scenes/SpeakScene.js";
import ColorScene from "./scenes/ColorScene.js";
import OnColorScene from "./scenes/OnColorScene.js";
import BootScene from "./scenes/BootScene.js";
import EndGameScene from "./scenes/EndGameScene.js";
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    scene: [
        BootScene,
        ColorScene,
        ReadScene,
        SpeakScene,
        OnColorScene,
        EndGameScene

    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }


}

new Phaser.Game(config);