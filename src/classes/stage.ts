import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three-orbitcontrols-ts';
import { Grid } from './grid';
import * as THREE from 'three';
import { Cube } from './cube';
import { DougsCraft } from './dougsCraft';



export class Stage {

    scene!: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    camera!: THREE.PerspectiveCamera;
    controls!: OrbitControls;

    constructor(private readonly grid: Grid, private readonly dougsCraft: DougsCraft) {
        this.initRenderer();

        this.grid.lines.forEach(l =>
            this.scene.add(l.root)
        )
        this.scene.add(dougsCraft.root);
    }


    initRenderer(): void {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.set(-7, 7, -7);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement );
        this.controls.enableZoom = true; // useless for now... 
        this.controls.enableKeys = true; // same here. Need to check that.
        this.controls.autoRotate = true;

        this.initLights();
    }

    initLights(): void {
        const light = new THREE.AmbientLight(0x404040, 3); // soft white light
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0x52C8F2, 2.5);
        directionalLight.castShadow = true;
        directionalLight.position.set(-3, 3, -3);
        this.scene.add(directionalLight);
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        TWEEN.update();
    }
}
