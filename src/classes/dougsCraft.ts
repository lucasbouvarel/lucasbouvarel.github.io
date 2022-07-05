import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN  from '@tweenjs/tween.js'
import { Cube, ColorSwitch } from './cube';

export enum CraftDisplayType {
    Year_1,
    Year_2,
    Year_3,
    Year_4,
    Year_5,
    Wtf
}


export class DougsCraft {

    static gridWidth = 78; 
    static gridHeight = 78; 
    static gridBaseHeight = 0.25;

    public root!: THREE.Object3D;
    public gridRoot!: THREE.Object3D;
    public allCubeRoots!: THREE.Object3D[];
    private fullGrid!: Cube[][];
    private yearGrids!: Cube[][];
    private displayType!: CraftDisplayType;
    public data: any = [];
    private yearData: any[][] = [];
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
        this.allCubeRoots = []; 
        this.yearGrids = [[], [], [], [], [], [], [], [], []]; 
        for (let i = 0; i < DougsCraft.gridWidth; i++) {
            const line = new Array();
            this.fullGrid.push(line);
            for (let j = 0; j < DougsCraft.gridHeight; j++) {

                let yearIndex = -1; 
                if (i > 12 && i <= 65) { //totally weird but i'm tired
                     if (j > 6 && j <= 13)
                        yearIndex =  0;
                    else if (j > 13 && j <= 20)
                        yearIndex =  1;
                    else if (j > 20 && j <= 27)
                        yearIndex =  2;
                    else if (j > 27 && j <= 34)
                        yearIndex = 3;
                    else if (j > 34 && j <= 41)
                        yearIndex = 4;
                    else if (j > 41 && j <= 48)
                        yearIndex = 5;
                    else if (j > 48 && j <= 55)
                        yearIndex = 6;
                    else if (j > 55 && j <= 62)
                        yearIndex = 7;
                    else if (j > 62 && j <= 69)
                        yearIndex = 8;
                }


                const cube = new Cube(this, yearIndex > 0);
                this.gridRoot.add(cube.root);
                line.push(cube);
                this.allCubeRoots.push(cube.root);

                cube.setRootName('cube_' + i + '_' + j);
                

                if (yearIndex >= 0 && yearIndex < this.yearGrids.length) {
                    this.yearGrids[yearIndex].push(cube);
                } 
                
                cube.setCoord(i, j);
                cube.setPosition(   -DougsCraft.gridWidth / 2 + 0.5 + i,
                                    0,
                                    -DougsCraft.gridHeight / 2 + 0.5 + j);
                                    
            }
        }
    }

    public getCubeByName(name: string) : Cube | null {
        var parts = name.split('_');
        if (parts.length !== 3 || parts[0] !== 'cube')
            return null;
        return this.fullGrid[parseInt(parts[1])][parseInt(parts[2])];
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
        this.fullGrid.forEach(line => line.forEach(cube => found = cube.setSize(Cube.disabledSize, true, Math.random() * 10, ColorSwitch.Standard, onEnd) || found));
        if (!found && onEnd != null) {
            onEnd();
        }
    }

    private startCurrentDisplayType(): void { 
        switch(this.displayType) {
            case CraftDisplayType.Wtf: 
                this.fullGrid.forEach(line => line.forEach(cube => cube.startWtfMode()));
                break;
            default: 
                this.displayYearDatas();
                break;
        }
    }

    public setData(data: any) {
        this.data = data;
        const chunkSize = 365;
        let j = 0;
        const maxChunk = Math.round(this.data.length / chunkSize) - 1;
        for (let i = 0; i < this.data.length; i += chunkSize) {
            const chunk = this.data.slice(i, i + chunkSize);
            this.yearData[maxChunk - j] = chunk;
            j++;
        }
        this.setDisplayType(CraftDisplayType.Year_5);
    }

    private getYearGridsByDisplay(type: CraftDisplayType): Cube[][] {
        switch (type) {
            case CraftDisplayType.Year_1 : return [this.yearGrids[4]];
            case CraftDisplayType.Year_2 : return [this.yearGrids[3], this.yearGrids[5]];
            case CraftDisplayType.Year_3 : return [this.yearGrids[2], this.yearGrids[4], this.yearGrids[6]];
            case CraftDisplayType.Year_4 : return [this.yearGrids[1], this.yearGrids[3], this.yearGrids[5], this.yearGrids[7]];
            case CraftDisplayType.Year_5 : return [this.yearGrids[0], this.yearGrids[2], this.yearGrids[4], this.yearGrids[6], this.yearGrids[8]];
            case CraftDisplayType.Wtf : return [];
        }
    }

    private displayYearDatas() {
        //####################### TODO : SET REAL YEAR DATAS HERE

        if (this.displayType === CraftDisplayType.Wtf) return;

        const yearGrids = this.getYearGridsByDisplay(this.displayType);

        yearGrids.forEach((grid, index) => {
            let delay = 100;
            const deltaDelay = 6 + Math.random() * 4;
            const yearData: any[] = this.yearData[index];
            grid.forEach((cube, idx) => {
                delay += deltaDelay;
                let value: number = (yearData[idx]?.count && parseInt(yearData[idx].count, 10) / 100) ?? 0;
                if (value > 15) {
                    value = 15;
                }
                cube.setSize(value, true, delay, ColorSwitch.Year);
            });
        });
        //#######################

    }
    

}
