import { ClientProviderOptions, Transport, ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';

export function getGrpcService<T extends object>(client: ClientGrpc, serviceName: string): T {
    return client.getService<T>(serviceName);
}

export const grpcOptions = (
    name: string,
    packageName: string,
    serviceUrl: string,
):ClientProviderOptions => ({
    name,
    transport: Transport.GRPC,
    options: {
        package: packageName,
        protoPath: join('/app/proto/order.proto'),
        url: serviceUrl,
    },
});

export const GrpcClients = [
    grpcOptions('ORDER', 'order', 'order-service:50051'),
    // jika ingin menambahkan grpc client lain
    // grpcClientOptions('USER', 'user', 'user-service:50052'),
    // grpcClientOptions('AUTH', 'auth', 'auth-service:50053'),
    // grpcClientOptions('MASTER', 'master', 'master-service:50054'),
];
