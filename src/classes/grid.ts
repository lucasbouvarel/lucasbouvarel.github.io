import { Line } from "./line";
import { Point } from "./point";

export class Grid {
    private horizontalLines: Line[];
    private verticalLines: Line[];
    constructor(private readonly size: number, private readonly divisions: number) {
        this.horizontalLines = [];
        this.verticalLines = [];
        this.createLines();
    }

    private createLines(): void {
        const rowPoints: Point[][] = [];
        const columnPoints: Point[][] = [];
        for (let count = 0; count < this.divisions; count++) {
            const offset = (this.size / this.divisions) * count;
            rowPoints[count] = [new Point(-1000, offset, 0), new Point(1000, offset, 0)]
            columnPoints[count] = [new Point(offset, -1000, 0), new Point(offset, 1000, 0)]
        }

        rowPoints.forEach(coordinates => {
            this.horizontalLines.push(new Line(coordinates[0], coordinates[1]));
        })

        columnPoints.forEach(coordinates => {
            this.verticalLines.push(new Line(coordinates[0], coordinates[1]));
        })
    }

    public get lines(): Line[] {
        return [...this.horizontalLines, ...this.verticalLines]
    }

    public render(scene: THREE.Scene) {
        for (const line of this.lines) {
            line.render(scene);
        }
    }
}
