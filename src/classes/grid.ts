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
        const halfSize = this.size/2;
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

    public get lines(): Line[] {
        return [...this.horizontalLines, ...this.verticalLines]
    }
}
