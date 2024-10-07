import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt'; // Importar bcrypt

@Injectable()
export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    const userRepository = this.dataSource.getRepository(User);

    // Verifique se o usuário já existe
    const userExists = await userRepository.findOne({
      where: { username: 'testuser' },
    });

    if (userExists) {
      console.log('User already exists:', userExists);
      return; // Não cria um novo usuário se já existir
    }

    // Hashear a senha antes de salvar
    const hashedPassword = await bcrypt.hash('testpass', 10); // O número 10 é o custo do hash

    // Criar um novo usuário
    const user = userRepository.create({
      username: 'testuser',
      password: hashedPassword, // Armazenar a senha hasheada
    });

    console.log('Seeding user:', user);
    await userRepository.save(user);
    console.log('User seeded:', user);
  }
}
