import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('AppController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            listUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(loginController).toBeDefined();
    });
  });
});
