import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type userWithToken = {
  user: User;
  token: string;
};

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  mail: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
