import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface OrderItem {
  name: string;
  quantity: number;
  rate: number;
}

interface OrderHistory {
  id: number;
  date: string;
  day: string;
  items: OrderItem[];
  total: number;
  additionalPay: number;
  officePay: number;
  employeePay: number;
}
// Define the table data using the interface
const orderHistoryData: OrderHistory[] = [
  {
    id: 1,
    date: "11 Oct, 2025",
    day: "Saturday",
    items: [
      { name: "Veg Biryani", quantity: 2, rate: 120 },
      { name: "Paneer Tikka", quantity: 1, rate: 80 },
    ],
    total: 320,
    additionalPay: 170, // (320 - 150) = 170
    officePay: 75, // 50% of 150
    employeePay: 245, // 75 (50% of 150) + 170 (additionalPay)
  },
  {
    id: 2,
    date: "10 Oct, 2025",
    day: "Friday",
    items: [
      { name: "Dal Tadka", quantity: 1, rate: 90 },
      { name: "Roti", quantity: 3, rate: 10 },
    ],
    total: 120,
    additionalPay: 0, // total <= 150, no additional pay
    officePay: 60, // 50% of 120
    employeePay: 60, // 50% of 120
  },
  {
    id: 3,
    date: "09 Oct, 2025",
    day: "Thursday",
    items: [
      { name: "Chicken Curry", quantity: 1, rate: 180 },
      { name: "Naan", quantity: 2, rate: 20 },
    ],
    total: 220,
    additionalPay: 70, // (220 - 150) = 70
    officePay: 75, // 50% of 150
    employeePay: 145, // 75 (50% of 150) + 70 (additionalPay)
  },
  {
    id: 4,
    date: "08 Oct, 2025",
    day: "Wednesday",
    items: [
      { name: "Masala Dosa", quantity: 2, rate: 60 },
      { name: "Filter Coffee", quantity: 2, rate: 30 },
    ],
    total: 180,
    additionalPay: 30, // (180 - 150) = 30
    officePay: 75, // 50% of 150
    employeePay: 105, // 75 (50% of 150) + 30 (additionalPay)
  },
  {
    id: 5,
    date: "07 Oct, 2025",
    day: "Tuesday",
    items: [
      { name: "Idli", quantity: 4, rate: 15 },
      { name: "Vada", quantity: 2, rate: 20 },
    ],
    total: 100,
    additionalPay: 0, // total <= 150, no additional pay
    officePay: 50, // 50% of 100
    employeePay: 50, // 50% of 100
  },
];


export default function MenuPageTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                 Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Order Details
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Additional Pay
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Office Pay
              </TableCell>
                <TableCell
                  isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                     Employee Pay
                </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {orderHistoryData.map((order) => (
              <TableRow key={order.id}>
                {/* Date Column */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.date}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {order.day}
                    </span>
                  </div>
                </TableCell>
                {/* Order Details Column */}
                <TableCell className="px-4 py-3 text-start">
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="text-gray-700 text-theme-sm dark:text-gray-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {" "}
                          × {item.quantity}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-theme-xs">
                          {" "}
                          (@₹{item.rate})
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                      {/* Total Column */}
                <TableCell className="px-4 py-3 text-start">
                  <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    ₹{order.total}
                  </span>
                </TableCell>
               {/* Additional Pay Column */}
                <TableCell className="px-4 py-3 text-start">
                  {order.additionalPay > 0 ? (
                    <span className="text-orange-600 font-medium text-theme-sm dark:text-orange-400">
                      +₹{order.additionalPay}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-theme-sm dark:text-gray-500">
                      -
                    </span>
                  )}
                </TableCell>
                {/* Office Pay Column */}
                <TableCell className="px-4 py-3 text-start">
                  <Badge size="sm" color="success">
                    ₹{order.officePay}
                  </Badge>
                </TableCell>
                {/* Employee Pay Column */}
                <TableCell className="px-4 py-3 text-start">
                  <Badge size="sm" color="error">
                    ₹{order.employeePay}
                  </Badge>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
