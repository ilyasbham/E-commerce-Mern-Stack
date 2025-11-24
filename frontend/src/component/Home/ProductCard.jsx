import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/placeholder.png";

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={productImage} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews || 0} Reviews)
        </span>
      </div>
      <span>{`₹${product.price || 0}`}</span>
    </Link>
  );
};

export default ProductCard;
