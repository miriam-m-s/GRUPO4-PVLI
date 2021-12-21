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
    this.totaltime = datos.time;
  }
  create() {
    //musica del botón del menu
    this.music = this.sound.add("menus");
    let textConfig = {
      width: 20,
      height: 20
    }

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let background = this.add.sprite(screenCenterX, screenCenterY, 'YouWin');
    let tittle = this.add.text(screenCenterX, screenCenterY - 250, 'ECLIPSE', {
      fontFamily: 'men',
      fontSize: 100,
      color: '#dddddd'
    }).setOrigin(0.5)
    let congrats = this.add.text(screenCenterX, screenCenterY - 170, 'Congrats!', {
      fontFamily: 'men',
      fontSize: 65,
      color: '#dddddd'
    }).setOrigin(0.5)
    let text = this.add.text(screenCenterX, screenCenterY - 130, 'You finished all our levels!', {
      fontFamily: 'men',
      fontSize: 65,
      color: '#dddddd'
    }).setOrigin(0.5)
    this.menu = this.add.sprite(screenCenterX, screenCenterY + 300, 'bigmenu').setInteractive();;
    this.menu.setScale(4);

    this.loadingText = this.add.text(screenCenterX, screenCenterY + 300, 'Play again', {
      fontFamily: 'men',
      fontSize: 75,
      color: '#ffffff'
    }).setOrigin(0.5)
    

    this.menu.on("pointerover", () => {
      this.loadingText.setScale(1.4);

      this.menu.setScale(4.5);
    });
    this.menu.on("pointerout", () => {
      this.loadingText.setScale(1);

      this.menu.setScale(4);
    });

    this.menu.on('pointerdown', function () {
      this.scene.scene.start('level1');
    })
  }
 

}