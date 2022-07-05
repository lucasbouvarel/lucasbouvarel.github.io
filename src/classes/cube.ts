import * as THREE from 'three';
import * as TWEEN  from '@tweenjs/tween.js'
import { DougsCraft, CraftDisplayType } from './dougsCraft';


export enum ColorSwitch {
    None,
    Standard,
    Year
}

const availableColors = [0x3D93B3, 0x296378, 0x52C8F2, 0x57D2FF, 0x4AB3D9]; //blue
//const availableColors = [0x964808, 0x5C2C05, 0x6660B, 0xE36C0B, 0xBD5A09]; //orange
const availableOverColors = [0xB38900, 0x785C00, 0xF2BA00, 0xFFC300, 0xDBA701]; //yellow/green
const availableYearColors = [0x8512B3, 0x590C78, 0xB418F2, 0xC019FF, 0xA716DB]; //purple 


export class Cube {

    static ACTIVE_TWEENS: TWEEN.Tween<any>[] = []; //ultra weird but tweenjs haven't got group controllers... 

    static defaultSize = 0.9;
    static disabledSize = 0.1;

    root!: THREE.Object3D;
    material!: THREE.MeshStandardMaterial;
    currentTween: TWEEN.Tween<any> | null = null;
    size!: number;
    autoAnim = false;
    isYear = false;
    colorIndex!: number;
    hasYearColor = false;

    constructor(private readonly parentCraft: DougsCraft, isYearCube: boolean) {
        this.isYear = isYearCube;
        this.root = new THREE.Object3D(); 

        this.colorIndex = Cube.getRandomColorIndex();
        this.material = new THREE.MeshStandardMaterial({ color: availableColors[this.colorIndex], metalness: 0.6, wireframe : false });
        const geometry = new THREE.BoxGeometry(Cube.defaultSize, Cube.defaultSize, Cube.defaultSize);
        const cube = new THREE.Mesh(geometry, this.material);
        cube.position.set(0, Cube.defaultSize / 2, 0);
        this.root.add(cube);

        this.setSize(Cube.disabledSize, false);
        
        /*
        if (enableDemo) {
            this.autoAnim = enableDemo;
            this.setSize(2, true, 400);
        }
        */
    }

    public isActive(): boolean {
        switch(this.parentCraft.getDisplayType()) {
            case CraftDisplayType.Wtf : return true;
            case CraftDisplayType.Year : return this.isYear;
        }
    }


    public setRootName(name: string): void {
        this.root.name = name;
    }

    public setPosition(x: number, y: number, z: number) {
        this.root.position.set(x, y, z);
    }

    public startWtfMode() {
        this.killCurrentTween();
        this.autoAnim = true;
        this.setSize(2, true, 400);
    }

    public stopWtfMode() {
        this.autoAnim = false;
    }

    public setSize(size: number, withAnim = true, withDelay = 0, colorSwitch: ColorSwitch = ColorSwitch.None, onEnd?: () => void): boolean {
        this.size = size;
        if (!withAnim) {
            this.root.scale.y = this.size;
            this.updateColor(colorSwitch);
            return true;
        } else {
            return this.animSize(withDelay, colorSwitch, onEnd);
        }
    }


    private animSize(withDelay = 0, colorSwitch: ColorSwitch = ColorSwitch.None, onEnd?: () => void): boolean {
        this.killCurrentTween();
        if (this.root.scale.y === this.size) return false; //nothing to do

        const isUp = this.root.scale.y < this.size;
        const minDuration = (this.autoAnim) ? 1200 : 800;
        const deltaDuration = (this.size === Cube.disabledSize) ? 100 : 1800;

        this.currentTween = new TWEEN.Tween(this.root.scale)
        .to({ y: this.size }, minDuration + Math.random() * deltaDuration)
        .delay(withDelay)
        .easing(isUp ? TWEEN.Easing.Elastic.Out : TWEEN.Easing.Back.In)
        .start()
        .onStart(() => this.updateColor(colorSwitch))
        .onComplete(() => {
            this.killCurrentTween();
            if (onEnd != null) {
                onEnd();
            }
            if (this.autoAnim)
                this.setSize(Cube.getRandomSize(), true, 300 + Math.random() * 500);
        });
        Cube.addToActiveTweens(this.currentTween);
        return true;
    }

    private updateColor(colorSwitch: ColorSwitch) {
        switch(colorSwitch) {
            case ColorSwitch.None: return;
            case ColorSwitch.Standard: 
                if (!this.hasYearColor) return;
                this.material.color.setHex(availableColors[this.colorIndex]);
                this.hasYearColor = false;
                break;
            case ColorSwitch.Year: 
            if (this.hasYearColor) return;
                this.material.color.setHex(availableYearColors[this.colorIndex]);
                this.hasYearColor = true;
                break;
        }
    }

    public killCurrentTween(): void {
        if (!this.currentTween) return;
        this.currentTween.stop();
        Cube.removeFromActiveTweens(this.currentTween);
        this.currentTween = null;
    }
 

    static getRandomColorIndex() {
        return Math.floor(Math.random() * availableColors.length);
    }

    static getRandomColor() {
        return availableColors[Cube.getRandomColorIndex()];
    }

    static getRandomSize() {
        let size = 0.5 + Math.random() * 5;
        const extra = Math.random();
        if (extra < 0.15)
            size += Math.random() * 4;
        if (extra < 0.03)
            size += Math.random() * 5;

        return size;
    }


    public static hasActiveTweens(): boolean {
        return !!Cube.ACTIVE_TWEENS.length;
    }

    public static addToActiveTweens(tween: TWEEN.Tween<any>): void {
        Cube.ACTIVE_TWEENS.push(tween);
    }

    public static removeFromActiveTweens(tween: TWEEN.Tween<any>): void {
        const index = Cube.ACTIVE_TWEENS.indexOf(tween, 0);
        if (index > -1) {
            Cube.ACTIVE_TWEENS.splice(index, 1);
        }
    }



    
    

}
