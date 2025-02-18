import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state with the product data from location.state
  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);

  async function handleUpdateItem() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.put(
          `http://localhost:3000/api/products/${productKey}`,
          {
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimensions,
            description: productDescription,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    } else {
      toast.error("You are not authorized to update items");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">Update Item</h1>
        <div className="space-y-4">
          {/* Product Key (Disabled) */}
          <div className="relative">
            <input
              disabled
              type="text"
              placeholder="Product Key"
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
            />
            {productKey && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Key
              </label>
            )}
          </div>

          {/* Product Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            {productName && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Name
              </label>
            )}
          </div>

          {/* Product Price */}
          <div className="relative">
            <input
              type="number"
              placeholder="Product Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            {productPrice && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Price
              </label>
            )}
          </div>

          {/* Product Category */}
          <div className="relative">
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <option value="audio">Audio</option>
              <option value="lights">Lights</option>
            </select>
            {productCategory && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Category
              </label>
            )}
          </div>

          {/* Product Dimensions */}
          <div className="relative">
            <input
              type="text"
              placeholder="Product Dimensions"
              value={productDimensions}
              onChange={(e) => setProductDimensions(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            {productDimensions && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Dimensions
              </label>
            )}
          </div>

          {/* Product Description */}
          <div className="relative">
            <textarea
              placeholder="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              rows="4"
            />
            {productDescription && (
              <label className="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-sm text-gray-500 dark:text-gray-300 transition-all pointer-events-none">
                Product Description
              </label>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleUpdateItem}
            className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Update Item
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="flex-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}