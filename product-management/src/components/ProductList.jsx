import ProductItem from "./ProductItem";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <section className="product-list-section mt-4">
      <div className="product-list-header">
        <div>
          <span className="product-list-eyebrow">YOUR INVENTORY</span>
          <h2 className="product-list-title">Product list</h2>
          <p className="product-list-description">
            Manage and update your products.
          </p>
        </div>

        <div className="product-count" aria-label={`${products.length} products`}>
          <span className="product-count-value">{products.length}</span>
          <span className="product-count-label">
            {products.length === 1 ? "product" : "products"}
          </span>
        </div>
      </div>

      <div className="product-list-items">
        {products.length === 0 ? (
          <div className="product-list-empty">
            <span className="product-list-empty-icon" aria-hidden="true">
              +
            </span>
            <h3>No products yet</h3>
            <p>Add your first product using the form above.</p>
          </div>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProductList;
