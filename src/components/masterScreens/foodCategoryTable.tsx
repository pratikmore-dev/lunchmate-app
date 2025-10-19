import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Badge from "../ui/badge/Badge";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  storeName: string;
  rate: number;
  status: "Active" | "Inactive";
}

// Sample menu data - will come from database
const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Veg Biryani",
    category: "Main Course",
    storeName: "Shree Ganesh Food",
    rate: 120,
    status: "Active",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    category: "Starters",
    storeName: "Shree Ganesh Snacks",
    rate: 80,
    status: "Active",
  },
  {
    id: 3,
    name: "Dal Tadka",
    category: "Main Course",
    storeName: "Shree Ganesh Food",
    rate: 90,
    status: "Active",
  },
  {
    id: 4,
    name: "Roti",
    category: "Bread",
    storeName: "Shree Ganesh Food",
    rate: 10,
    status: "Active",
  },
  {
    id: 5,
    name: "Chicken Curry",
    category: "Main Course",
    storeName: "Shree Ganesh Food",
    rate: 180,
    status: "Active",
  },
  {
    id: 6,
    name: "Naan",
    category: "Bread",
    storeName: "Shree Ganesh Food",
    rate: 20,
    status: "Active",
  },
  {
    id: 7,
    name: "Masala Dosa",
    category: "South Indian",
    storeName: "Shree Ganesh Food",
    rate: 60,
    status: "Active",
  },
  {
    id: 8,
    name: "Filter Coffee",
    category: "Beverages",
    storeName: "Shree Ganesh Snacks",
    rate: 30,
    status: "Active",
  },
  {
    id: 9,
    name: "Idli",
    category: "South Indian",
    storeName: "Shree Ganesh Snacks",
    rate: 15,
    status: "Active",
  },
  {
    id: 10,
    name: "Vada",
    category: "South Indian",
    storeName: "Shree Ganesh Snacks",
    rate: 20,
    status: "Inactive",
  },
  {
    id: 11,
    name: "Gulab Jamun",
    category: "Desserts",
    storeName: "Shree Ganesh Snacks",
    rate: 40,
    status: "Active",
  },
  {
    id: 12,
    name: "Ice Cream",
    category: "Desserts",
    storeName: "Shree Ganesh Snacks",
    rate: 50,
    status: "Inactive",
  },
];

export default function FoodCategoryTable() {
  const handleEdit = (id: number) => {
    console.log("Edit menu item:", id);
    // Add edit logic here
  };

  const handleDelete = (id: number) => {
    console.log("Delete menu item:", id);
    // Add delete logic here
  };

  const handleAddNew = () => {
    console.log("Add new menu item");
    // Add new item logic here
  };

  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Food Category Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage menu items, categories, and pricing
          </p>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          + Add New Item
        </button>
      </div>

      {/* Table */}
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
                  Menu Item
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Store Name
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
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {menuData.map((item) => (
                <TableRow key={item.id}>
                  {/* Menu Item Name */}
                  <TableCell className="px-5 py-4 text-start">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {item.name}
                    </span>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                    {item.category}
                  </TableCell>

                  {/* Store Name */}
                  <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                    {item.storeName}
                  </TableCell>

                  {/* Rate */}
                  <TableCell className="px-4 py-3 text-start">
                    <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                      ₹{item.rate}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={item.status === "Active" ? "success" : "error"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        // onClick={() => handleEdit(item.id)}
                        onClick={openModal}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer with Summary */}
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-white/[0.05] dark:bg-white/[0.02]">
          <div className="flex justify-between items-center text-theme-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Total Items: <span className="font-semibold text-gray-800 dark:text-white">{menuData.length}</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Active: <span className="font-semibold text-green-600 dark:text-green-400">
                {menuData.filter((item) => item.status === "Active").length}
              </span>
              {" | "}
              Inactive: <span className="font-semibold text-red-600 dark:text-red-400">
                {menuData.filter((item) => item.status === "Inactive").length}
              </span>
            </span>
          </div>
        </div>
      </div>
        {/* Modal for Adding/Editing Menu Item */}
         {/* Modal for Adding/Editing Menu Item */}
<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[450px] m-4">
  <div className="no-scrollbar relative w-full max-w-[450px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
    <div className="px-2 pr-14">
      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Add Food Category
      </h4>
    </div>
    <form className="flex flex-col">
      <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
        <div>
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Food Category Details
          </h5>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Category Name</Label>
              <Input type="text" placeholder="Enter category name" />
            </div>

          </div>
        </div>
        <div className="mt-7">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
              <Label>Status</Label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    defaultChecked
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Active
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Inactive
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button size="sm" variant="outline" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</Modal>
    </div>
  );
}