import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-[200px] h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col p-4 space-y-2">
        {/* Dashboard Button */}
        <button className="w-full h-[50px] flex items-center justify-start space-x-2 p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
          <BsGraphDown className="text-xl" />
          <span className="text-lg font-semibold">Dashboard</span>
        </button>

        {/* Bookings Link */}
        <Link
          to="/admin/bookings"
          className="w-full h-[50px] flex items-center justify-start space-x-2 p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
        >
          <FaRegBookmark className="text-xl" />
          <span className="text-lg font-semibold">Bookings</span>
        </Link>

        {/* Items Link */}
        <Link
          to="/admin/items"
          className="w-full h-[50px] flex items-center justify-start space-x-2 p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
        >
          <MdOutlineSpeaker className="text-xl" />
          <span className="text-lg font-semibold">Items</span>
        </Link>

        {/* Users Button */}
        <button className="w-full h-[50px] flex items-center justify-start space-x-2 p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
          <FaRegUser className="text-xl" />
          <span className="text-lg font-semibold">Users</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-[calc(100vw-200px)] h-full overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">

        {/* Routes */}
        <Routes>
          <Route path="/bookings" element={<h1 className="text-gray-900 dark:text-gray-100">Booking</h1>} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/items/add" element={<AddItemPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
        </Routes>
      </div>
    </div>
  );
}