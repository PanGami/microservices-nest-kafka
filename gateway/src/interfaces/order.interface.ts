export interface GrpcOrderList {
  GetOrders(data: {
    page?: number;
    limit?: number;
    itemId?: string;
    status?: string;
  }): any;

  GetOrderDetail(data: {id: string}): any; 
}