//import Base from './base.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
 export default class Light extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Player} player Jugador del juego
     * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */

    constructor(scene, player, player2, baseGroup, x, y, radius) {
      super(scene, x, y, 'light');
  
      this.depth = -1;
      this.setAlpha(.5);
  
      this.setOrigin(0);
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
  

      this.radius = radius;

      this.body.setCircle(radius);
  
      this.scale = ((radius-3)/1000);
      //this.scale = 0.049;
  
      this.scene.physics.add.collider(this, player);
      
      this.scene.physics.add.overlap(this, player2);
    }
  
  
  
      /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
       preUpdate() {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate();


        if (this.scene.physics.overlap(this.scene.player2, this)) {
           this.scene.player2.onLightFunction(this.body.x + this.radius,
                    this.body.y + this.radius);
        }
    
        //Array<Phaser.Physics.Arcade.Body> aray = overlapCirc(x, y, true, false);
    
        //overlapCirc(x, y, true, false);
    
        //  if (this.scene.physics.overlap(this.scene.player, this)) {
        //   // Delegamos en la escena para decidir qué hacer al 
        //    // haber cogido una estrella
        //  //console.log("human touxing");
    
        //    //this.scene.player.onLightFunction();
        //  }
  
      
       
    
      }
  }
  