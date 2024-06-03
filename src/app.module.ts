import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RsaService } from './services/rsa.service';
import { RsaController } from './controllers/rsa.controller';

@Module({
  imports: [],
  controllers: [RsaController],
  providers: [RsaService],
})
export class AppModule {}
