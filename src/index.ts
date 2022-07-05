import $ from 'jquery';
import { CsvParser } from './classes/csv-parser';
import { DougsCraft } from './classes/dougsCraft';
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
    const dougsCraft = new DougsCraft();
    const stage = new Stage(new Grid(500, 120), dougsCraft);
    stage.render();
    window.addEventListener('resize', stage.onWindowResize, false);
}

bootstrap();
