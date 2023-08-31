import React from "react";
import "./HistoryItem.css";

const HistoryItem = ({ data }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    return `${d.getDate()}/${month}`;
  };

  const formatOrderType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const trialDate = (start_date, end_date) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const startDay = startDate.getUTCDate();
    const endDay = endDate.getUTCDate();
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    return `${startDay} - ${endDay}, ${endMonth}`;
  };

  const subscribeDate = (start_date, end_date) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    const endYear = endDate.getFullYear();
    return `${startMonth} - ${endMonth}, ${endYear}`;
  };

  return (
    <div className="history-item">
      <div className="history-item__left">{formatDate(data?.delivery_date)}</div>
      <div className="history-item__right">
        <div className="history-item__right--title">
          {data.product_id?.title}
        </div>
        <div className="history-item__right--type">
          {formatOrderType(data?.order_type)}
          <div className="history-item__right--date">
            {data.order_type === "trial"
              ? ": " +
                trialDate(data?.trial_id?.start_date, data?.trial_id?.end_date)
              : data.order_type === "subscribe"
              ? ": " +
                subscribeDate(
                  data?.subscribe_id?.start_date,
                  data?.subscribe_id?.end_date
                )
              : ""}
          </div>
        </div>
        <div className="history-item__right--price">
          Price: ₹ {data?.final_price}
        </div>
        <div className="history-item__right--price">
          Quantity: {data?.quantity}
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
