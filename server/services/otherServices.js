module.exports.getDeliveryDate = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let deliveryDate = new Date();
  if (currentHour < 21) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  } else {
    deliveryDate.setDate(deliveryDate.getDate() + 2);
  }
  return deliveryDate;
};
