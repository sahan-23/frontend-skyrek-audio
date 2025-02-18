import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const navigate = useNavigate();

  async function handleAddItem() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.post(
          "http://localhost:3000/api/products",
          {
            key: productKey,
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
      toast.error("You are not authorized to add items");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">Add New Product</h1>
        <div className="space-y-4">
          {/* Product Key */}
          <div className="relative">
            <input
              type="text"
              placeholder="Product Key"
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
              value={productPrice === 0 ? "" : productPrice} // Show placeholder if value is 0
              onChange={(e) => setProductPrice(Number(e.target.value))} // Convert string to number
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
            {productPrice !== 0 && ( // Show floating label only if value is not 0
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
            onClick={handleAddItem}
            className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Add Product
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