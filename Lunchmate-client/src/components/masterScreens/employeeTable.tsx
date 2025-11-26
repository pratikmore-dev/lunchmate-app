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

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  EmployeeMail: string;
  EmployeePhone: number;
  Status: "Active" | "Inactive";
}

// Sample menu data - will come from database
const employeeData: Employee[] = [
  {
    EmployeeID: 1,
    FirstName: "Veg Biryani",
    LastName: "Main Course",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 120,
    Status: "Active",
  },
  {
    EmployeeID: 2,
    FirstName: "Paneer Tikka",
    LastName: "Starters",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 80,
    Status: "Active",
  },
  {
    EmployeeID: 3,
    FirstName: "Dal Tadka",
    LastName: "Main Course",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 90,
    Status: "Active",
  },
  {
    EmployeeID: 4,
    FirstName: "Roti",
    LastName: "Bread",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 10,
    Status: "Active",
  },
  {
    EmployeeID: 5,
    FirstName: "Chicken Curry",
    LastName: "Main Course",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 180,
    Status: "Active",
  },
  {
    EmployeeID: 6,
    FirstName: "Naan",
    LastName: "Bread",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 20,
    Status: "Active",
  },
  {
    EmployeeID: 7,
    FirstName: "Masala Dosa",
    LastName: "South Indian",
    EmployeeMail: "Shree Ganesh Food",
    EmployeePhone: 60,
    Status: "Active",
  },
  {
    EmployeeID: 8,
    FirstName: "Filter Coffee",
    LastName: "Beverages",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 30,
    Status: "Active",
  },
  {
    EmployeeID: 9,
    FirstName: "Idli",
    LastName: "South Indian",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 15,
    Status: "Active",
  },
  {
    EmployeeID: 10,
    FirstName: "Vada",
    LastName: "South Indian",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 20,
    Status: "Inactive",
  },
  {
    EmployeeID: 11,
    FirstName: "Gulab Jamun",
    LastName: "Desserts",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 40,
    Status: "Active",
  },
  {
    EmployeeID: 12,
    FirstName: "Ice Cream",
    LastName: "Desserts",
    EmployeeMail: "Shree Ganesh Snacks",
    EmployeePhone: 50,
    Status: "Inactive",
  },
];

export default function EmployeeTable() {
  const handleEdit = (EmployeeID: number) => {
    console.log("Edit menu item:", EmployeeID);
    // Add edit logic here
  };

  const handleDelete = (EmployeeID: number) => {
    console.log("Delete menu item:", EmployeeID);
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
            Employee Management
          </h2>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          + Add Employee
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
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Mail
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone
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
              {employeeData.map((item) => (
                <TableRow key={item.EmployeeID}>
                  {/* Menu Item Name */}
                  <TableCell className="px-5 py-4 text-start">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {item.FirstName}
                    </span>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                    {item.LastName}
                  </TableCell>

                  {/* Store Name */}
                  <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                    {item.EmployeeMail}
                  </TableCell>

                  {/* Rate */}
                  <TableCell className="px-4 py-3 text-start">
                    <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                      ₹{item.EmployeePhone}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={item.Status === "Active" ? "success" : "error"}
                    >
                      {item.Status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        // onClick={() => handleEdit(item.EmployeeID)}
                        onClick={openModal}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.EmployeeID)}
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
              Total Items: <span className="font-semibold text-gray-800 dark:text-white">{employeeData.length}</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Active: <span className="font-semibold text-green-600 dark:text-green-400">
                {employeeData.filter((item) => item.Status === "Active").length}
              </span>
              {" | "}
              Inactive: <span className="font-semibold text-red-600 dark:text-red-400">
                {employeeData.filter((item) => item.Status === "Inactive").length}
              </span>
            </span>
          </div>
        </div>
      </div>

         {/* Modal for Adding/Editing Employee */}
<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
  <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
    <div className="px-2 pr-14">
      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Add New Employee
      </h4>
    </div>
    <form className="flex flex-col">
      <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
        <div>
          {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Store
          </h5> */}

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>First Name</Label>
              <Input type="text" placeholder="Enter First Name" />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input type="text" placeholder="Enter Last Name" />
            </div>

            <div>
              <Label>Mail</Label>
              <Input type="text" placeholder="Enter Mail" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input type="text" placeholder="Enter Phone" />
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
                    name="Status"
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
                    name="Status"
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
      <div className="flex items-center gap-3 px-2 mt-1 lg:justify-end">
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