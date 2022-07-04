import * as TWEEN  from '@tweenjs/tween.js'

import { Grid } from './grid';
import * as THREE from 'three';
import { Cube } from './cube';

export class Stage {

    scene!: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    camera!: THREE.PerspectiveCamera;

    cubePivot!: THREE.Object3D;

    constructor(private readonly grid: Grid) {
        this.initRenderer();
        this.justToTest();
    }


    initRenderer(): void {
        this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.initLights();
    }

    initLights(): void {
        const light = new THREE.AmbientLight(0x404040, 2.5); // soft white light
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0x52C8F2, 2);
        directionalLight.castShadow = true;
        directionalLight.position.set(3, 3, 3);
        this.scene.add(directionalLight);
    }

    justToTest() { //TO REMOVE : just to check first display
        this.scene.add(new Cube(this.scene).root);
    }


    render = () => {
        requestAnimationFrame(this.render);
		this.renderer.render(this.scene, this.camera);
		TWEEN.update();
    }
}
