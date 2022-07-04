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
        this.root.rotation.y = 5 * Math.PI / 4;
        this.initGrid();
        this.setDisplayType(CraftDisplayType.Wtf);
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

                const isYear = (i > 12 && i <= 65 && j > 34 && j <= 41);


                const cube = new Cube(this, isYear);
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

    public switchDisplayType(): void {
        this.setDisplayType(
            this.displayType === CraftDisplayType.Wtf 
                ? CraftDisplayType.Year 
                : CraftDisplayType.Wtf
        );
    }

    public setDisplayType(type: CraftDisplayType) {
        if (this.displayType === type) return;

        this.displayType = type;
        this.stopAllCubeTweens();

        this.resetAllCubes(() => {
            if (Cube.hasActiveTweens()) return; //totally weirdiest thing on earth
            this.startCurrentDisplayType();
        });
    }

    public getDisplayType(): CraftDisplayType {
        return this.displayType;
    }

    private stopAllCubeTweens(): void {
        this.fullGrid.forEach(line => line.forEach(cube => {
            cube.stopWtfMode();
            cube.killCurrentTween();
        }));
    }

    private resetAllCubes(onEnd?: () => void): void {
        let found = false;
        this.fullGrid.forEach(line => line.forEach(cube => found = cube.setSize(Cube.disabledSize, true, Math.random() * 10, onEnd) || found));
        if (!found && onEnd != null) {
            onEnd();
        }
    }

    private startCurrentDisplayType(): void { 
        switch(this.displayType) {
            case CraftDisplayType.Wtf: 
                this.fullGrid.forEach(line => line.forEach(cube => cube.startWtfMode()));
                break;
            case CraftDisplayType.Year:
                this.displayYearDatas();
                break;
        }
    }

    public setData(data: any) { 
        //TODO
    }

    displayYearDatas() {
        //####################### TODO : SET REAL YEAR DATAS HERE

        if (this.displayType !== CraftDisplayType.Year) return;

        let delay = 100;
        const deltaDelay = 6 + Math.random() * 4;
        this.yearGrid.forEach(cube => {
            delay += deltaDelay;
            cube.setSize(Cube.getRandomSize(), true, delay);
        });
        //#######################

    }
    

}
