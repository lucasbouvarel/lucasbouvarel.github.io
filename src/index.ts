import $ from 'jquery';
import { CsvParser } from './classes/csv-parser';
import { DougsCraft } from './classes/dougsCraft';
import { Grid } from './classes/grid';
import { Stage } from './classes/stage';
var dougsCraft: DougsCraft;

$<HTMLInputElement>(':file').on('change', function () {
    if (!this.files?.length) {
        return;
    }

    parseCsv(this.files);
});

function parseCsv(files: FileList): void {
    $('.upload-box').hide();

    var file = files[0];

    file.text()
        .then(CsvParser.parse)
        .then((lines) => dougsCraft.setData(lines));
}

$('.upload-box').on('dragover', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('dragging');
});

$('.upload-box').on('dragleave', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('dragging');
});

$('.upload-box').on('drop', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!event.originalEvent?.dataTransfer?.files?.length) {
        return;
    }

    parseCsv(event.originalEvent?.dataTransfer?.files);
});

$('.upload-box').on('click', function (event) {
    $(':file').trigger('click');
});

async function bootstrap(): Promise<void> {
    dougsCraft = new DougsCraft();
    const stage = new Stage(new Grid(500, 120), dougsCraft);
    stage.render();
    window.addEventListener('resize', stage.onWindowResize, false);
}

bootstrap();
