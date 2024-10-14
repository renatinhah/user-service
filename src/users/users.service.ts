import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<UserDto> {
    const userCreated = await this.usersRepository.save(user);
    return UserDto.fromEntity(userCreated);
  }

  async findByName(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
    //return user ? UserDto.fromEntity(user) : null;
  }

  async findById(id: string): Promise<UserDto | null> {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.usersRepository.findOne({
      where: { id: numericId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserDto.fromEntity(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map(UserDto.fromEntity);
  }

  async update(id: string, user: User): Promise<UserDto | null> {
    const numericId = parseInt(id, 10);
    await this.findById(id);
    await this.usersRepository.update(id, user);
    const userUpdated = await this.usersRepository.findOne({
      where: { id: numericId },
    });
    return UserDto.fromEntity(userUpdated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected !== 0;
  }
}
