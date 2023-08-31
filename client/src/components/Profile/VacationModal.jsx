import React, { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import "./VacationModal.css";
import OrderItem from "../OrderItem/OrderItem";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { vacation } from "../../Actions/Order";
import { useDispatch } from "react-redux";
const VacationModal = ({ open, setOpen, order }) => {
  const dispatch = useDispatch();
  const formatDate = (date) => {
    if (!date) return "Not Specified";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleSubmit = () => {
    dispatch(vacation(order._id, startDate, endDate));
    setOpen(false);
  };
  return (
    <ModalContainer open={open} setOpen={setOpen}>
      <div className="vacation-modal">
        <div className="vacation-modal__title">Active Services</div>
        <div className="vacation-modal__form">
          <div className="vacation-modal__form--order">
            <OrderItem
              img={order?.product?.images[0]}
              productName={order?.product?.title}
              size={order?.product?.size}
              orderType={"subscribe"}
              quantity={order?.months}
              price={order?.product?.price * order?.months * 30}
            />
          </div>
          <div className="vacation-modal__form--sub">
            <div className="vacation-modal__form--sub--title">Subscription</div>
            <div className="vacation-modal__form--sub--details">
              <div className="vacation-modal__form--sub--details--item">
                <div className="vacation-modal__form--sub--details--item--title">
                  Start Date
                </div>
                <div className="vacation-modal__form--sub--details--item--value">
                  {formatDate(order?.start_date)}
                </div>
              </div>
              <div className="vacation-modal__form--sub--details--item">
                <div className="vacation-modal__form--sub--details--item--title">
                  End Date &nbsp;
                </div>
                <div className="vacation-modal__form--sub--details--item--value">
                  {formatDate(order?.end_date)}
                </div>
              </div>
            </div>
          </div>
          <div className="vacation-modal__form--sub">
            <div className="vacation-modal__form--sub--title">Vacant</div>
            <div className="vacation-modal__form--sub--details">
              <div className="vacation-modal__form--sub--details--item">
                <div className="vacation-modal__form--sub--details--item--title">
                  Start
                </div>
                <div className="vacation-modal__form--sub--details--item--value">
                  {formatDate(order?.vacation?.start_date)}
                </div>
              </div>
              <div className="vacation-modal__form--sub--details--item">
                <div className="vacation-modal__form--sub--details--item--title">
                  Resume
                </div>
                <div className="vacation-modal__form--sub--details--item--value">
                  {formatDate(order?.vacation?.end_date)}
                </div>
              </div>
            </div>
          </div>
          <div className="vacation-modal__form--vacation">
            <div className="vacation-modal__form--vacation--title">
              Add Vacation
            </div>
            <div className="vacation-modal__form--vacation--details">
              <div className="vacation-modal__form--vacation--details--item">
                <div className="vacation-modal__form--vacation--details--item--title">
                  Stop
                </div>
                <div className="vacation-modal__form--vacation--details--item--value">
                  <DatePicker
                    onChange={setStartDate}
                    value={startDate}
                    format="dd/MM/yyyy"
                    minDate={new Date()}
                    maxDate={new Date(order?.end_date)}
                    className="vacation-modal__form--vacation--details--item--value--input"
                  />
                </div>
              </div>
              <div className="vacation-modal__form--vacation--details--item">
                <div className="vacation-modal__form--vacation--details--item--title">
                  Resume
                </div>
                <div className="vacation-modal__form--vacation--details--item--value">
                  <DatePicker
                    onChange={setEndDate}
                    value={endDate}
                    format="dd/MM/yyyy"
                    minDate={startDate}
                    className="vacation-modal__form--vacation--details--item--value--input"
                  />
                </div>
              </div>
            </div>
            <div className="vacation-modal__form--vacation--submit">
              <button onClick={handleSubmit}>Save</button>
            </div>
            <div className="vacation-modal__form--vacation--terms">
              <div className="vacation-modal__form--vacation--terms--item">
                1. All you subscription will be marked as paused and no delivery
                will be made during the vacation period.
              </div>
              <div className="vacation-modal__form--vacation--terms--item">
                2. Adding new vacation dates will override the previous ones.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default VacationModal;
