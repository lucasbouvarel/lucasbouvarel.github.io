import { Grid } from './classes/grid';
import { Stage } from './classes/stage';

async function bootstrap(): Promise<void> {
    const stage = new Stage(new Grid());
    stage.render();
}

bootstrap();
