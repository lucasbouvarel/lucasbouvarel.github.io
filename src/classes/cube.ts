import * as THREE from 'three';
import * as TWEEN  from '@tweenjs/tween.js'


export class Cube {

    public root!: THREE.Object3D;
    material!: THREE.MeshStandardMaterial;

    constructor(private readonly scene: THREE.Scene) {
        this.root = new THREE.Object3D(); 
        this.material = new THREE.MeshStandardMaterial({ color: 0x52C8F2, metalness: 0.6 });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry, this.material);
        cube.position.set(0, -0.5, 0);
        this.root.add(cube);

        scene.add(this.root);

        this.startRotation();
    }


    startRotation() {
        new TWEEN.Tween(this.root.rotation)
            .to({ y: "-" + (Math.PI/2) * 8}, 6000)
            .delay(250)
            .repeat(Infinity)
            .easing(TWEEN.Easing.Cubic.InOut)
            .start();
    }   
}
