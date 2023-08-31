import React, { useEffect } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer'
import HistoryItem from './HistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import './HistoryModal.css';
import { getOrderHistory } from '../../Actions/Order';

const HistoryModal = ({ open, setOpen }) => {
    const { history, loading } = useSelector(state => state.orderReducer);
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch, user]);

    return (
        <ModalContainer open={open} setOpen={setOpen}>
            <div className="history-modal">
                <div className='history-modal__title'>History</div>
            </div>
            {
                loading ? <div className="loading"><div className="loading__circle"></div></div> :
                    <div className="history-modal__list">
                        {   (!history || history?.length === 0) ? <div className="history-modal__list--empty">No orders yet</div> :
                            history?.map((item) => (
                                <HistoryItem key={item._id} data={item} />
                            ))
                        }
                    </div>
            }
        </ModalContainer>
    )
}

export default HistoryModal;