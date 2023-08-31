import React, { useEffect, useState } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import './BuyModal.css';
import { addToCart } from '../../Actions/Cart';

const BuyModal = ({ open, setOpen, product}) => {
    const { loading } = useSelector(state => state.cartReducer);
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(addToCart(product._id, amount, "buy", setOpen));
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
                <div className="buy-modal">
                    <div className="buy-modal__header">
                        Buy {product.title}
                    </div>
                    <div className="buy-modal__body">
                        <form onSubmit={submitHandler}>
                            <div className="buy-modal__body--input">
                                <label htmlFor="amount">Enter Amount</label>
                                <div className="buy-modal__body--input--amount">
                                    <button type="button" onClick={() => (amount >1 ) && setAmount(amount - 1)}>-</button>
                                    <input type="text" name="amount" id="amount" value={amount} onChange={handleAmountChange} disabled/>
                                    <button type="button" onClick={() => setAmount(amount + 1)}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="buy-modal__body--button">Buy</button>
                        </form>
                    </div>
                </div>
            }
        </ModalContainer>

    )
}

export default BuyModal;