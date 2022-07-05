import { Sphere } from "./sphere";
import { Line } from "./line";
import { Point } from "./point";

export class Grid {
    private horizontalLines: Line[];
    private verticalLines: Line[];
    private _spheres: Sphere[];
    constructor(private readonly size: number, private readonly divisions: number) {
        this.horizontalLines = [];
        this.verticalLines = [];
        this._spheres = [];
        this.createLines();
        this.createSpheres();
        this.animateSpheres();
    }

    private createLines(): void {
        const rowPoints: Point[][] = [];
        const columnPoints: Point[][] = [];
        const halfSize = this.size / 2;
        for (let count = 0; count < this.divisions; count++) {
            const offset = ((this.size / this.divisions) * count) - halfSize;
            rowPoints[count] = [new Point(-halfSize, 0, offset), new Point(halfSize, 0, offset)]
            columnPoints[count] = [new Point(offset, 0, -halfSize), new Point(offset, 0, halfSize)]
        }

        rowPoints.forEach(coordinates => {
            this.horizontalLines.push(new Line(coordinates[0], coordinates[1]));
        })

        columnPoints.forEach(coordinates => {
            this.verticalLines.push(new Line(coordinates[0], coordinates[1]));
        })
    }

    private createSpheres(): void {
        const sphereCount = 60;
        const allLines = this.lines;
        for (let i = 0; i < sphereCount; i++) {
            const line = allLines[Math.round(Math.random() * allLines.length)];
            const origin = Math.random() > 0.5 ? line.start : line.end
            const direction = line.start.x === line.end.x ? 'z' : 'x';
            this._spheres.push(new Sphere(origin, direction))
        }
    }

    public get lines(): Line[] {
        return [...this.horizontalLines, ...this.verticalLines]
    }

    public get spheres(): Sphere[] {
        return [...this._spheres]
    }

    private animateSpheres() {
        this._spheres.forEach(s => s.animate())
    }
}
