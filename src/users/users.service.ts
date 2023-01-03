import { Model } from 'mongoose';
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { user, userDocument } from './schemas/user.schema';
import * as argon2 from 'argon2';


@Injectable()
export class UsersService {
  
  constructor(@InjectModel(user.name) private userModel: Model<userDocument>) {}
  
  async createAndGetId(createUserDto: CreateUserDto) : Promise<string>{
    const createduser = new this.userModel(createUserDto);
    const user = await createduser.save()
    return user._id;
  }
  
  async create(createUserDto: CreateUserDto) : Promise<user>{
    const createduser = new this.userModel(createUserDto);
    const user = await createduser.save()
    return user;
  }

  async findAll(): Promise<user[]> {
    const users = await this.userModel.find().exec();
    users.forEach(async (user) => {
      user.password = "********" ;
    });

    return users
  }

  async findOne(id: string): Promise<user> {
    //id = mongoose.Types.ObjectId(userId)
    const existinguser = await this.userModel.findById(id).exec();
    if (!existinguser) {
     throw new NotFoundException(`user #${id} not found`);
    }
    return existinguser;
  }

  update(id: number, updateUserDto: user) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) : Promise<user> {
    const deleteduser = await this.userModel.findByIdAndDelete(id);
    if (!deleteduser) {
     throw new NotFoundException(`user #${id} not found`);
    }
    return deleteduser;
  }
}


