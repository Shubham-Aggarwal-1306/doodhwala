import React, { useEffect } from 'react';
import "./ProductCatalogue.css";
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Actions/Product';

const ProductCatalogue = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.productReducer);
  const { isAuthenticated } = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="product-catalogue">
      <div className="product-catalogue__hero">
        <div className="product-catalogue__hero--content">
          <div className="product-catalogue__hero--title">
            Our Premium Products
          </div>
          <div className="product-catalogue__hero--text">
            We are a Premium D2C Fresh Food Brand, with a strong focus on purity,
            freshness & convenience. At Happy Nature, we produce Pure,
            Local & Wholesome Indian food products like fresh cow milk,
            ghee, paneer, honey, and other authentic products.
          </div>
        </div>
      </div>
      <div className="product-catalogue__products">

        {(loading) ? (
          <div className="loading"><div className='loading__circle'></div></div>) : (
          products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                {...product}
              />
            )
          })
        )
        }
      </div>
    </div>
  )
}

export default ProductCatalogue;