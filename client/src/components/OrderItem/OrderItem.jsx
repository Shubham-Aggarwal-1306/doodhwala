import React from 'react';
import './OrderItem.css';

const OrderItem = ({img, productName, size, orderType, quantity, price }) => {
  return (
    <div className='order-item'>
        <div className='order-item__img'>
            <img src={img} alt='product' />
        </div>
        <div className='order-item__details'>
            <div className='order-item__details--title'>
                {productName}
            </div>
            <div className='order-item__details--list'>
                <div className='order-item__details--list--item'>
                    {size} 
                </div>
                <div className='order-item__details--list--item'>
                    {(orderType === 'subscribe') ? 'Sub' : ((orderType === 'trial') ? 'Trial' : 'Buy')}
                </div>
                <div className='order-item__details--list--item'>
                    {quantity} {(orderType === 'subscribe') ? 'M' : ((orderType === 'trial') ? 'D' : '')}
                </div>
            </div>
        </div>
        <div className='order-item__price'>
            ₹{price}
        </div>
    </div>
  )
}

export default OrderItem;
