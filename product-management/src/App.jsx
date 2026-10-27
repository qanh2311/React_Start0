import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { initialProducts } from "./data/products";
import "./App.css";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  // ADD
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // DELETE
  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );

    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
  };

  // EDIT - Lấy sản phẩm cần sửa lên form
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // UPDATE - Lưu sản phẩm sau khi sửa
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );

    setEditingProduct(null);
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Product Management</h1>

      <ProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />

      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
}

export default App;
