import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Search, AlertCircle, ShoppingCart } from 'lucide-react';
import { Sidebar } from '../Sidebar';

export default function Inventory({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState({ min: '', max: '' });
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Delete request failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleSell = async (product) => {
    if (product.stock_quantity === 0) return;

    setProcessingIds(prev => new Set(prev).add(product.id));

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/products/${product.id}/sell`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
      });

      if (response.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id
              ? { ...p, stock_quantity: p.stock_quantity - 1 }
              : p
          )
        );
      } else {
        alert('Sell request failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to process sale');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleEdit = (product) => {
    if (onNavigate) {
      onNavigate('/inventory/edit', { product });
    }
  };

  const handleAddProduct = () => {
    if (onNavigate) {
      onNavigate('/inventory/add');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const price = parseFloat(product.unit_price);
    const minPrice = priceFilter.min ? parseFloat(priceFilter.min) : -Infinity;
    const maxPrice = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    const stock = product.stock_quantity;
    const minStock = stockFilter.min ? parseInt(stockFilter.min) : -Infinity;
    const maxStock = stockFilter.max ? parseInt(stockFilter.max) : Infinity;
    const matchesStock = stock >= minStock && stock <= maxStock;

    return matchesSearch && matchesPrice && matchesStock;
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - visible on large screens */}
      <div className="hidden lg:block w-64 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
              </div>
              <button 
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Content scroll area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filter Bar */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (Rs)</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" value={priceFilter.min} onChange={(e) => setPriceFilter(prev => ({ ...prev, min: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                      <span className="self-center text-gray-500">-</span>
                      <input type="number" placeholder="Max" value={priceFilter.max} onChange={(e) => setPriceFilter(prev => ({ ...prev, max: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Range</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" value={stockFilter.min} onChange={(e) => setStockFilter(prev => ({ ...prev, min: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                      <span className="self-center text-gray-500">-</span>
                      <input type="number" placeholder="Max" value={stockFilter.max} onChange={(e) => setStockFilter(prev => ({ ...prev, max: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                </div>

                {(searchTerm || priceFilter.min || priceFilter.max || stockFilter.min || stockFilter.max) && (
                  <div className="mt-3 flex justify-end">
                    <button onClick={() => { setSearchTerm(''); setPriceFilter({ min: '', max: '' }); setStockFilter({ min: '', max: '' }); }} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Clear all filters</button>
                  </div>
                )}
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left px-4 py-4 text-sm font-semibold text-gray-900">#</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Name</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">SKU</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Price</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Stock</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                            <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredProducts.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-4">
                                <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{product.name}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-600">{product.sku}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className="font-semibold text-gray-900">Rs {parseFloat(product.unit_price).toFixed(2)}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={`font-semibold ${product.stock_quantity === 0 ? 'text-red-600' : product.stock_quantity < 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                                  {product.stock_quantity}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{product.category?.name || 'N/A'}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                                  <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                  <button onClick={() => handleSell(product)} disabled={product.stock_quantity === 0 || processingIds.has(product.id)} className={`p-2 rounded-lg transition-colors ${product.stock_quantity === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`} title={product.stock_quantity === 0 ? 'Out of stock' : 'Sell 1'}>
                                    {processingIds.has(product.id) ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-green-600"></div>
                                    ) : (
                                      <ShoppingCart className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
