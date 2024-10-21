import { Test, TestingModule } from '@nestjs/testing';
import { MallApiController } from './mall-api.controller';
import { MallApiService } from './mall-api.service';

describe('MallApiController', () => {
  let mallApiController: MallApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MallApiController],
      providers: [MallApiService],
    }).compile();

    mallApiController = app.get<MallApiController>(MallApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mallApiController.getHello()).toBe('Hello World!');
    });
  });
});
