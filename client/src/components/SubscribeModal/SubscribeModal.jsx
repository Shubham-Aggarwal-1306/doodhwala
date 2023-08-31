import React, { useEffect, useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import './SubscribeModal.css';
import { addToCart } from '../../Actions/Cart';

const SubscribeModal = ({ open, setOpen, product}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.cartReducer);
    const [amount, setAmount] = useState(parseInt(process.env.REACT_APP_SUB_MIN));
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(addToCart(product._id, amount, "subscribe", setOpen));
    }

    const handleAmountChange = (e) => {
        if (e.target.value.match("^\\d*$") != null) {
            setAmount(e.target.value);
        }
    }

    return (
        <ModalContainer open={open} setOpen={setOpen} lock={loading}>
            {loading ?
                <div className="loading"><div className='loading__circle'></div></div> :
                <div className="subscribe-modal">
                    <div className="subscribe-modal__header">
                        Subscribe {product.title}
                    </div>
                    <div className="subscribe-modal__body">
                        <form onSubmit={submitHandler}>
                            <div className="subscribe-modal__body--input">
                                <label htmlFor="amount">Enter Months</label>
                                <div className="subscribe-modal__body--input--amount">
                                    <button type="button" onClick={() => (amount >(parseInt(process.env.REACT_APP_SUB_MIN)) ) && setAmount(amount - 1)}>-</button>
                                    <input type="text" name="amount" id="amount" value={amount} onChange={handleAmountChange} disabled/>
                                    <button type="button" onClick={() => (amount < (parseInt(process.env.REACT_APP_SUB_MAX))) && setAmount(amount + 1)}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="subscribe-modal__body--button">Subscribe</button>
                        </form>
                    </div>
                </div>
            }
        </ModalContainer>

    )
}

export default SubscribeModal;