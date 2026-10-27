import { useState, useEffect } from "react";

function ProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(String(editingProduct.price));
    } else {
      setName("");
      setPrice("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productName = name.trim();
    const productPrice = Number(price);

    if (
      !productName ||
      !price.trim() ||
      !Number.isFinite(productPrice) ||
      productPrice <= 0
    ) {
      alert("Please enter valid product information!");
      return;
    }

    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        name: productName,
        price: productPrice,
      };

      onUpdateProduct(updatedProduct);
    } else {
      const newProduct = {
        id: Date.now(),
        name: productName,
        price: productPrice,
      };

      onAddProduct(newProduct);
    }

    setName("");
    setPrice("");
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-md-5">
        <div className="mb-4">
          <h3 className="fw-bold mb-1">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>
          <p className="text-secondary mb-0">
            {editingProduct
              ? "Update the product information below."
              : "Fill in the details to create a new product."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-7">
              <label htmlFor="productName" className="form-label fw-semibold">
                Product Name
              </label>

              <input
                id="productName"
                type="text"
                className="form-control form-control-lg"
                placeholder="e.g. Logitech G102 Mouse"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="productPrice" className="form-label fw-semibold">
                Product Price (VND)
              </label>

              <input
                id="productPrice"
                type="number"
                min="0"
                step="any"
                className="form-control form-control-lg"
                placeholder="e.g. 450000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-12">
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="submit"
                  className={`btn btn-lg px-4 ${
                    editingProduct ? "btn-success" : "btn-primary"
                  }`}
                >
                  {editingProduct ? "Save Changes" : "+ Add Product"}
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
