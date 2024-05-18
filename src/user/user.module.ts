import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InvitePoc } from './entities/invite-poc.entity';
import { InviteVol } from './entities/invite-vol.entity';
import { Relation } from './entities/relation.entity';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, InvitePoc, InviteVol, Relation])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
