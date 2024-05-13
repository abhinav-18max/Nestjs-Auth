import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        return 'Please fill all fields';
      }
      if (createUserDto.password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(createUserDto.password, gensaalt);

      const user: User = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hashpass;
      user.role = createUserDto.role;
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      select: ['email', 'password', 'name'],
      where: { id: id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      select: ['email', 'password', 'name', 'role'],
      where: { email: email },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
