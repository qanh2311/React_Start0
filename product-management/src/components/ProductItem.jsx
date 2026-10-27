function ProductItem({ product, onDelete, onEdit }) {
  return (
    <article className="product-row">
      <div className="product-row-details">
        <span className="product-row-icon" aria-hidden="true">
          P
        </span>
        <div className="product-row-copy">
          <h3 className="product-row-name">{product.name}</h3>
          <p className="product-row-price">
            {product.price.toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>

      <div className="product-row-actions">
        <button
          type="button"
          className="product-action product-action-edit"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          type="button"
          className="product-action product-action-delete"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductItem;
