import $ from 'jquery';
import { CsvParser } from './classes/csv-parser';

$<HTMLInputElement>(':file').on('change', function () {
    if (!this.files?.length) {
        return;
    }

    var file = this.files[0];

    CsvParser.parse(file.stream()).then((lines) => console.log(lines));
});
