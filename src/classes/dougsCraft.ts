import * as THREE from 'three';
import * as TWEEN  from '@tweenjs/tween.js'
import { Cube } from './cube';


export class DougsCraft {

    static gridWidth = 7; //week days
    static gridHeight = 5; //weeks of month
    static gridBaseHeight = 0.25;

    public root!: THREE.Object3D;
    public gridRoot!: THREE.Object3D;
    private monthGrid!: Cube[][];

    constructor() {
        this.root = new THREE.Object3D(); 
        this.initGrid();
    }

    private initGrid() {
        const gridBase = new THREE.Mesh( 
                                new THREE.CylinderGeometry(5.8, 6, DougsCraft.gridBaseHeight, 32), 
                                new THREE.MeshStandardMaterial( {color: 0x002536}) );
        this.root.add(gridBase); 
        gridBase.position.set(0, DougsCraft.gridBaseHeight / 2, 0);

        this.gridRoot = new THREE.Object3D(); 
        this.root.add(this.gridRoot);
        this.gridRoot.position.set(0, DougsCraft.gridBaseHeight, 0);

        this.monthGrid = []; 
        for (let i = 0; i < DougsCraft.gridWidth; i++) {
            const week = new Array();
            this.monthGrid.push(week);
            for (let j = 0; j < DougsCraft.gridHeight; j++) {
                const cube = new Cube(true);
                this.gridRoot.add(cube.root);
                week.push(cube);
                
                cube.setPosition(   -DougsCraft.gridWidth / 2 + 0.5 + i,
                                    0,
                                    -DougsCraft.gridHeight / 2 + 0.5 + j);
                                    
                                    
            }
        }

    }

    public setData(data: any) { 
        //TODO
    }

}
