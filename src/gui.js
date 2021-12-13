<<<<<<< HEAD
=======

>>>>>>> VisualsRevamp
/**
 * @extends Phaser.Scene
 */

<<<<<<< HEAD
export default class GUI extends Phaser.Scene {


  constructor() {
    super({
      key: 'level'
    });
  }

  //Creación de los elementos de la escena principal de juego

  create() {
    console.log("GUI");
    var textConfig = {
      fontSize: '20px',
      color: '#ff0000',
      fontFamily: 'Arial'
    };
    this.add.text(game.config.width / 2, game.config.height / 2, textConfig, "SomeText", textConfig);
  }
}
=======
 export default class GUI extends Phaser.Scene {


constructor() 
{
  super({ key: 'level' });
}

//Creación de los elementos de la escena principal de juego

create() 
{
    console.log("GUI");
    var textConfig={fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'};
    this.add.text(game.config.width/2,game.config.height/2,textConfig,"SomeText",textConfig);    
}
 }
>>>>>>> VisualsRevamp
