import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useRef, useState } from "react";
import MultiSelect from "../../../src/components/form/MultiSelect";


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

    // const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "1", text: "Option 1", selected: false },
    { value: "2", text: "Option 2", selected: false },
    { value: "3", text: "Option 3", selected: false },
    { value: "4", text: "Option 4", selected: false },
    { value: "5", text: "Option 5", selected: false },
  ];

const [selectedValues, setSelectedValues] = useState<string[]>(["1", "3"]);
const inputRef = useRef<HTMLInputElement>(null);
const [singleValue, setSingleValue] = useState<string>("");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);




  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        
            {/* Dropdowns Section */}
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* <div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[330px]"
                />
      </div> */}
       <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Search
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Shop Name
          </label>
          <select
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
       <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Food Category
          </label>
          <select
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
    </div>
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
