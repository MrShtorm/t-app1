import { Controller, Delete, HttpCode } from '@nestjs/common';
import { TestingService } from '../application';

@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @HttpCode(204)
  @Delete('/all-data-delete')
  async deleteAllData(): Promise<void> {
    await this.testingService.deleteAllData();
  }
}
