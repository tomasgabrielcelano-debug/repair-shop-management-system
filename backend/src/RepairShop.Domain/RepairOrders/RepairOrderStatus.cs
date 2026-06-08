namespace RepairShop.Domain.RepairOrders;

public enum RepairOrderStatus
{
    Received = 0,
    Diagnosing = 1,
    InProgress = 2,
    Ready = 3,
    Delivered = 4,
    Cancelled = 5
}
