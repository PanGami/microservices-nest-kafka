import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [OrderModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
