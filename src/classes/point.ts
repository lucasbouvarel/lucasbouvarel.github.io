export class Point {
    constructor(public readonly x: number, public readonly y: number, public readonly z: number) {
    }

    public toCoordinatesArray() : [number, number, number] {
        return [this.x, this.y, this.z]
    }
}