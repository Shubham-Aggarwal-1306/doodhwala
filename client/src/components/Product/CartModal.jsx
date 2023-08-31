import React, { useEffect, useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import './CartModal.css';
import { addToCart } from '../../Actions/Cart';

const CartModal = ({ open, setOpen, product}) => {
    const { loading } = useSelector(state => state.cartReducer);
    console.log(product);
    const [type, setType] = useState(product?.order_type && product?.order_type[0]);
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(addToCart(product._id, amount, type, setOpen));
    }

    const handleAmountChange = (e) => {
        if (e.target.value.match("^\\d*$") != null) {
                setAmount(e.target.value);
        }
    }

    const handleAmountAdd = () => {
        if (type === "buy") {
            setAmount(amount + 1);
        } else if (type === "subscribe") {
            amount < parseInt(process.env.REACT_APP_SUB_MAX) && setAmount(amount + 1);
        } else {
            amount < parseInt(process.env.REACT_APP_TRY_MAX) && setAmount(amount + 1);
        }
    }

    const handleAmountSub = () => {
        if (type === "buy") {
            amount > 1 && setAmount(amount - 1);
        } else if (type === "subscribe") {
            amount > parseInt(process.env.REACT_APP_SUB_MIN) && setAmount(amount - 1);
        } else {
            amount > parseInt(process.env.REACT_APP_TRY_MIN) && setAmount(amount - 1);
        }
    }


    useEffect(() => {
        if (type === "buy") {
            setAmount(1);
        } else if (type === "subscribe") {
            setAmount(parseInt(process.env.REACT_APP_SUB_MIN));
        } else {
            setAmount(parseInt(process.env.REACT_APP_TRY_MIN));
        }
    }, [type]);

    return (
        <ModalContainer open={open} setOpen={setOpen} lock={loading}>
            {loading ?
                <div className="loading"><div className='loading__circle'></div></div> :
                <div className="cart-modal">
                    <div className="cart-modal__header">
                        Add to Cart
                    </div>
                    <div className="cart-modal__body">
                        <form onSubmit={submitHandler}>
                            <div className="cart-modal__body--select">
                                <label htmlFor="amount">Select Type</label>
                                <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                    {product.order_type?.map((type) => (
                                        <option key={type} value={type}>
                                            {/* Uppercase first letter */}
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="cart-modal__body--input">
                                <label htmlFor="amount">Enter {type === "buy" ? "Amount" : type ==="subscribe" ? "Months": "Days"}</label>
                                <div className="cart-modal__body--input--amount">
                                    <button type="button" onClick={handleAmountSub}>-</button>
                                    <input type="text" name="amount" id="amount" value={amount} onChange={handleAmountChange} disabled/>
                                    <button type="button" onClick={handleAmountAdd}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="cart-modal__body--button">Add</button>
                        </form>
                    </div>
                </div>
            }
        </ModalContainer>

    )
}

export default CartModal;