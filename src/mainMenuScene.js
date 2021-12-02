/**
 * @extends Phaser.Scene
 */

export default class MainMenuScene extends Phaser.Scene {

  constructor() 
  {
    super({ key: 'level' });
    
  }

  create() 
  {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 0%').setOrigin(0.5);

    this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    this.add.sprite(screenCenterX, screenCenterY, 'CursorSelector');
  }
}