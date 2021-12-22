/**
 * @extends Phaser.Scene
 */

export default class Congrats extends Phaser.Scene {
 //Escena que se pone al final de la partida
  constructor() {
    super({
      key: 'congrats'
    });
    this.totaltime = 0;
  }
  init(datos) {

    //Pasamos el tiempo total para mostrarlo en pantalla
    if(datos.time!=null)
    this.totaltime = datos.time;
  }

  create() {

    //Musica del botón del menu
    this.music = this.sound.add("menus");

    //Configuracion para el texto que avisa del final del juego 
    let textConfig = {
      fontFamily: 'men',
      fontSize: 65,
      color: '#dddddd'
    };

    //Configuracion para el texo que indica el tiempo final
    let timeConfig = {
      fontFamily: 'men',
      fontSize: 65,
      color: '#831dae'
    };

    //Anadir texto de final de juego

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let background = this.add.sprite(screenCenterX, screenCenterY, 'YouWin');
    let title = this.add.text(screenCenterX, screenCenterY - 250, 'ECLIPSE', textConfig).setOrigin(0.5)
    let congrats = this.add.text(screenCenterX, screenCenterY - 170, 'Enhorabuena!', textConfig).setOrigin(0.5)
    let text = this.add.text(screenCenterX, screenCenterY - 130, 'Has completado todos los niveles!', textConfig).setOrigin(0.5)
    
    //convertir tiempo en minutos y segundos
    let minutes = Math.floor(this.totaltime / 60);
    let seconds = this.totaltime - 60 * minutes;
    if(seconds<10)seconds="0"+seconds;
    if(minutes >= 1) {
      
      let time = this.add.text(screenCenterX, 20, 'TIEMPO: '+ minutes + ':'+ seconds, timeConfig).setOrigin(0.5)
    }
    else{
      let time = this.add.text(screenCenterX, screenCenterY-270, 'TIEMPO: 0:'+ seconds, timeConfig).setOrigin(0.5)
    }
    
    //boton para empezar de nuevo el juego
    this.menu = this.add.sprite(screenCenterX, screenCenterY + 290, 'bigmenu').setInteractive();;
    this.menu.setScale(4);
    this.loadingText = this.add.text(screenCenterX, screenCenterY + 290, 'Jugar de nuevo', textConfig).setOrigin(0.5)


    //Cambio del tamano de boton al pasar el cursor por encima 
    this.menu.on("pointerover", () => {
      this.loadingText.setScale(1.4);

      this.menu.setScale(4.5);
    });
    this.menu.on("pointerout", () => {
      this.loadingText.setScale(1);

      this.menu.setScale(4);
    });
    this.totaltime = 0;

    //Comienza el nivel 1 al volver a jugar
    this.menu.on('pointerdown', function () {
      this.scene.scene.start('level1', {
        time: this.totaltime
      });
    })
  }


}