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
import { getFoodCategory, FoodCategory } from "../../service/foodCategory.service";
import { createFoodCategory, updateFoodCategory, deleteFoodCategory } from "../../service/foodCategory.service";
import Swal from 'sweetalert2';

export default function FoodCategoryTable() {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    FoodCategoryName: "",
    Description: "",
    IsActive: true
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch food categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFoodCategory();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load food categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: FoodCategory) => {
    // Set edit mode
    setIsEditMode(true);
    setEditingId(category.foodCategoryID);

    // Load existing data into form
    setFormData({
      FoodCategoryName: category.foodCategoryName,
      Description: category.description || "",
      IsActive: category.isActive
    });

    // Open modal
    openModal();
  };

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  });

  if (!result.isConfirmed) return;

  try {
    await deleteFoodCategory(id);

    await Swal.fire({
      title: 'Deleted!',
      text: 'Food category has been deleted.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    fetchCategories(); // ✅ refresh data, not page

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Failed to delete food category.',
      icon: 'error'
    });
  }
};

  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = async () => {
    try {
      // Validate
      if (!formData.FoodCategoryName.trim()) {
        alert("Please enter a category name");
        return;
      }

      if (isEditMode && editingId) {
        // UPDATE EXISTING
        await updateFoodCategory(editingId, formData);
      alert("Category updated successfully!");
      } else {
        // CREATE NEW
        await createFoodCategory(formData);
        alert("Category created successfully!");
      }

      // Refresh list
      await fetchCategories();

      // Reset and close
      setFormData({
        FoodCategoryName: "",
        Description: "",
        IsActive: true
      });
      setIsEditMode(false);
      setEditingId(null);
      closeModal();

    } catch (err) {
      console.error("Error saving category:", err);
      alert(isEditMode ? "Failed to update category" : "Failed to create category");
    }
  };

  const handleAddNew = () => {
    // Reset to create mode
    setIsEditMode(false);
    setEditingId(null);

    // Reset form
    setFormData({
      FoodCategoryName: "",
      Description: "",
      IsActive: true
    });

    openModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      IsActive: e.target.value === "active"
    }));
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
            Manage food categories and their status
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          + Add New Category
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading categories...
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
                    Category Name
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
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      No food categories found. Add a new category to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.foodCategoryID}>
                      {/* Category Name */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {category.foodCategoryName}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {category.description}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          size="sm"
                          color={category.isActive ? "success" : "error"}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.foodCategoryID)}
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
                Total Categories: <span className="font-semibold text-gray-800 dark:text-white">{categories.length}</span>
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Active: <span className="font-semibold text-green-600 dark:text-green-400">
                  {categories.filter((cat) => cat.isActive).length}
                </span>
                {" | "}
                Inactive: <span className="font-semibold text-red-600 dark:text-red-400">
                  {categories.filter((cat) => !cat.isActive).length}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding/Editing Food Category */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[450px] m-4">
        <div className="no-scrollbar relative w-full max-w-[450px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isEditMode ? "Edit Food Category" : "Add Food Category"}
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
                    <Input
                      type="text"
                      name="FoodCategoryName"
                      value={formData.FoodCategoryName}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Description</Label>
                    <Input
                      type="textarea"
                      name="Description"
                      value={formData.Description}
                      onChange={handleInputChange}
                      placeholder="Enter category description"
                    />
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