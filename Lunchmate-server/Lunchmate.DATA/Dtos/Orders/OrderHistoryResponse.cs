using System;
using System.Collections.Generic;

namespace Lunchmate.DATA.Dtos
{
    public class OrderHistoryResponse
    {
        public Guid OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal EmployeeCut { get; set; }
        public decimal CompanyCut { get; set; }
        public decimal CashPaid { get; set; }
        public int TotalItems { get; set; }
        public int TotalVendors { get; set; }
        public List<OrderHistoryItemResponse> Items { get; set; } = new();
    }

    public class OrderHistoryItemResponse
    {
        public Guid OrderItemID { get; set; }
        public Guid VendorMenuID { get; set; }
        public Guid MenuID { get; set; }
        public string MenuName { get; set; } = string.Empty;
        public Guid VendorID { get; set; }
        public string VendorName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public bool IsHalfPortion { get; set; }
        public decimal ItemRate { get; set; }
        public decimal Subtotal { get; set; }
    }
}
