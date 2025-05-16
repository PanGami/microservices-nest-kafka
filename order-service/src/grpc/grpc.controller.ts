import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcInventoryController {
  @GrpcMethod('InventoryService', 'CheckStock')
  checkStock(data: { itemId: string }) {
    // Sementara stok dummy
    return {
      inStock: true,
      quantity: 20,
    };
  }
}
