/**
 * @extends Phaser.Scene
 */

export default class Congrats extends Phaser.Scene {

  constructor() {
    super({
      key: 'congrats'
    });
    this.totaltime = 0;
  }
  init(datos) {
    if(datos.time!=null)
    this.totaltime = datos.time;
  }
  create() {
    //musica del botón del menu
    this.music = this.sound.add("menus");
    let textConfig = {
      fontFamily: 'men',
      fontSize: 65,
      color: '#dddddd'
    };
    let timeConfig = {
      fontFamily: 'men',
      fontSize: 65,
      color: '#831dae'
    };
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let background = this.add.sprite(screenCenterX, screenCenterY, 'YouWin');
    let title = this.add.text(screenCenterX, screenCenterY - 250, 'ECLIPSE', textConfig).setOrigin(0.5)
    let congrats = this.add.text(screenCenterX, screenCenterY - 170, 'Congrats!', textConfig).setOrigin(0.5)
    let text = this.add.text(screenCenterX, screenCenterY - 130, 'You finished all our levels!', textConfig).setOrigin(0.5)
    
    let minutes = Math.floor(this.totaltime / 60);
    let seconds = this.totaltime - 60 * minutes;
    if(minutes >= 1) {
      let time = this.add.text(screenCenterX, 20, 'TIME: '+ minutes + 'm'+ seconds + 's', timeConfig).setOrigin(0.5)
    }
    else{
      let time = this.add.text(screenCenterX, screenCenterY-270, 'TIME: '+ seconds + 's', timeConfig).setOrigin(0.5)
    }
    
    this.menu = this.add.sprite(screenCenterX, screenCenterY + 290, 'bigmenu').setInteractive();;
    this.menu.setScale(4);

    this.loadingText = this.add.text(screenCenterX, screenCenterY + 290, 'Play again', textConfig).setOrigin(0.5)


    this.menu.on("pointerover", () => {
      this.loadingText.setScale(1.4);

      this.menu.setScale(4.5);
    });
    this.menu.on("pointerout", () => {
      this.loadingText.setScale(1);

      this.menu.setScale(4);
    });
    this.totaltime = 0;
    this.menu.on('pointerdown', function () {
      this.scene.scene.start('level1', {
        time: this.totaltime
      });
    })
  }


}