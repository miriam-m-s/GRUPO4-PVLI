/**
 * @extends Phaser.Scene
 */

export default class MainMenuScene extends Phaser.Scene {

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
    let background= this.add.sprite(screenCenterX , screenCenterY, 'background');
   
     let tittle=this.add.text(screenCenterX, screenCenterY-250, 'ECLIPSE',{ fontFamily: 'men', fontSize:100, color: '#dddddd'}).setOrigin(0.5)
   
      this.menu= this.add.sprite(screenCenterX , screenCenterY, 'menu').setInteractive();;
      this.menu.setScale(4);
   
   this.loadingText = this.add.text(screenCenterX, screenCenterY, 'Play',{ fontFamily: 'men', fontSize: 80, color: '#ffffff' }).setOrigin(0.5)
   
      this.menu.on("pointerover",()=>{
        this.loadingText.setScale(1.5);    
  
        this.menu.setScale(4.5);
    });
    this.menu.on("pointerout", ()=>{
      this.loadingText.setScale(1);

      this.menu.setScale(4);
    });
 
    this.menu.on('pointerdown', function () {
      this.scene.music.play();
      this.scene.scene.start('level2');
    })
}
}