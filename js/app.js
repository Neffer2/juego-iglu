
class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){
        // Cargo el json del mapa
        this.load.image('tiles', './assets/spritesheet.png');
        this.load.tilemapTiledJSON('map', './assets/ground.json');
    }
 
    create(){
        // Creo el tilemap y asigno llave y dimensiones
        const map = this.make.tilemap({ key: "map", tileWidth: 128, tileHeight: 128});
        // Añado el tileset (las imagenes). Aquí se necesito el nombre del tileset en Tiled y la llave del preload
        const tileset = map.addTilesetImage("tiles1","tiles");
        // Añado las capas. Utilizo el nombre de la capa en Tiled, el tileset que acabo de añadir, y las coordenadas x & y
        const layer2 = map.createLayer("sky", tileset, 0, 0);
        const layer1 = map.createLayer("water", tileset, 0, 0);
        const layer = map.createLayer("ground", tileset, 0, 0);

        // El mapa de Tield debe tener el calculo de bloques para tener el mismo tamaño del proyecto.

    }

    update(){
    }
}

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 768,
    height: 512 ,
    scene: [MainScene],
    scale: {
        // mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 350 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)