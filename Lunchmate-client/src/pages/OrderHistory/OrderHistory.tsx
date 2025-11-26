import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OrderHistoryTable from "../../components/order/OrderHistoryTable";

export default function OrderHistory() {
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <PageBreadcrumb pageTitle="Order History" />
      <div className="space-y-6">
        <ComponentCard title="Order History">
          <OrderHistoryTable />
        </ComponentCard>
      </div>
    </>
  );
}
