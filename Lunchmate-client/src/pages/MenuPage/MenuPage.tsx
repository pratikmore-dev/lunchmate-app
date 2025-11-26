import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import MenuPageTable from "../../components/menuPage/MenuPageTable";

export default function MennuPage() {
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <PageBreadcrumb pageTitle="Order History" />
      <div className="space-y-6">
        <ComponentCard title="Order History">
          <MenuPageTable />
        </ComponentCard>
      </div>
    </>
  );
}
