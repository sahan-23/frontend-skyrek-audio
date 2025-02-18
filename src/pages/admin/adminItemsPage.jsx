import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.key !== key));
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setItemsLoaded(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="w-full h-full p-8 bg-gray-50 dark:bg-gray-900 relative">
      {/* Loading Spinner */}
      {!itemsLoaded && (
        <div className="flex justify-center items-center h-full">
          <div className="border-4 border-b-blue-500 rounded-full animate-spin w-8 h-8"></div>
        </div>
      )}

      {/* Items Table */}
      {itemsLoaded && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-left text-gray-700 dark:text-gray-200">
                <th className="p-4 border-b dark:border-gray-600">Key</th>
                <th className="p-4 border-b dark:border-gray-600">Name</th>
                <th className="p-4 border-b dark:border-gray-600">Price</th>
                <th className="p-4 border-b dark:border-gray-600">Category</th>
                <th className="p-4 border-b dark:border-gray-600">Dimensions</th>
                <th className="p-4 border-b dark:border-gray-600">Availability</th>
                <th className="p-4 border-b dark:border-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, index) => (
                <tr
                  key={product.key}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <td className="p-4 border-b dark:border-gray-600 dark:text-gray-200">{product.key}</td>
                  <td className="p-4 border-b dark:border-gray-600 dark:text-gray-200">{product.name}</td>
                  <td className="p-4 border-b dark:border-gray-600 dark:text-gray-200">${product.price.toFixed(2)}</td>
                  <td className="p-4 border-b dark:border-gray-600 dark:text-gray-200">{product.category}</td>
                  <td className="p-4 border-b dark:border-gray-600 dark:text-gray-200">{product.dimensions}</td>
                  <td className="p-4 border-b dark:border-gray-600">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.availability
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {product.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="p-4 border-b dark:border-gray-600 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        navigate(`/admin/items/edit`, { state: product });
                      }}
                      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.key)}
                      className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Item Button */}
      <Link
        to="/admin/items/add"
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <CiCirclePlus className="text-3xl" />
      </Link>
    </div>
  );
}