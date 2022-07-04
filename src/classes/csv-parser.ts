import { parse } from 'csv-parse/browser/esm';

export type TaskLine = { date: string; count: number };

export class CsvParser {
    static async parse(stream: NodeJS.ReadableStream): Promise<TaskLine[]> {
        const lines: TaskLine[] = [];

        return new Promise<TaskLine[]>((resolve, reject) => {
            parse()
                .on('data', (data) => lines.push(data))
                .on('end', () => resolve(lines))
                .on('error', () => reject())
                .write(stream);
        });
    }
}
