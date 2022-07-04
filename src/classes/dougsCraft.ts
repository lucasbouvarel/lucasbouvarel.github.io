import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN  from '@tweenjs/tween.js'
import { Cube } from './cube';

export enum CraftDisplayType {
    Year,
    Wtf
}


export class DougsCraft {

    static gridWidth = 78; 
    static gridHeight = 78; 
    static gridBaseHeight = 0.25;

    public root!: THREE.Object3D;
    public gridRoot!: THREE.Object3D;
    private fullGrid!: Cube[][];
    private yearGrid!: Cube[];
    private displayType!: CraftDisplayType;

    constructor() {
        this.root = new THREE.Object3D(); 
        this.root.rotation.y = -Math.PI / 4;
        this.initGrid();
        this.setDisplayType(CraftDisplayType.Wtf);
        //this.initTexts(this.root);
    }

    private initGrid() {
        /*
        const gridBase = new THREE.Mesh( 
                                new THREE.CylinderGeometry(5.8, 6, DougsCraft.gridBaseHeight, 32), 
                                new THREE.MeshStandardMaterial( {color: 0x002536}) );
                                */
        const gridBase = new THREE.Mesh( 
            new THREE.BoxGeometry(DougsCraft.gridWidth + 0.5, DougsCraft.gridBaseHeight, DougsCraft.gridWidth + 0.5), 
            new THREE.MeshStandardMaterial( {color: 0x002536}) );
        this.root.add(gridBase); 
        gridBase.position.set(0, DougsCraft.gridBaseHeight / 2, 0);

        this.gridRoot = new THREE.Object3D(); 
        this.root.add(this.gridRoot);
        this.gridRoot.position.set(0, DougsCraft.gridBaseHeight, 0);

        this.fullGrid = []; 
        this.yearGrid = []; 
        for (let i = 0; i < DougsCraft.gridWidth; i++) {
            const line = new Array();
            this.fullGrid.push(line);
            for (let j = 0; j < DougsCraft.gridHeight; j++) {

                const isYear = (j > 12 && j <= 65 && i > 34 && i <= 41);


                const cube = new Cube(isYear, this, isYear);
                this.gridRoot.add(cube.root);
                line.push(cube);

                if (isYear) {
                    cube.setRootName('yearDay_' + this.yearGrid.length);
                    this.yearGrid.push(cube);
                } else {
                    cube.setRootName('');
                }
                
                cube.setPosition(   -DougsCraft.gridWidth / 2 + 0.5 + i,
                                    0,
                                    -DougsCraft.gridHeight / 2 + 0.5 + j);
                                    
                                    
            }
        }
    }

    public setDisplayType(type: CraftDisplayType) {
        if (this.displayType === type) return;

        

    }


    public getDisplayType(): CraftDisplayType {
        return this.displayType;
    }

/*
    private initTexts(root: THREE.Object3D) {
        const loader = new FontLoader();
        loader.load('assets/fonts/helvetiker_regular.typeface.json', function (font) {

            const textLine = new THREE.Object3D();
            root.add(textLine);
            textLine.position.set(0, 1, -3.5);

            const textMessages = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

            const textSizes = [0.2];

            for (let i = 0; i < textMessages.length; i++) {
                const textsShapes = font.generateShapes( textMessages[i], textSizes[i] );
                const textsGeometry = new THREE.ShapeBufferGeometry( textsShapes );    
                const textsMaterial = new THREE.MeshBasicMaterial({color: 0xeeeeee});

                const text = new THREE.Mesh(textsGeometry, textsMaterial);
                text.position.set(-DougsCraft.gridWidth / 2 + 0.5 + i, 0, 0);
                text.name = textMessages[i]; 

                console.log("ADD TEXT");
                textLine.add(text);
            }

}); 
    }
*/

    public setData(data: any) { 
        //TODO
    }

}
