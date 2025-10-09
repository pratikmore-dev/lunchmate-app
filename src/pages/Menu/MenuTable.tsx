import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

 import Badge from "../../components/ui/badge/Badge";

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

// Define the table data using the interface
const tableData: MenuItem[] = [
  {
    id: 1,
    food: {
      image: "/images/food/pizza.jpg",
      name: "Margherita Pizza",
      type: "Main Course",
    },
    quantity: 25,
    rate: 12.99,
    total: 324.75,
  },
  {
    id: 2,
    food: {
      image: "/images/food/burger.jpg",
      name: "Cheese Burger",
      type: "Fast Food",
    },
    quantity: 40,
    rate: 8.99,
    total: 359.60,
  },
  {
    id: 3,
    food: {
      image: "/images/food/pasta.jpg",
      name: "Alfredo Pasta",
      type: "Main Course",
    },
    quantity: 15,
    rate: 14.50,
    total: 217.50,
  },
  {
    id: 4,
    food: {
      image: "/images/food/coffee.jpg",
      name: "Cappuccino",
      type: "Beverage",
    },
    quantity: 50,
    rate: 4.99,
    total: 249.50,
  },
  {
    id: 5,
    food: {
      image: "/images/food/salad.jpg",
      name: "Caesar Salad",
      type: "Appetizer",
    },
    quantity: 30,
    rate: 9.99,
    total: 299.70,
  },
  {
    id: 6,
    food: {
      image: "/images/food/cake.jpg",
      name: "Chocolate Cake",
      type: "Dessert",
    },
    quantity: 18,
    rate: 6.99,
    total: 125.82,
  },
  {
    id: 7,
    food: {
      image: "/images/food/steak.jpg",
      name: "Grilled Steak",
      type: "Main Course",
    },
    quantity: 20,
    rate: 24.99,
    total: 499.80,
  },
  {
    id: 8,
    food: {
      image: "/images/food/juice.jpg",
      name: "Orange Juice",
      type: "Beverage",
    },
    quantity: 45,
    rate: 3.99,
    total: 179.55,
  },
];

export default function MenuTable() {
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
        {menuItem.quantity}
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
