import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeforeInsert, Repository } from 'typeorm';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<any> {
    let { first_name, last_name, email, password } = createAuthDto;
    const newUser = new Auth();
    password = await bcrypt.hash(password, 10);

    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = password;
    try {
      await this.authRepository.save(newUser);
    } catch (err) {
      if (err) {
        throw new ConflictException(`User with email ${email} already exists.`);
      }
    }
  }

  async signIn(loginDto: LoginDto): Promise<any> {
    let { email, password } = loginDto;

    let user = await this.authRepository.findOne({ email });
    if (user) {
      let authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new NotFoundException('Email or Password is wrong');
      }
      let authenticUser = _.pick(user, ['first_name', 'last_name', 'id']);
      return this.generateJwt(authenticUser);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  public generateJwt(user: Auth) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        exp: exp.getTime() / 1000,
      },
      process.env.SECRET,
    );
  }
}
