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
import { getFoodCategory,FoodCategory } from "../../service/foodCategory.service";
import { getVendor, Vendor } from "../../service/vendor.service";
import { getVendorMenu } from "../../service/vendorMenu.service";

interface VendorMenuItem {
  vendorMenuID: string;
  menuID: string;
  menuName: string;
  fullRate: number;
  halfRate: number;
  isAvailable: boolean;
  vendorSpecificNotes: string;
  // Add client-side state for cart management
  quantity: number;
  selectedRate: 'full' | 'half';
}

interface Menu{
  menuID:string;
  menuName:string;
  fullRate:number;
  halfRate:number;
  isHalfAvilable:boolean;
  vendorSpecificNotice:string;
}

export default function MenuTable() {
const [vendorMenuItems, setVendorMenuItems] = useState<VendorMenuItem[]>([]);
 const[foodCategory,setFoodCategory] = useState<FoodCategory[]>([]);
 const[vendor, setVendor] = useState<Vendor[]>([]);
 const [vendorID, setVendorID] = useState("");
useEffect(() => {
  getVendor().then((res)=>{
    setVendor(res.data)
  })
  getFoodCategory().then((res)=>{
    setFoodCategory(res.data)
  })
  .catch(console.error)

}, []);


useEffect(()=>{
  
  console.log("vendor dropdown triggered");
    if (!vendorID) {
    setVendorMenuItems([]); // Clear menu when no vendor selected
    return;
  }
  getVendorMenu(vendorID)
    .then((res) => {
      // Transform API data to include UI state
      const itemsWithDefaults = res.data.map((item: VendorMenuItem) => ({
        ...item,
        quantity: 0, // Initialize quantity
        selectedRate: 'full' as const, // Default to full rate
      }));
      setVendorMenuItems(itemsWithDefaults);
    })
    .catch((error) => {
      console.error('Failed to fetch vendor menu:', error);
      setVendorMenuItems([]); // Clear on error
    });
}, [vendorID]);



// Remove old calculations and replace with:
const cartItems = useMemo(
  () => vendorMenuItems.filter((item) => item.quantity > 0),
  [vendorMenuItems]
);

const totalBill = useMemo(() => {
  return vendorMenuItems.reduce((sum, item) => {
    if (item.quantity === 0) return sum;
    
    const rate = item.selectedRate === 'full' ? item.fullRate : item.halfRate;
    return sum + (rate * item.quantity);
  }, 0);
}, [vendorMenuItems]);

const employeeCut = useMemo(() => totalBill / 2, [totalBill]);

const companyCut = useMemo(() => Math.min(totalBill / 2, 75), [totalBill]);

const cash = useMemo(() => (totalBill > 150 ? totalBill - 150 : 0), [totalBill]);


// Handler for quantity changes
const handleQuantityChange = (vendorMenuID: string, change: number) => {
  setVendorMenuItems((prevItems) =>
    prevItems.map((item) => {
      if (item.vendorMenuID === vendorMenuID) {
        const newQuantity = Math.max(0, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    })
  );
};

// Handler for rate selection (full/half)
const handleRateSelection = (vendorMenuID: string, rateType: 'full' | 'half') => {
  setVendorMenuItems((prevItems) =>
    prevItems.map((item) =>
      item.vendorMenuID === vendorMenuID
        ? { ...item, selectedRate: rateType }
        : item
    )
  );
};
  const { isOpen, openModal, closeModal } = useModal();


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
            onChange={(e) => setVendorID(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select option</option>
            {
              vendor.map(ven=>(
                <option key={(ven.vendorID)}  value={ven.vendorID}>{ven.vendorName}</option>
              ))
            }
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
            {
              foodCategory.map(cat =>(
                <option key={cat.foodCategoryID} value={cat.foodCategoryName}>{cat.foodCategoryName}</option>
              ))
            }
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
                Menu Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
               Full Rate
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
               Half Rate
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Vendor Notes
              </TableCell>
               <TableCell
      isHeader
      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
    >
      Quantity
    </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
<TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
  {vendorMenuItems.length === 0 ? (
    <TableRow>
      <TableCell  className="px-5 py-8 text-center">
        <span className="text-gray-500 dark:text-gray-400">
          {vendorID ? 'No menu items available' : 'Please select a vendor to view menu'}
        </span>
      </TableCell>
    </TableRow>
  ) : (
    vendorMenuItems.map((item) => (
      <TableRow key={item.vendorMenuID}>
        {/* Column 1: Menu Name */}
        <TableCell className="px-5 py-4 text-start">
          <div className="flex items-center gap-3">
            <div>
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {item.menuName}
              </span>
              {!item.isAvailable && (
                <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Unavailable
                </span>
              )}
            </div>
          </div>
        </TableCell>

        {/* Column 2: Full Rate */}
        <TableCell className="px-4 py-3 text-start">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              ${item.fullRate.toFixed(2)}
            </span>
            <button
              onClick={() => handleRateSelection(item.vendorMenuID, 'full')}
              className={`rounded-md px-2 py-1 text-xs transition-colors ${
                item.selectedRate === 'full'
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              disabled={!item.isAvailable}
            >
              Full
            </button>
          </div>
        </TableCell>

        {/* Column 3: Half Rate */}
        <TableCell className="px-4 py-3 text-start">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              ${item.halfRate.toFixed(2)}
            </span>
            <button
              onClick={() => handleRateSelection(item.vendorMenuID, 'half')}
              className={`rounded-md px-2 py-1 text-xs transition-colors ${
                item.selectedRate === 'half'
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              disabled={!item.isAvailable}
            >
              Half
            </button>
          </div>
        </TableCell>

        {/* Column 4: Vendor Notes */}
        <TableCell className="px-4 py-3 text-start">
          {item.vendorSpecificNotes ? (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.vendorSpecificNotes}
            </span>
          ) : (
            <span className="text-sm italic text-gray-400 dark:text-gray-500">
              No notes
            </span>
          )}
        </TableCell>

        {/* Column 5: Quantity Controls */}
        <TableCell className="px-4 py-3 text-start">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.vendorMenuID, -1)}
              disabled={item.quantity === 0 || !item.isAvailable}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              -
            </button>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                if (value >= 0) {
                  handleQuantityChange(item.vendorMenuID, value - item.quantity);
                }
              }}
              disabled={!item.isAvailable}
              className="w-16 rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-center text-sm text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              min="0"
            />

            <button
              onClick={() => handleQuantityChange(item.vendorMenuID, 1)}
              disabled={!item.isAvailable}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </TableCell>
      </TableRow>
    ))
  )}
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
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Item</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Quantity</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Total</th>
              </tr>
            </thead>
           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {cartItems.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No items added to cart yet
            </td>
          </tr>
        ) : (
          cartItems.map((item, index) => {
            const rate = item.selectedRate === 'full' ? item.fullRate : item.halfRate;
            const itemTotal = rate * item.quantity;
            
            return (
              <tr key={item.vendorMenuID}>
                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                  <div>
                    <div className="font-medium">{item.menuName}</div>
                    {item.vendorSpecificNotes && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.vendorSpecificNotes}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                  <div className="flex items-center gap-1">
                    <span>${rate.toFixed(2)}</span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {item.selectedRate}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                  {item.quantity}
                </td>
                <td className="px-3 py-2 text-right text-sm font-medium text-gray-900 dark:text-white">
                  ${itemTotal.toFixed(2)}
                </td>
              </tr>
            );
          })
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
      // TODO: Implement API call to place order
      // Prepare order data
      const orderData = {
        vendorID: vendorID,
        items: cartItems.map(item => ({
          vendorMenuID: item.vendorMenuID,
          menuID: item.menuID,
          menuName: item.menuName,
          quantity: item.quantity,
          selectedRate: item.selectedRate,
          rate: item.selectedRate === 'full' ? item.fullRate : item.halfRate,
          total: (item.selectedRate === 'full' ? item.fullRate : item.halfRate) * item.quantity,
        })),
        billing: {
          totalBill: totalBill,
          cash: cash,
          employeeCut: employeeCut,
          companyCut: companyCut,
        },
        orderDate: new Date().toISOString(),
      };
      
      console.log('Order to be placed:', orderData);
      alert("Order placed successfully!");
      
      // Reset quantities after successful order
      setVendorMenuItems(prev => 
        prev.map(item => ({ ...item, quantity: 0, selectedRate: 'full' as const }))
      );
      
      closeModal();
    }}
    disabled={cartItems.length === 0}
  >
    Place Order ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
  </Button>
</div>
  </div>
</Modal>
    </div>
  );
}
