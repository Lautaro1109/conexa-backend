import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schema/user.schema';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('AppController', () => {
  let loginController: LoginController;
  let loginService: LoginService;
  let registerMockedData: User = {
    mail: 'conexa_user@conexa.com',
    password: 'conexa_password',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    })
      .overrideProvider(LoginService)
      .useValue({ register: jest.fn() })
      .compile();

    loginController = app.get<LoginController>(LoginController);
    loginService = app.get<LoginService>(LoginService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(loginController).toBeDefined();
    });

    it('should call register and create a new user with the given credentials', async () => {
      jest.spyOn(loginService, 'register').mockImplementation(() => {
        return Promise.resolve(registerMockedData);
      });

      const result = await loginController.register(registerMockedData);

      expect(result).toEqual(registerMockedData);
    });

    it('should call register and throw an error if the user already exists', async () => {
      jest.spyOn(loginService, 'register').mockImplementation(() => {
        return Promise.reject(registerMockedData);
      });

      try {
        await loginController.register(registerMockedData);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
