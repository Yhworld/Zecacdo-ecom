import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../item/Item";

const SimilarProducts = ({ currentProduct }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const allProducts = useSelector(state => state.products.products); // Assuming you have all products in the Redux store

  useEffect(() => {
    if (currentProduct) {
      // Filter products based on price range or category
      const filteredProducts = allProducts.filter(product => {
        return (
          product.id !== currentProduct.id && // Exclude the current product
          (product.category === currentProduct.category || 
           (product.price >= currentProduct.price - 20 && product.price <= currentProduct.price + 20)) // Same category or within price range
        );
      });

      setSimilarProducts(filteredProducts);
    }
  }, [currentProduct, allProducts]);

  return (
    <div className=" p-6">
    <div className="max-w-screen-xl md:pl-12 container mx-auto mt-12">
      <h2 className="text-xl text-center md:text-start font-semibold">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {similarProducts.length > 0 ? (
          similarProducts.map(product => (
            <Item key={product.id} id={product.id} image={product.imageUrl} name={product.name} price={product.price} />
          ))
        ) : (
          <p className="text-gray-600">No similar products found.</p>
        )}
      </div>
    </div></div>
  );
};

export default SimilarProducts;
