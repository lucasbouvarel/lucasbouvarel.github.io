import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'

import { Point } from './point';
const availableColors = [0xf5b507, 0xf77a14, 0xf77a14, 0x67fa11, 0x11fa57, 0xfa19f6, 0xfa1959];
const minDelay = 20;
const maxDelayOffset = 5000;
const minTimeToCross = 6000;
const maxTimeToCrossOffset = 10000;
export class Sphere {
    root!: THREE.Object3D;
    material!: THREE.MeshStandardMaterial;
    colorIndex: number;
    constructor(private origin: Point, private direction: 'x' | 'z') {
        this.colorIndex = Sphere.getRandomColorIndex();
        const geometry = new THREE.SphereGeometry(0.5);
        const material = new THREE.MeshPhongMaterial({ color: availableColors[this.colorIndex]});
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...origin.toCoordinatesArray());
        this.root = sphere;
    }

    static getRandomColorIndex() {
        return Math.floor(Math.random() * availableColors.length);
    }

    public animate() {
        const duration = minTimeToCross + Math.random() * maxTimeToCrossOffset;
        const delay = minDelay + Math.random() * maxDelayOffset
        new TWEEN.Tween(this.root.position)
            .to({ [this.direction]: -this.origin[this.direction] }, duration)
            .delay(delay).repeatDelay(0)
            .easing(TWEEN.Easing.Quintic.InOut)
            .repeat(Infinity)
            .start()

        new TWEEN.Tween(this.root.scale)
            .to({ x: 0, y: 0, z: 0 }, duration)
            .delay(delay).repeatDelay(0)
            .easing(TWEEN.Easing.Quintic.In)
            .repeat(Infinity)
            .start();
    }
}