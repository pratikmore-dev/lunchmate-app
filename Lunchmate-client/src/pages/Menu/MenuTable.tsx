import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useMemo, useRef, useState } from "react";
import MultiSelect from "../../../src/components/form/MultiSelect";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { getMenu } from "../../service/menu.service";



interface MenuItem {
  id: string;
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
 const [menu, setMenu] = useState<MenuItem[]>([]);

useEffect(() => {
  getMenu()
    .then((res) => {
      const mappedMenu: MenuItem[] = res.data.map((item) => ({
        id: item.menuID,
        food: {
          image: "",            // not in API → empty
          name: item.menuName,  // from API
          type: "",             // not in API → empty
        },
        quantity: 0,            // UI-only
        rate: 0,                // API does not provide price
        total: 0,               // derived later
      }));

      setMenu(mappedMenu);
    })
    .catch(console.error);
}, []);


// const totalBill = menu.reduce((sum, item) => sum + item.total, 0);
const totalBill = useMemo(
  () => menu.reduce((sum, item) => sum + item.total, 0),
  [menu]
);
const employeeCut = totalBill / 2;
const companyCut = Math.min(totalBill / 2, 75);
const cash = totalBill > 150 ? totalBill - 150 : 0;


  // Function to handle quantity change
const handleQuantityChange = (id: string, change: number) => {  // Changed from 'number' to 'string'
  setMenu((prevData) =>
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
  const { isOpen, openModal, closeModal } = useModal();
    // const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  {menu.map((menuItem) => (
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

<div className="fixed bottom-8 right-8 z-50">
  <div className="group relative">
    <div className="absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg group-hover:block dark:bg-gray-700">
      Place Order
      <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
    </div>

   
    
      <button
      onClick={openModal}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95"
    >

       <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.98481 2.44399C3.11333 1.57147 1.15325 3.46979 1.96543 5.36824L3.82086 9.70527C3.90146 9.89367 3.90146 10.1069 3.82086 10.2953L1.96543 14.6323C1.15326 16.5307 3.11332 18.4291 4.98481 17.5565L16.8184 12.0395C18.5508 11.2319 18.5508 8.76865 16.8184 7.961L4.98481 2.44399ZM3.34453 4.77824C3.0738 4.14543 3.72716 3.51266 4.35099 3.80349L16.1846 9.32051C16.762 9.58973 16.762 10.4108 16.1846 10.68L4.35098 16.197C3.72716 16.4879 3.0738 15.8551 3.34453 15.2223L5.19996 10.8853C5.21944 10.8397 5.23735 10.7937 5.2537 10.7473L9.11784 10.7473C9.53206 10.7473 9.86784 10.4115 9.86784 9.99726C9.86784 9.58304 9.53206 9.24726 9.11784 9.24726L5.25157 9.24726C5.2358 9.20287 5.2186 9.15885 5.19996 9.11528L3.34453 4.77824Z"
      fill="currentColor"
    />
  </svg>
    </button>
  </div>
</div>

<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[450px] m-4">
  <div className="no-scrollbar relative w-full max-w-[450px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
    <div className="px-2 pr-14">
      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Place Order
      </h4>
    </div>
    
    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
    {/* order details */}
      <div className="mb-6">
        <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
          Order Details
        </h5>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Sr No</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Vendor</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Item</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Quantity</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {menu
                .filter((item) => item.quantity > 0)
                .map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{index + 1}</td>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">Vendor {index + 1}</td>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{item.food.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{item.quantity}</td>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              {menu.filter(item => item.quantity > 0).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No items added to cart yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    {/* billing section */}
      <div className="mb-6">
        <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
          Billing
        </h5>
        
        <div className="space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Total :</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">${totalBill.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Cash:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">${cash.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Emp Cut:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">${employeeCut.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Company Cut:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">${companyCut.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
      <Button size="sm" variant="outline" onClick={closeModal}>
        Cancel Order
      </Button>
      <Button 
        size="sm" 
        onClick={() => {
          alert("Order placed successfully!");
          closeModal();
        }}
        disabled={menu.filter(item => item.quantity > 0).length === 0}
      >
        Place Order
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
}
