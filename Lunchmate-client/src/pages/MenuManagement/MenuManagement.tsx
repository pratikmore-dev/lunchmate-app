import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AdminMenuTable from "../../components/menuManagement/admin_menu_table";

export default function MenuManagement() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Order History" />
      <div className="space-y-6">
        <ComponentCard title="Order History">
          <AdminMenuTable />
        </ComponentCard>
      </div>
    </>
  );
}
