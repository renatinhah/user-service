import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User } from '../user.entity';

export class UserDto {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  role!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  lastLogin!: Date | null;

  @Exclude()
  password?: string;

  static fromEntity(user: User): UserDto {
    return plainToClass(UserDto, user);
  }

  static toEntity(userDto: UserDto): User {
    return {
      ...userDto,
      password: userDto.password || '',
    };
  }
}
