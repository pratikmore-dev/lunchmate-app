import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { 
  getMenu, 
  getMenuById,
  createMenu, 
  updateMenu, 
  deleteMenu,
  Menu,
  CreateMenuRequest 
} from "../../service/menu.service";
// import { getFoodCategory, FoodCategory } from "../../service/menuCategory.service";
import { getFoodCategory, FoodCategory } from "../../service/foodCategory.service";

export default function AdminMenuTable() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<CreateMenuRequest>({
    MenuName: "",
    FoodCategoryID: "",
    Description: "",
    IsHalfAvailable: false,
    IsActive: true
  });

  const showMenuAlert = (options: {
    icon: "success" | "error" | "warning";
    title: string;
    text?: string;
    timer?: number;
  }) => {
    return Swal.fire({
      ...options,
      timer: options.timer ?? 1800,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.querySelector(".swal2-container") as HTMLElement | null;
        if (container) {
          container.style.zIndex = "999999";
        }
      },
    });
  };

  // Fetch menus and categories on component mount
  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMenu();
      setMenus(response.data);
    } catch (err) {
      console.error("Error fetching menus:", err);
      setError("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getFoodCategory();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      MenuName: "",
      FoodCategoryID: "",
      Description: "",
      IsHalfAvailable: false,
      IsActive: true
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  const fillFormFromMenu = (menu: Menu) => {
    setFormData({
      MenuName: menu.menuName,
      FoodCategoryID: menu.foodCategoryID,
      Description: menu.description || "",
      IsHalfAvailable: Boolean(menu.isHalfAvailable),
      IsActive: menu.isActive ?? true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      IsActive: e.target.value === "active"
    }));
  };

  const handleEdit = async (menu: Menu) => {
    setIsEditMode(true);
    setEditingId(menu.menuID);
    fillFormFromMenu(menu);
    openModal();

    try {
      const response = await getMenuById(menu.menuID);
      fillFormFromMenu(response.data);
    } catch (err) {
      console.error("Error fetching menu details:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete menu item?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      didOpen: () => {
        const container = document.querySelector(".swal2-container") as HTMLElement | null;
        if (container) {
          container.style.zIndex = "999999";
        }
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteMenu(id);
        await fetchMenus();
        await showMenuAlert({
          icon: "success",
          title: "Menu deleted",
          text: "The menu item was deleted successfully.",
        });
      } catch (err) {
        console.error("Error deleting menu:", err);
        await showMenuAlert({
          icon: "error",
          title: "Delete failed",
          text: "Failed to delete menu item.",
        });
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    openModal();
  };

  const { isOpen, openModal, closeModal } = useModal();
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Validate
      if (!formData.MenuName.trim()) {
        await showMenuAlert({
          icon: "warning",
          title: "Menu name required",
          text: "Please enter a menu name.",
        });
        return;
      }
      if (!formData.FoodCategoryID) {
        await showMenuAlert({
          icon: "warning",
          title: "Category required",
          text: "Please select a category.",
        });
        return;
      }

      const successTitle = isEditMode ? "Menu updated" : "Menu created";
      const successText = isEditMode
        ? "The menu item was updated successfully."
        : "The menu item was created successfully.";

      if (isEditMode && editingId) {
        // UPDATE
        await updateMenu(editingId, formData);
      } else {
        // CREATE
        await createMenu(formData);
      }
      
      // Refresh list
      await fetchMenus();
      
      // Reset and close
      resetForm();
      closeModal();
      await showMenuAlert({
        icon: "success",
        title: successTitle,
        text: successText,
      });
      
    } catch (err) {
      console.error("Error saving menu:", err);
      await showMenuAlert({
        icon: "error",
        title: isEditMode ? "Update failed" : "Create failed",
        text: isEditMode ? "Failed to update menu." : "Failed to create menu.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Menu Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage menu items, categories, and pricing
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          + Add New Item
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading menus...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
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
                    Menu Name
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
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Half Available
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
                {menus.length === 0 ? (
                  <TableRow>
                    <TableCell  className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      No menu items found. Add a new item to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  menus.map((menu) => (
                    <TableRow key={menu.menuID}>
                      {/* Menu Name */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <button
                            type="button"
                            onClick={() => handleEdit(menu)}
                            className="text-left font-medium text-brand-600 hover:text-brand-700 hover:underline dark:text-brand-400"
                          >
                            {menu.menuName}
                          </button>
                        </span>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                        {menu.foodCategory?.foodCategoryName || "N/A"}
                      </TableCell>

                      {/* Description */}
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-sm dark:text-gray-300">
                        {menu.description || "-"}
                      </TableCell>

                      {/* Half Available */}
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          size="sm"
                        >
                          {menu.isHalfAvailable ? "Yes" : "No"}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          size="sm"
                          color={menu.isActive ? "success" : "error"}
                        >
                          {menu.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(menu)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(menu.menuID)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer with Summary */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-white/[0.05] dark:bg-white/[0.02]">
            <div className="flex justify-between items-center text-theme-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Total Items: <span className="font-semibold text-gray-800 dark:text-white">{menus.length}</span>
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Active: <span className="font-semibold text-green-600 dark:text-green-400">
                  {menus.filter((menu) => menu.isActive).length}
                </span>
                {" | "}
                Inactive: <span className="font-semibold text-red-600 dark:text-red-400">
                  {menus.filter((menu) => !menu.isActive).length}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding/Editing Menu Item */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isEditMode ? "Edit Menu Item" : "Add New Menu Item"}
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Menu Details
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Category</Label>
                    <select 
                      name="FoodCategoryID"
                      value={formData.FoodCategoryID}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.foodCategoryID} value={category.foodCategoryID}>
                          {category.foodCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Menu Name</Label>
                    <Input 
                      type="text" 
                      name="MenuName"
                      value={formData.MenuName}
                      onChange={handleInputChange}
                      placeholder="Enter menu name" 
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Description</Label>
                    <textarea
                      name="Description"
                      value={formData.Description}
                      onChange={handleInputChange}
                      placeholder="Enter description (optional)" 
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="IsHalfAvailable"
                        checked={formData.IsHalfAvailable}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Half portion available
                      </span>
                    </label>
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
                          checked={formData.IsActive === true}
                          onChange={handleStatusChange}
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
                          checked={formData.IsActive === false}
                          onChange={handleStatusChange}
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
              <Button size="sm" variant="outline" onClick={closeModal} disabled={isSaving}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : isEditMode ? "Update Menu" : "Create Menu"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
