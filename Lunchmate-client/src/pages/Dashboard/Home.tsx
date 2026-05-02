import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

const dashboardLinks = [
  {
    title: "Place Lunch Order",
    description: "Browse vendor menus and prepare today's lunch order.",
    href: "/menu-table",
  },
  {
    title: "Order History",
    description: "Review previous lunch orders and payment splits.",
    href: "/order-history",
  },
  {
    title: "Menu Management",
    description: "Maintain menu items, categories, and availability.",
    href: "/menu-management",
  },
  {
    title: "Food Stores",
    description: "Manage vendors and store contact details.",
    href: "/food_stores",
  },
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="Lunchmate Dashboard"
        description="Lunchmate lunch ordering dashboard"
      />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Lunchmate
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage lunch orders, menus, vendors, and master data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-800"
            >
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
