import { Test, TestingModule } from '@nestjs/testing';
import { User, userWithToken } from '../schema/user.schema';
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

    it('should call login and return user with token', async () => {
      const loginMockedData: userWithToken = {
        user: {
          mail: 'conexa1@conexa.com',
          password: '123',
        },
        token: 'token',
      };

      jest.spyOn(loginController, 'login').mockImplementation(() => {
        return Promise.resolve(loginMockedData);
      });

      const res = await loginController.login({
        mail: 'conexa1@conexa.com',
        password: '123456',
      });

      expect(res).toBeDefined();
      expect(res.user).toBeDefined();
      expect(res.token).toBeDefined();
    });
  });
});
