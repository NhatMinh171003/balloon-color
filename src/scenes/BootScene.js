import Phaser from "phaser";
export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.load.image('bg_home', 'assets/images/bg/bg_home.jpg');
        this.load.image('colorBoard', 'assets/images/color/color_board.png');
        this.load.image('colors', 'assets/images/color/colors.png');
        this.load.image('rubber', 'assets/images/color/rubber.png');
        this.load.image('board', 'assets/images/ui/white_board.png');
        this.load.image('title', 'assets/images/color/title.png');
        this.load.image('btn_replay', 'assets/images/ui/btn_replay.png');
        this.load.image('balloonLine', 'assets/images/color/balloon_line.png');
        this.load.image('txtLetter', 'assets/images/color/txt_letter.png');
        this.load.image('txtBalloon', 'assets/images/color/txt_balloon.png');
        this.load.image('read_board', 'assets/images/ui/read_board.png');
        this.load.image('sound', 'assets/images/ui/play_sound.png');
        this.load.image('hand', 'assets/images/ui/hand.png');
        this.load.image('txtChicken', 'assets/images/speaking/chicken_text.png');
        this.load.image('rectConner', 'assets/images/speaking/rect_conner.png');
        this.load.image('txtSpeaking', 'assets/images/speaking/speaking_text.png');
        this.load.image('chicken', 'assets/images/ui/chicken.png');
        this.load.image('balloon1', 'assets/images/color/balloon_1.png');
        this.load.image('balloon2', 'assets/images/color/balloon_2.png');
        this.load.image('balloon3', 'assets/images/color/balloon_3.png');
        this.load.image('balloon4', 'assets/images/color/balloon_4.png');
        this.load.image('complete', 'assets/images/ui/banner_congrat.png');
        this.load.image('banner', 'assets/images/ui/read_banner.png');
        //audio
        this.load.audio('color_guide_sound', 'assets/audio/prompt/colorprompt_guide_color.mp3');
        this.load.audio('poetry_guide_sound', 'assets/audio/prompt/prompt_guide_poetry.mp3');
        this.load.audio('poetry_sound', 'assets/audio/prompt/prompt_poetry.mp3');
        this.load.audio('applause_sound', 'assets/audio/sfx/applause.mp3');
        this.load.audio('click_sound', 'assets/audio/sfx/click.mp3');
        this.load.audio('complete_sound', 'assets/audio/sfx/complete.mp3');
        this.load.audio('correct_sound', 'assets/audio/sfx/correct_answer_2.mp3');
        this.load.audio('correct_sound_1', 'assets/audio/sfx/correct.mp3');



    }
    create() {
        this.scene.start('ReadScene');
    }
    update() {
    }
}