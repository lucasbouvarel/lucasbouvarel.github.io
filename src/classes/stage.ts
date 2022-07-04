import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from '@three-ts/orbit-controls';
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

        this.initControls();
    }


    initRenderer(): void {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        //this.camera.position.set(-7, 7, -7);
        this.camera.position.set(-1, 20, -1);
        this.camera.lookAt(0, 1, 0);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement );
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.3;
        this.controls.update();

        this.initLights();
    }

    initLights(): void {
        const light = new THREE.AmbientLight(0x404040, 3);
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0x52C8F2, 2.8);
        directionalLight.castShadow = true;
        directionalLight.position.set(-3, 3, -3);
        this.scene.add(directionalLight);


        const pointLight = new THREE.PointLight( 0xD600B1, 1.1, 100 );
        pointLight.position.set(-40, 8, 0);
        pointLight.lookAt(0, 0, 0);
        this.scene.add(pointLight);
    }


    initControls() {
        document.addEventListener('keydown', (event) => {
            //console.log('code : ' + event.code);
            if (event.code === 'Space')
                this.dougsCraft.switchDisplayType();
        }, false);
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        TWEEN.update();
    }
}
