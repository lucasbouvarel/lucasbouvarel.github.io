import { Point } from "./point";
import * as THREE from 'three';


export class Line {
    public readonly root!: THREE.Object3D;

    constructor(public readonly start: Point, public readonly end: Point, public readonly width: number = 1, public readonly color: number = 0x0000FF) {
        const material = new THREE.LineBasicMaterial({ color: this.color, linewidth: this.width });
        const geometry = new THREE.BufferGeometry()
            .setFromPoints([
                new THREE.Vector3(...this.start.toCoordinatesArray()),
                new THREE.Vector3(...this.end.toCoordinatesArray())
            ]);
            this.root= new THREE.Line(geometry, material);
    }

    public render(scene: THREE.Scene) {
        scene.add(this.root);
    }
}