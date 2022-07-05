import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from '@three-ts/orbit-controls';
import { Grid } from './grid';
import * as THREE from 'three';
import { Cube } from './cube';
import { CraftDisplayType, DougsCraft } from './dougsCraft';



export class Stage {

    scene!: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    camera!: THREE.PerspectiveCamera;
    controls!: OrbitControls;

    width!: number;
    height!: number;
    
    //mouse selector
    selectedCube: Cube | null = null;
    raycaster!: THREE.Raycaster;
    mouse!: THREE.Vector2;

    constructor(private readonly grid: Grid, private readonly dougsCraft: DougsCraft) {
        this.initRenderer();

        this.grid.lines.forEach(l =>
            this.scene.add(l.root)
        )
        this.scene.add(dougsCraft.root);

        this.initControls();
        this.initMouseSelector();
    }


    initRenderer(): void {

        this.width = window.innerWidth;
        this.height = window.innerHeight -30;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);

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
                this.dougsCraft.setDisplayType(CraftDisplayType.Wtf);
            if (event.code === 'Digit1')
                this.dougsCraft.setDisplayType(CraftDisplayType.Year_1);
                if (event.code === 'Digit2')
                this.dougsCraft.setDisplayType(CraftDisplayType.Year_2);
                if (event.code === 'Digit3')
                this.dougsCraft.setDisplayType(CraftDisplayType.Year_3);
                if (event.code === 'Digit4')
                this.dougsCraft.setDisplayType(CraftDisplayType.Year_4);
                if (event.code === 'Digit5')
                this.dougsCraft.setDisplayType(CraftDisplayType.Year_5);
            if (event.code === 'KeyR') {
                this.controls.autoRotate = !this.controls.autoRotate;
                this.controls.update();
            }
        }, false);
    }

    initMouseSelector() {
        this.raycaster =  new THREE.Raycaster();
        this.mouse = new THREE.Vector2(1, 1);

        window.addEventListener('pointermove', (event) => {
            this.mouse.x = ( event.clientX / this.width ) * 2 - 1;
            this.mouse.y = - ( event.clientY / this.height ) * 2 + 1;
        });

        window.addEventListener('pointerdown', (event) => {
            if (this.selectedCube && this.dougsCraft.getDisplayType() !== CraftDisplayType.Wtf)
                this.selectedCube.traceData();
        });
    }

    updateMouseSelector() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
    	const intersects = this.raycaster.intersectObject(this.dougsCraft.gridRoot, true);
    	if (intersects.length !== 0) {
            for (const obj of intersects) {
                if (obj.object.name != '') {
                    this.selectCube(this.dougsCraft.getCubeByName(obj.object.name));
                    break;
                }

            }
            
    	} else {
            this.unselectCube();
        }
    }

    selectCube(cube: Cube | null) {
        this.unselectCube();
        this.selectedCube = cube;
        if (cube)
            cube.setOverColor();
         
    }

    unselectCube() {
        if (!this.selectedCube) return;
        this.selectedCube.restoreColor();
        this.selectedCube = null;
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        this.updateMouseSelector();
        TWEEN.update();
    }

    onWindowResize = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight -30;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.width, this.height );
    }
}

