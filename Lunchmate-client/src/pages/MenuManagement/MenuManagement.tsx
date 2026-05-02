import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AdminMenuTable from "../../components/menuManagement/admin_menu_table";

export default function MenuManagement() {
  return (
    <>
      <PageMeta
        title="Menu Management | Lunchmate"
        description="Manage Lunchmate menu items"
      />
      <PageBreadcrumb pageTitle="Menu Management" />
      <div className="space-y-6">
        <ComponentCard title="All Menus">
          <AdminMenuTable />
        </ComponentCard>
      </div>
    </>
  );
}
