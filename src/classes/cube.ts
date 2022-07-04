import * as THREE from 'three';
import * as TWEEN  from '@tweenjs/tween.js'


const availableColors = [0x275F73, 0x9CDDF4, 0x52C8F2, 0x1D5E75, 0x41A0BF];


export class Cube {

    static defaultSize = 0.9;

    root!: THREE.Object3D;
    material!: THREE.MeshStandardMaterial;
    currentTween: TWEEN.Tween<any> | null = null;
    size!: number;
    autoAnim = false;

    constructor(private readonly scene: THREE.Scene, enableDemo = true) {
        this.root = new THREE.Object3D(); 
        this.material = new THREE.MeshStandardMaterial({ color: Cube.getRandomColor(), metalness: 0.6 });
        const geometry = new THREE.BoxGeometry(Cube.defaultSize, Cube.defaultSize, Cube.defaultSize);
        const cube = new THREE.Mesh(geometry, this.material);
        cube.position.set(0, Cube.defaultSize / 2, 0);
        this.root.add(cube);

        this.size = Cube.defaultSize;

        scene.add(this.root);

        
        if (enableDemo) {
            this.startRotation();
            this.autoAnim = enableDemo;
            this.setSize(2, true, 250);
        }
    }

    public setPosition(x: number, y: number, z: number) {
        this.root.position.set(x, y, z);
    }


    public setSize(size: number, withAnim = true, withDelay = 0) {
        this.size = size;
        if (!withAnim) {
            this.root.scale.y = this.size;
        } else {
            this.animSize(withDelay);
        }
    }


    private animSize(withDelay = 0): void {
        //this.killCurrentTween();
        if (this.root.scale.y === this.size) return; //nothing to do

        const isUp = this.root.scale.y < this.size;
        const minDuration = 1200;
        const deltaDuration = 1800;
        
        this.currentTween = new TWEEN.Tween(this.root.scale)
        .to({ y: this.size }, minDuration + Math.random() * deltaDuration)
        .delay(withDelay)
        .easing(isUp ? TWEEN.Easing.Elastic.Out : TWEEN.Easing.Back.In)
        .start()
        .onComplete(() => {
            this.killCurrentTween();
            if (this.autoAnim)
                this.setSize(Cube.getRandomSize(), true, 300 + Math.random() * 500);
        
        });
    }


    startRotation() {
        new TWEEN.Tween(this.root.rotation)
            .to({ y: "-" + (Math.PI/2) * 8}, 10000)
            .delay(250)
            .repeat(Infinity)
            .easing(TWEEN.Easing.Cubic.InOut)
            .start();
    }

    private killCurrentTween(): void {
        if (!this.currentTween) return;
        this.currentTween.stop();
        this.currentTween = null;
    }
 

    static getRandomColor() {
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }

    static getRandomSize() {
        return 0.5 + Math.random() * 5;
    }
    
    

}
