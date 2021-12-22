/**
 * @extends Phaser.Scene
 */

export default class MainMenuScene extends Phaser.Scene {

  //Menu principal
  constructor() 
  {
    super({
      key: 'mainMenu'
    });
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
    //fondo del menú
    let background= this.add.sprite(screenCenterX , screenCenterY, 'background');
    //título 
    let tittle=this.add.text(screenCenterX, screenCenterY-250, 'ECLIPSE',{ fontFamily: 'men', fontSize:100, color: '#dddddd'}).setOrigin(0.5)
    //botón de play
    this.menu= this.add.sprite(screenCenterX , screenCenterY, 'menu').setInteractive();;
    this.menu.setScale(4);
    this.loadingText = this.add.text(screenCenterX, screenCenterY, 'Play',{ fontFamily: 'men', fontSize: 80, color: '#ffffff' }).setOrigin(0.5)
  
    //cambio del tamaño del boton al pasar por encima el raton 
    this.menu.on("pointerover",()=>{
      this.loadingText.setScale(1.5);    

      this.menu.setScale(4.5);
    });
     //cambio del tamaño del boton al pasar por fuera el raton
    this.menu.on("pointerout", ()=>{
      this.loadingText.setScale(1);

      this.menu.setScale(4);
    });
    //al presionar el botón el juego comienza
    this.menu.on('pointerdown', function () {
      this.scene.music.play();
      this.scene.scene.start('introClip');
    })
}
}