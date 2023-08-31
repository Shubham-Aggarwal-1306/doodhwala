import React from 'react'
import './ProductItem.css'
const ProductItem = ({ title, image, size }) => {
  return (
    <div className='product-item'>
      <div className='product-item__image'>
        <img src={image} alt='ProductImage'/>
      </div>
      <div className='product-item__details'>
        <div className='product-item__details__title'>
          {title}
        </div>
        <div className='product-item__details__size'>
          Weight: {size}
        </div>
      </div>
    </div>
  )
}

export default ProductItem