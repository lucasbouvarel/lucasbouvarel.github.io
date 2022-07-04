import { parse } from 'csv-parse/browser/esm/sync';

export type TaskLine = { date: string; count: number };

export class CsvParser {
    static async parse(csv: string): Promise<TaskLine[]> {
        return parse(csv, {
            columns: true,
            skip_empty_lines: true
        });
    }
}
