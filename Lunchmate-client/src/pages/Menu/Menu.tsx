import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import MenuTable from "./MenuTable";
import PageMeta from "../../components/common/PageMeta";

export default function MenuTables() {
  return (
    <>
    <PageMeta
        title="Menu Table Dashboard | TailAdmin - React.js Admin Dashboard"
        description="This is React.js Menu Table Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Menu Table" />
      <div className="space-y-6">
        <ComponentCard title="Menu Table">
          <MenuTable />
        </ComponentCard>
      </div>
    </>
  );
}
