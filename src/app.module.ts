import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return Object.assign(await getConnectionOptions());
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
