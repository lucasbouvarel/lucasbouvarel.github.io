import $ from 'jquery';
import { CsvParser } from './classes/csv-parser';
import { Grid } from './classes/grid';
import { Stage } from './classes/stage';

$<HTMLInputElement>(':file').on('change', function () {
    if (!this.files?.length) {
        return;
    }

    var file = this.files[0];

    file.text()
        .then(CsvParser.parse)
        .then((lines) => console.log(lines));
});

async function bootstrap(): Promise<void> {
    const stage = new Stage(new Grid(1000, 200));
    stage.render();
}

bootstrap();
