import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

describe('BusinessController', () => {
  let businessController: BusinessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        {
          provide: BusinessService,
          useValue: { getUserListMock: jest.fn() },
        },
      ],
    }).compile();

    businessController = app.get<BusinessController>(BusinessController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(businessController).toBeDefined();
    });
  });
});
