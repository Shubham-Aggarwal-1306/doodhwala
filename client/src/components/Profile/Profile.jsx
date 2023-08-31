import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../../Actions/User";
import profileSample from "../../Assets/profileSample.jpg";
import WalletHistoryItem from "./WalletHistoryItem";
import EditableProfileItem from "./EditableProfileItem";
import OrderItem from "../OrderItem/OrderItem";
import AddMoneyModal from "./AddMoneyModal";
import HistoryModal from "./HistoryModal";
import { walletBalance, walletHistory } from "../../Actions/Wallet";
import { getServices } from "../../Actions/Order";
import { getUserReferral } from "../../Actions/Referral";
import VacationModal from "./VacationModal";
import ProfileImageModal from "./ProfileImageModal";
import Wallet from "../../Assets/Icons/wallet.svg";

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);
  const { balance, loading, history } = useSelector(
    (state) => state.walletReducer
  );
  const { referral } = useSelector(
    (state) => state.referralReducer
  );
  const { services, loading: orderLoading } = useSelector(
    (state) => state.orderReducer
  );
  const [name, setName] = useState(
    user.displayName ? user.displayName : user.name
  );
  const [phone, setPhone] = useState(
    user.phoneNumber ? user.phoneNumber : user.phoneData
  );
  const [altPhone, setAltPhone] = useState(user.altPhone);
  const [email, setEmail] = useState(user.email ? user.email : user.emailData);
  const [address, setAddress] = useState(user.address);
  const [altAddress, setAltAddress] = useState(user.altAddress);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showVacationModal, setShowVacationModal] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [vacationOrder, setVacationOrder] = useState(null);
  const profileUpdateHanlder = () => {
    dispatch(
      updateUserProfile({
        name: name || "",
        phoneData: phone || "",
        altPhone: altPhone || "",
        emailData: email || "",
        address: address || "",
        altAddress: altAddress || "",
      })
    );
  };
  useEffect(() => {
    dispatch(walletBalance());
    dispatch(walletHistory());
    dispatch(getServices());
    dispatch(getUserReferral());
  }, [dispatch, isAuthenticated]);
  return (
    <>
      <div className="profile">
        <div className="profile__left">
          <div className="profile__left__image">
            <img
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : user?.profileImage || profileSample
              }
              alt="profile"
            />
          </div>
          {user?.photoUrl ? null : (
            <button
              className="profile__left__image--button"
              onClick={() => setShowProfileImageModal(true)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9612 0.917504C13.1314 0.0876422 11.786 0.0876351 10.9561 0.917504L9.76621 2.10736L4.16612 7.70741C4.07534 7.79822 4.01095 7.91198 3.97981 8.0365L3.27148 10.8698C3.21113 11.1112 3.28185 11.3666 3.45779 11.5425C3.63373 11.7184 3.88907 11.7892 4.13046 11.7288L6.96376 11.0205C7.08836 10.9893 7.20205 10.9249 7.29285 10.8341L12.8522 5.27483L14.0828 4.04424C14.9127 3.21437 14.9127 1.86889 14.0828 1.03903L13.9612 0.917504ZM11.9578 1.91924C12.2344 1.64262 12.6829 1.64262 12.9595 1.91924L13.0811 2.04076C13.3577 2.31739 13.3577 2.76589 13.0811 3.0425L12.3611 3.76254L11.2593 2.61774L11.9578 1.91924ZM10.2574 3.61965L11.3591 4.76445L6.42989 9.69372L4.93217 10.0681L5.30659 8.57044L10.2574 3.61965ZM1.83366 4.66663C1.83366 4.27544 2.15079 3.9583 2.54199 3.9583H6.08366C6.47487 3.9583 6.79199 3.64117 6.79199 3.24997C6.79199 2.85877 6.47487 2.54163 6.08366 2.54163H2.54199C1.36839 2.54163 0.416992 3.49303 0.416992 4.66663V12.4583C0.416992 13.6319 1.36839 14.5833 2.54199 14.5833H10.3337C11.5073 14.5833 12.4587 13.6319 12.4587 12.4583V8.9166C12.4587 8.52546 12.1415 8.20827 11.7503 8.20827C11.3591 8.20827 11.042 8.52546 11.042 8.9166V12.4583C11.042 12.8495 10.7249 13.1666 10.3337 13.1666H2.54199C2.15079 13.1666 1.83366 12.8495 1.83366 12.4583V4.66663Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
          <div className="profile__left__name">{user?.displayName}</div>
          <button className="profile__left__logout" onClick={handleLogout}>
            Logout
          </button>

          <div>
            {loading ? (
              <div className="loading">
                <div className="loading__circle"></div>
              </div>
            ) : (
              <div className="profile__left__referral">
                <div className="profile__left-text">
                Referral Code: <code>{referral[0]?.referral_code}</code>
                </div>
                <div className="profile__left-text">
                Total Referrals: {referral[0]?.number_of_referrals}
                </div>
              </div>
            )}
          </div>

          <div className="profile__left__wallet">
            <div className="profile__left__wallet--icon">
              <img src={Wallet} alt="cart" />
            </div>
            <div className="profile__left__wallet--amount">
              {loading ? (
                <div className="loading">
                  <div className="loading__circle"></div>
                </div>
              ) : (
                `₹ ${balance}`
              )}
            </div>
          </div>
          <button
            className="profile__left__wallet--button"
            onClick={() => setShowAddMoneyModal(true)}
          >
            + Add Money
          </button>
          <div className="profile__left__wallet-history">
            <div className="profile__left__wallet-history--title">Wallet</div>
            <div className="profile__left__wallet-history--list">
              {!history || history?.length === 0 ? (
                <div className="no-history">No History</div>
              ) : (
                history?.map((item, index) => (
                  <WalletHistoryItem
                    key={item?._id}
                    title={item?.order_type.toUpperCase()}
                    amount={item?.amount}
                    date={new Date(item?.createdAt).toDateString()}
                    balance={item?.balance}
                    transactionType={item?.transaction_type}
                    paymentResponse={item?.payment_response}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="profile__right">
          <div className="profile-text">Profile</div>
          <div className="profile__right--personal">
            <EditableProfileItem
              title="Name"
              value={name}
              setValue={setName}
              editable={!user?.displayName}
            />
            <EditableProfileItem
              title="Phone"
              value={phone}
              setValue={setPhone}
              editable={!user?.phoneNumber}
            />
            <EditableProfileItem
              title="Alternate Phone"
              value={altPhone}
              setValue={setAltPhone}
            />
            <EditableProfileItem
              title="Email"
              value={email}
              setValue={setEmail}
              editable={!user?.email}
            />
            <EditableProfileItem
              title="Address"
              value={address}
              setValue={setAddress}
            />
            <EditableProfileItem
              title="Alternate Address"
              value={altAddress}
              setValue={setAltAddress}
            />
            <div className="profile__right--personal--buttons">
              <button
                className="profile__right--personal--button"
                onClick={profileUpdateHanlder}
              >
                Save
              </button>
            </div>
          </div>
          <div className="profile__right--service">
            <div className="profile__right--service--title">
              Active Services
            </div>
            <div className="profile__right--service--list">
              {orderLoading ? (
                <div className="loading">
                  <div className="loading__circle"></div>
                </div>
              ) : (
                <>
                  {services?.trials?.map((orderDetails) => (
                    <div key={orderDetails?._id}>
                      <OrderItem
                        img={orderDetails?.product?.images[0]}
                        productName={orderDetails?.product?.title}
                        size={orderDetails?.product?.size}
                        orderType={"trial"}
                        quantity={orderDetails?.days}
                        price={
                          orderDetails?.product?.price * orderDetails?.days
                        }
                      />
                    </div>
                  ))}
                  {services?.subscribes?.map((orderDetails) => (
                    <div
                      key={orderDetails._id}
                      onClick={() => {
                        setShowVacationModal(true);
                        setVacationOrder(orderDetails);
                      }}
                    >
                      <OrderItem
                        img={orderDetails?.product?.images[0]}
                        productName={orderDetails?.product?.title}
                        size={orderDetails?.product?.size}
                        orderType={"subscribe"}
                        quantity={orderDetails?.months}
                        price={
                          orderDetails?.product?.price *
                          orderDetails?.months *
                          30
                        }
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="profile__right--service--options">
              <button
                className="profile__right--service--options--button"
                onClick={() => setShowHistoryModal(true)}
              >
                History
              </button>
              <button
                className="profile__right--service--options--button"
                onClick={() => (window.location.href = "/product")}
              >
                Add more
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddMoneyModal open={showAddMoneyModal} setOpen={setShowAddMoneyModal} />
      <HistoryModal open={showHistoryModal} setOpen={setShowHistoryModal} />
      <VacationModal
        open={showVacationModal}
        setOpen={setShowVacationModal}
        order={vacationOrder}
      />
      <ProfileImageModal
        open={showProfileImageModal}
        setOpen={setShowProfileImageModal}
      />
    </>
  );
};

export default Profile;
