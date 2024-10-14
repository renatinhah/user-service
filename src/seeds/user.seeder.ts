import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    const userRepository = this.dataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: { username: 'testuser' },
    });

    if (userExists) {
      console.log('User already exists:', userExists);
    }

    // Hashear a senha antes de salvar
    const hashedPassword = await bcrypt.hash('testpass', 10);

    const user = userRepository.create({
      username: 'testuser',
      password: hashedPassword,
      role: 'user',
    });

    const user1 = userRepository.create({
      username: 'user um',
      password: hashedPassword,
      role: 'user',
    });

    const user2 = userRepository.create({
      username: 'user dois',
      password: hashedPassword,
      role: 'user',
    });

    await userRepository.save(user);
    console.log('Seeding user:', user);
    await userRepository.save(user1);
    console.log('Seeding user:', user1);
    await userRepository.save(user2);
    console.log('Seeding user:', user2);
  }
}
