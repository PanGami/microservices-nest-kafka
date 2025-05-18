import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientProviderOptions = {
    name: 'ORDER_PACKAGE',
    transport: Transport.GRPC,
    options: {
        package: 'order',
        protoPath: join('/app/proto/order.proto'),
        url: 'order-service:50051',
    },
};