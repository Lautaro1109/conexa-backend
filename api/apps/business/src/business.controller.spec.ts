import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

describe('BusinessController', () => {
  let businessController: BusinessController;
  let businessService: BusinessService;

  let dbMock = [
    {
      _id: 1,
      mail: 'conexa_user_1@hotmail.com',
      password: 'conexa_password_1',
    },
    {
      _id: 2,
      mail: 'conexa_user_2@hotmail.com',
      password: 'conexa_password_2',
    },
    {
      _id: 3,
      mail: 'conexa_user_3@hotmail.com',
      password: 'conexa_password_3',
    },
    {
      _id: 4,
      mail: 'conexa_user_4@conexa.com',
      password: 'conexa_password_4',
    },
    {
      _id: 5,
      mail: 'conexa_user_5@conexa.com',
      password: 'conexa_password_5',
    },
    {
      _id: 6,
      mail: 'conexa_user_6@gmail.com',
      password: 'conexa_password_6',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [BusinessService],
    })
      .overrideProvider(BusinessService)
      .useValue({ getUserList: jest.fn() })
      .compile();

    businessController = app.get<BusinessController>(BusinessController);
    businessService = app.get<BusinessService>(BusinessService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(businessController).toBeDefined();
    });

    it('should call getUserListMock and return a list of users', async () => {
      businessService.getUserList = jest.fn().mockReturnValue(dbMock);

      const response = await businessController.getUserList({
        page: 1,
        limit: 5,
        search: '',
      });

      expect(response).toEqual(dbMock);
    });

    it('should call getUserListMock and return a list of users with the given search (GMAIL)', async () => {
      businessService.getUserList = jest.fn().mockReturnValue(dbMock.slice(5));

      const response = await businessController.getUserList({
        page: 1,
        limit: 5,
        search: '@gmail',
      });

      expect(response).toEqual([dbMock[5]]);
    });

    it('should call getUserListMock and return a list of users with the given search (HOTMAIL)', async () => {
      businessService.getUserList = jest
        .fn()
        .mockReturnValue(dbMock.slice(0, 4));

      const response = await businessController.getUserList({
        page: 1,
        limit: 5,
        search: '@hotmail',
      });

      expect(response).toEqual(dbMock.slice(0, 4));
    });
  });
});
