import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import MenuTable from "./MenuTable";

export default function MenuTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Menu Table" />
      <div className="space-y-6">
        <ComponentCard title="Menu Table">
          <MenuTable />
        </ComponentCard>
      </div>
    </>
  );
}
