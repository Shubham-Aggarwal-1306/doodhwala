import React from 'react';
import './HomeProductCard.css';
import TryModal from '../TryModal/TryModal';
import BuyModal from '../BuyModal/BuyModal';
import SubscribeModal from '../SubscribeModal/SubscribeModal';
import trashSolid from '../../Assets/trash-solid.svg';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Actions/Cart';

const HomeProductCard = ({ product }) => {
    const [showTryModal, setShowTryModal] = React.useState(false);
    const [showBuyModal, setShowBuyModal] = React.useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = React.useState(false);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(removeFromCart(product._id));
    }
    return (
        <>
            <div className='home-product-card'>
                <div className='home-product-card__image'>
                    <img src={product.images[0]} alt={product.name} />
                </div>
                <div className='home-product-card__main'>
                    <div className='home-product-card__title'>
                        {product.title}
                    </div>
                    <div className='home-product-card__price'>
                        {product.price} ₹
                    </div>
                </div>
                <div className='home-product-card__size'>
                    {product.size}
                </div>
                {(product.quantity > 0) ?
                    <div className="home-product-card__content--item">
                        <div className="home-product-card__content--item-type">
                            <b>Type</b>: {(product.orderType === 'subscribe') ? 'Sub' : ((product.orderType === 'trial') ? 'Try' : 'Buy')}
                        </div>
                        <div className="home-product-card__content--item-quantity">
                        {(product.orderType === "buy") ? "Quantity: " + (product.quantity) : (product.orderType === "trial")? "Days: " + (product.quantity) : "Months: " + (product.quantity)}
                        </div>
                        <button className="home-product-card__content--item-button" onClick={handleDelete}>
                            <img src={trashSolid} alt="Delete" />
                        </button>
                    </div>
                    :
                    <div className='home-product-card__buttons'>
                        <button className="product__info--left--buttons--try" onClick={() => { setShowTryModal(true) }}>Try</button>
                        <button className="product__info--left--buttons--buy" onClick={() => { setShowBuyModal(true) }}>Buy</button>
                        <button className="product__info--left--buttons--subscribe" onClick={() => { setShowSubscribeModal(true) }}>Subscribe</button>
                    </div>
                }
            </div>
            <TryModal open={showTryModal} setOpen={setShowTryModal} product={product} />
            <BuyModal open={showBuyModal} setOpen={setShowBuyModal} product={product} />
            <SubscribeModal open={showSubscribeModal} setOpen={setShowSubscribeModal} product={product} />
        </>
    )
}

export default HomeProductCard;
