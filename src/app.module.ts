import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(Appdatasource.options),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}
}
