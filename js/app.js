let player; 
let igloo;
let iceBox;

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){
        // Cargo el json del mapa
        this.load.image('tiles', './assets/spritesheet.png');
        this.load.tilemapTiledJSON('map', './assets/ground.json');
        this.load.spritesheet('player-jump', './assets/sprites/jump.png', {frameWidth: 59, frameHeight: 64});
        this.load.spritesheet('player-walk', './assets/sprites/walk.png', {frameWidth: 59, frameHeight: 64});
        this.load.image('igloo', './assets/Object/Igloo.png');
        this.load.image('tree2', './assets/Object/Tree_2.png');
        this.load.image('icebox', './assets/Object/IceBox.png');
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
        // NOTA: El mapa de Tield debe tener el calculo de bloques para tener el mismo tamaño del proyecto.

        /* env */
            this.add.image(590, 188, 'tree2').setScale(.5);

            igloo = this.physics.add.image(115, 334, 'igloo').setScale(.4, .5);
            igloo.flipX = true;
            igloo.setImmovable(true);
            igloo.body.allowGravity = false;

            iceBox = this.physics.add.image(250, 100, 'icebox').setScale(.4);
            iceBox.setCollideWorldBounds(true);
        /* --- */

        /* Player */
            player = this.physics.add.sprite(384, 200, 'player');
            player.setCollideWorldBounds(true);
            player.setSize(64, 58, false);
        /* --- */

        /* Animations */
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player-walk', {start: 0, end: 3}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player-jump', {start: 0, end: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('player-walk', {start: 0, end: 0}),
            frameRate: 8,
            repeat: -1
        });
        /* --- */

        /* Colitions */
            // Para la colicion defino primero la colsion con la capa entera y luego especifico el Id del objeto
            this.physics.add.collider(player, layer);
            this.physics.add.collider(iceBox, layer);
            layer.setCollisionBetween(0, 4);
            layer.setCollisionBetween(12, 16);
            this.physics.add.collider(player, igloo);
            this.physics.add.collider(player, iceBox);
        /* --- */
    }

    update(){
        let scanner = this.input.keyboard.createCursorKeys();
        let velocityX = 160;
        let velocityY = -320;
        if (scanner.left.isDown){
            player.setVelocityX(-velocityX);
            player.anims.play('right', true);
            player.flipX = true;
        }else if (scanner.right.isDown){
            player.setVelocityX(velocityX);
            player.anims.play('right', true);
            player.flipX = false;
        }else {
            player.setVelocityX(0);
            player.anims.play('iddle', true);
        }

        if (scanner.up.isDown && player.body.onFloor()){
            player.setVelocityY(velocityY);
            player.anims.play('jump', true);
        }
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
            debug: false,
            gravity: { y: 350 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)