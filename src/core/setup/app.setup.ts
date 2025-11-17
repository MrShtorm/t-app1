import { INestApplication } from '@nestjs/common';
import { prefixSetup } from './prefix.setup';
import { pipesSetup } from './pipes.setup';

export function appSetup(app: INestApplication) {
  // prefixSetup(app);
  pipesSetup(app);
}
