import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOrderList: ClientProviderOptions = {
    name: 'ORDER_LIST',
    transport: Transport.GRPC,
    options: {
        package: 'order',
        protoPath: join('/app/proto/order.proto'),
        url: 'order-service:50051',
    },
};

// export const grpcOrder2Client: ClientProviderOptions = {
//     name: 'ORDER_PACKAGE2',
//     transport: Transport.GRPC,
//     options: {
//         package: 'order2',
//         protoPath: join('/app/proto/order.proto'),
//         url: 'order-service:50051',
//     },
// };

export const grpcClients: ClientProviderOptions[] = [
    grpcOrderList,
    // grpcOrder2Client,
];
