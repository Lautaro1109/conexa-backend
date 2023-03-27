import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsAlphanumeric, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'conexa_user@conexa.com',
    description: 'Un correo valido.',
  })
  mail: string;

  @IsAlphanumeric()
  @MinLength(8)
  @ApiProperty({
    example: 'conexa2023@',
    description: 'Una contraseña valida.',
  })
  password: string;
}
