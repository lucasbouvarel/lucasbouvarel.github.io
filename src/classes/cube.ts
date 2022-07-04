import * as THREE from 'three';
import * as TWEEN  from '@tweenjs/tween.js'


const availableColors = [0x275F73, 0x9CDDF4, 0x52C8F2, 0x1D5E75, 0x41A0BF];


export class Cube {

    static defaultSize = 0.9;


    root!: THREE.Object3D;
    material!: THREE.MeshStandardMaterial;
    currentTween!: TWEEN.Tween<any>;
    size!: number;

    constructor(private readonly scene: THREE.Scene) {
        this.root = new THREE.Object3D(); 
        this.material = new THREE.MeshStandardMaterial({ color: Cube.getRandomColor(), metalness: 0.6 });
        const geometry = new THREE.BoxGeometry(Cube.defaultSize, Cube.defaultSize, Cube.defaultSize);
        const cube = new THREE.Mesh(geometry, this.material);
        cube.position.set(0, -0.5, 0);
        this.root.add(cube);

        this.size = Cube.defaultSize;

        scene.add(this.root);
    }

    public setPosition(x: number, y: number, z: number) {
        this.root.position.set(x, y, z);
    }


    startRotation() {
        new TWEEN.Tween(this.root.rotation)
            .to({ y: "-" + (Math.PI/2) * 8}, 6000)
            .delay(250)
            .repeat(Infinity)
            .easing(TWEEN.Easing.Cubic.InOut)
            .start();
    }
 

    static getRandomColor() {
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }
    
    

}
