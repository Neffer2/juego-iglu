let player; 
let igloo;
let iceBox;
let tree_1;

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
        this.load.image('tree1', './assets/Object/Tree_1.png');
        this.load.image('tree2', './assets/Object/Tree_2.png');
        this.load.image('icebox', './assets/Object/IceBox.png');
        this.load.image('crystal', './assets/Object/Crystal.png');
        this.load.image('sign_2', './assets/Object/sign_2.png');
        this.load.image('SnowMan', './assets/Object/SnowMan.png');        
        this.load.image('bg', './assets/BG/BG.png');

        loadFont('Snowtop Caps', './assets/fonts/Snowtop-Caps.ttf');
        function loadFont(name, url) {
            var newFont = new FontFace(name, `url(${url})`);
            newFont.load().then(function (loaded) {
                document.fonts.add(loaded);
            }).catch(function (error) {
                return error;
            });
        }
    }   
 
    create(){
        // Creo el tilemap y asigno llave y dimensiones
            const map = this.make.tilemap({ key: "map", tileWidth: 128, tileHeight: 128});
        // Añado el tileset (las imagenes). Aquí se necesito el nombre del tileset en Tiled y la llave del preload
            const tileset = map.addTilesetImage("tiles1","tiles");
        // Añado las capas. Utilizo el nombre de la capa en Tiled, el tileset que acabo de añadir, y las coordenadas x & y
            // const layer1 = map.createLayer("sky", tileset, 0, 0);
            // const layer2 = map.createLayer("water", tileset, 0, 195);
            // NOTA: El mapa de Tield debe tener el calculo de bloques para tener el mismo tamaño del proyecto.
            
        /* env */
            this.add.image(0, 0, 'bg').setOrigin(0, 0).setScrollFactor(0.5);;
            const layer1 = map.createLayer("water", tileset, 0, 195);
            const layer = map.createLayer("ground", tileset, 0, 195);
            layer.setScale(.5);
            layer1.setScale(.5);

            this.add.image(180, 385, 'tree1').setScale(.5);
            this.add.image(745, 300, 'sign_2').setScale(.5);
            
            igloo = this.physics.add.image(80, 403, 'igloo').setScale(.5);
            igloo.flipX = true;
            igloo.setImmovable(true);
            igloo.setSize(370, 210, true);
            igloo.body.allowGravity = false;
            
            this.add.image(325, 218, 'tree1').setScale(.3);
            this.add.image(100, 180, 'crystal').setScale(.5);

            this.add.image(50, 385, 'tree2').setScale(.5);
            iceBox = this.physics.add.image(700, 100, 'icebox').setScale(.2);
        /* --- */

        /* Player */
            player = this.physics.add.sprite(280, 400, 'player').setScale(.5);
            // player.setCollideWorldBounds(true);
            player.setSize(64, 58, false);
            /* --- */
            
            /* camera */
            this.cameras.main.setBounds(0, 0, 3840, 512);
            this.cameras.main.startFollow(player, true);
        /* --- */

        /* Text */
            // this.add.text(20, 16, 'Gamifiaciones \n IGLú', {fontFamily: 'Snowtop Caps', fontSize: "80px", fill: '#fff'});
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
            player.setVelocityX(-Math.round(velocityX));
            player.anims.play('right', true);
            player.flipX = true;
        }else if (scanner.right.isDown){
            player.setVelocityX(Math.round(velocityX));
            player.anims.play('right', true);
            player.flipX = false;
        }else {
            player.setVelocityX(0);
            player.anims.play('iddle', true);
        }

        if (scanner.up.isDown && player.body.onFloor()){
            player.setVelocityY(Math.round(velocityY));
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
    height: 512,
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