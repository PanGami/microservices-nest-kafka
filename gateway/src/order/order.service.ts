import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface InventoryService {
  checkStock(data: { itemId: string }): any;
}

@Injectable()
export class OrderService {
  private inventoryService: InventoryService;

  constructor(@Inject('ORDER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.inventoryService = this.client.getService<InventoryService>('InventoryService');
  }

  async createOrder(orderData: any) {
    // Di sini kita forward ke REST endpoint dari order-service (nanti)
    return {
      message: 'Order diterima (sementara)',
      data: orderData,
    };
  }

  async checkStock(data: { itemId: string }) {
    const res = await lastValueFrom(this.inventoryService.checkStock(data));
    return res;
  }
}
