import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Menu from "./pages/Menu/Menu";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import MenuManagement from "./pages/MenuManagement/MenuManagement";
import EmployeeMasterScreen from "./pages/MasterScreens/EmployeeMasterScreen";
import FoodStoreMasterScreen from "./pages/MasterScreens/FoodStoreMasterScreen";
import FoodCategoryMasterScreen from "./pages/MasterScreens/FoodCategoryMasterScreen";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/menu-management" element={<MenuManagement />} />
            <Route path="/menu-table" element={<Menu />} />
            <Route path="/employees" element={<EmployeeMasterScreen />} />
            <Route path="/food_stores" element={<FoodStoreMasterScreen />} />
            <Route path="/food_categories" element={<FoodCategoryMasterScreen />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
