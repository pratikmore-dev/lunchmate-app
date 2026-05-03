import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "../../hooks/useModal";
import {
  getOrderHistory,
  getOrderHistoryById,
  OrderHistoryResponse,
} from "../../service/order.service";

const money = (value: number) => `Rs ${Number(value || 0).toFixed(2)}`;

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDay = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", { weekday: "long" });
};

export default function OrderHistoryTable() {
  const [orders, setOrders] = useState<OrderHistoryResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrderHistory();
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = async (order: OrderHistoryResponse) => {
    setSelectedOrder(order);
    openModal();

    try {
      setDetailsLoading(true);
      const response = await getOrderHistoryById(order.orderID);
      setSelectedOrder(response.data);
    } catch (err) {
      console.error("Error fetching order details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {loading && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            Loading order history...
          </div>
        )}

        {error && (
          <div className="py-8 text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Date
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Order Details
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Total
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Cash Paid
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Office Pay
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Employee Pay
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.orderID}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(order)}
                        className="text-left"
                      >
                        <span className="block font-medium text-brand-600 text-theme-sm hover:underline dark:text-brand-400">
                          {formatDate(order.orderDate)}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {formatDay(order.orderDate)}
                        </span>
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(order)}
                        className="text-left text-gray-700 text-theme-sm hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                      >
                        {order.totalItems} item{order.totalItems === 1 ? "" : "s"} from{" "}
                        {order.totalVendors} vendor{order.totalVendors === 1 ? "" : "s"}
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                        {money(order.totalAmount)}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      {order.cashPaid > 0 ? (
                        <span className="text-orange-600 font-medium text-theme-sm dark:text-orange-400">
                          {money(order.cashPaid)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-theme-sm dark:text-gray-500">
                          -
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge size="sm" color="success">
                        {money(order.companyCut)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge size="sm" color="error">
                        {money(order.employeeCut)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[760px] m-4">
        <div className="no-scrollbar relative w-full max-w-[760px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-10">
          <div className="px-2 pr-14">
            <h4 className="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Order Details
            </h4>
            {selectedOrder && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(selectedOrder.orderDate)} - {formatDay(selectedOrder.orderDate)}
              </p>
            )}
          </div>

          <div className="custom-scrollbar mt-6 max-h-[520px] overflow-y-auto px-2">
            {detailsLoading && (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                Loading details...
              </div>
            )}

            {selectedOrder && !detailsLoading && (
              <>
                <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">{money(selectedOrder.totalAmount)}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cash Paid</p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">{money(selectedOrder.cashPaid)}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Office Pay</p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">{money(selectedOrder.companyCut)}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Employee Pay</p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">{money(selectedOrder.employeeCut)}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Vendor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Portion</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.orderItemID}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.menuName}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.vendorName}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {item.isHalfPortion ? "Half" : "Full"} @ {money(item.itemRate)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">{money(item.subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end px-2">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
