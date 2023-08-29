import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

const envPath = path.resolve(__dirname, '..');
console.log('envPath: ', envPath);
console.log('process.env.DB_HOST: ', process.env.DB_HOST);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [envPath + '/**/*.entity{.ts,.js}'], // Path to your entity files
      synchronize: true, // Be cautious in production
    }),
  ],
})
export class DatabaseModule {}
