import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState } from "react";

interface MenuItem {
  id: number;
  food: {
    image: string;
    name: string;
    type: string;
  };
  quantity: number;
  rate: number;
  total: number;
}

export default function MenuTable() {
  const [tableData, setTableData] = useState<MenuItem[]>([
    {
      id: 1,
      food: {
        image: "/images/food/pizza.jpg",
        name: "Margherita Pizza",
        type: "Main Course",
      },
      quantity: 0,
      rate: 12.99,
      total: 0,
    },
    {
      id: 2,
      food: {
        image: "/images/food/burger.jpg",
        name: "Cheese Burger",
        type: "Fast Food",
      },
      quantity: 0,
      rate: 8.99,
      total: 0,
    },
    {
      id: 3,
      food: {
        image: "/images/food/pasta.jpg",
        name: "Alfredo Pasta",
        type: "Main Course",
      },
      quantity: 0,
      rate: 14.50,
      total: 0,
    },
    {
      id: 4,
      food: {
        image: "/images/food/coffee.jpg",
        name: "Cappuccino",
        type: "Beverage",
      },
      quantity: 0,
      rate: 4.99,
      total: 0,
    },
    {
      id: 5,
      food: {
        image: "/images/food/salad.jpg",
        name: "Caesar Salad",
        type: "Appetizer",
      },
      quantity: 0,
      rate: 9.99,
      total: 0,
    },
    {
      id: 6,
      food: {
        image: "/images/food/cake.jpg",
        name: "Chocolate Cake",
        type: "Dessert",
      },
      quantity: 0,
      rate: 6.99,
      total: 0,
    },
    {
      id: 7,
      food: {
        image: "/images/food/steak.jpg",
        name: "Grilled Steak",
        type: "Main Course",
      },
      quantity: 0,
      rate: 24.99,
      total: 0,
    },
    {
      id: 8,
      food: {
        image: "/images/food/juice.jpg",
        name: "Orange Juice",
        type: "Beverage",
      },
      quantity: 0,
      rate: 3.99,
      total: 0,
    },
  ]);

  // Function to handle quantity change
  const handleQuantityChange = (id: number, change: number) => {
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.rate,
          };
        }
        return item;
      })
    );
  };

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
                Item Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Rate
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
  {tableData.map((menuItem) => (
    <TableRow key={menuItem.id}>
      {/* Column 1: Item Name */}
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src={menuItem.food.image}
              alt={menuItem.food.name}
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {menuItem.food.name}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {menuItem.food.type}
            </span>
          </div>
        </div>
      </TableCell>
      
      {/* Column 2: Quantity */}
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {/* {menuItem.quantity} */}
         <div className="flex items-center gap-2">
                    {/* Minus Button */}
                    <button
                      onClick={() => handleQuantityChange(menuItem.id, -0.5)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      -
                    </button>

                    {/* Quantity Input */}
                    <input
                      type="number"
                      value={menuItem.quantity}
                      readOnly
                      className="w-16 rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-center text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />

                    {/* Plus Button */}
                    <button
                      onClick={() => handleQuantityChange(menuItem.id, 0.5)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
      </TableCell>
      
      {/* Column 3: Rate */}
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        ${menuItem.rate.toFixed(2)}
      </TableCell>
      
      {/* Column 4: Total */}
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        ${menuItem.total.toFixed(2)}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </div>
    </div>
  );
}
