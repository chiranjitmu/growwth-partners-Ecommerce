import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;
