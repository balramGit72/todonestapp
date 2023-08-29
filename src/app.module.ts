import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module'; // Import your TodoModule
import { DatabaseModule } from 'src/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule, //Include your DatabaseModule here
    TodoModule, // Include your TodoModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
