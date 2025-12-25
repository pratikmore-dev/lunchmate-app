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
import { getVendor, createVendor, updateVendor, deleteVendor, Vendor } from "../../service/vendor.service";
import Swal from 'sweetalert2';

export default function FoodStoreTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    foodCategoryName: "",
    vendorName: "",
    address: "",
    phone: "",
    email: "",
    ownerID: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getVendor();
      setVendors(response.data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setError("Failed to load food stores");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vendor: Vendor) => {
    // Set edit mode
    setIsEditMode(true);
    setEditingId(vendor.vendorID);

    // Load existing data into form
    setFormData({
      foodCategoryName: vendor.foodCategoryName,
      vendorName: vendor.vendorName,
      address: vendor.address || "",
      phone: vendor.phone || "",
      email: vendor.email || "",
      ownerID: vendor.ownerID || ""
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
      await deleteVendor(id);

      await Swal.fire({
        title: 'Deleted!',
        text: 'Food store has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      fetchVendors(); // ✅ refresh data, not page

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete food store.',
        icon: 'error'
      });
    }
  };

  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = async () => {
    try {
      // Validate
      if (!formData.vendorName.trim()) {
        alert("Please enter a store name");
        return;
      }

      if (!formData.email.trim()) {
        alert("Please enter an email address");
        return;
      }

      if (isEditMode && editingId) {
        // UPDATE EXISTING
        await updateVendor(editingId, formData);
        alert("Store updated successfully!");
      } else {
        // CREATE NEW
        await createVendor(formData);
        alert("Store created successfully!");
      }

      // Refresh list
      await fetchVendors();

      // Reset and close
      setFormData({
        foodCategoryName: "",
        vendorName: "",
        address: "",
        phone: "",
        email: "",
        ownerID: ""
      });
      setIsEditMode(false);
      setEditingId(null);
      closeModal();

    } catch (err) {
      console.error("Error saving store:", err);
      alert(isEditMode ? "Failed to update store" : "Failed to create store");
    }
  };

  const handleAddNew = () => {
    // Reset to create mode
    setIsEditMode(false);
    setEditingId(null);

    // Reset form
    setFormData({
      foodCategoryName: "",
      vendorName: "",
      address: "",
      phone: "",
      email: "",
      ownerID: ""
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

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Food Store Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage food stores and vendor information
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          + Add New Store
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading stores...
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
                    Store Name
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
                    Contact
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Address
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
                {vendors.length === 0 ? (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      No food stores found. Add a new store to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  vendors.map((vendor) => (
                    <TableRow key={vendor.vendorID}>
                      {/* Store Name */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {vendor.vendorName}
                        </span>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-300">
                          {vendor.foodCategoryName}
                        </span>
                      </TableCell>

                      {/* Contact */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-300">
                          {vendor.phone || "N/A"}
                        </span>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-300">
                          {vendor.email}
                        </span>
                      </TableCell>

                      {/* Address */}
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-300">
                          {vendor.address || "N/A"}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(vendor)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vendor.vendorID)}
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
                Total Stores: <span className="font-semibold text-gray-800 dark:text-white">{vendors.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding/Editing Food Store */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isEditMode ? "Edit Food Store" : "Add Food Store"}
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Store Details
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Store Name</Label>
                    <Input
                      type="text"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleInputChange}
                      placeholder="Enter store name"
                    />
                  </div>

                  <div>
                    <Label>Food Category</Label>
                    <Input
                      type="text"
                      name="foodCategoryName"
                      value={formData.foodCategoryName}
                      onChange={handleInputChange}
                      placeholder="Enter food category"
                    />
                  </div>

                  <div>
                    <Label>Contact Number</Label>
                    <Input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter store address"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Owner ID</Label>
                    <Input
                      type="text"
                      name="ownerID"
                      value={formData.ownerID}
                      onChange={handleInputChange}
                      placeholder="Enter owner ID"
                    />
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