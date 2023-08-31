import React, { useEffect } from "react";
import "./Product.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetails } from "../../Actions/Product";
import TryModal from "../TryModal/TryModal";
import BuyModal from "../BuyModal/BuyModal";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import trashSolid from "../../Assets/trash-solid.svg";
import { removeFromCart } from "../../Actions/Cart";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, products, product } = useSelector(
    (state) => state.productReducer
  );
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [showTryModal, setShowTryModal] = React.useState(false);
  const [showBuyModal, setShowBuyModal] = React.useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = React.useState(false);
  const imageLength = product.images?.length || 0;
  const [imageIndex, setImageIndex] = React.useState(0);
  const [leftButton, setLeftButton] = React.useState(false);
  const [rightButton, setRightButton] = React.useState(false);
  const handleImageLeft = () => {
      setImageIndex(imageIndex - 1);
  };
  const handleImageRight = () => {
      setImageIndex(imageIndex + 1);
  };
  const handleDelete = () => {
    dispatch(removeFromCart(id));
  };
  useEffect(() => {
    if (imageIndex === 0) {
      setLeftButton(false);
    } else {
      setLeftButton(true);
    }
    if (imageIndex === imageLength - 1) {
      setRightButton(false);
    } else {
      setRightButton(true);
    }
  }, [imageIndex, imageLength, product.images, loading]);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductDetails(id));
  }, [dispatch, id, isAuthenticated]);

  return loading ? (
    <div className="loading">
      <div className="loading__circle"></div>
    </div>
  ) : (
    <>
      <div className="product">
        <div className="product__info">
          <div className="product__info--left">
            <div className="product__info--top--title">{product.title}</div>
            <div className="product__info--left--image">
              <button className="product__info--left--image--button" onClick={handleImageLeft} disabled={!leftButton}>
                {"<"}</button>
              <img src={product.images && product.images[imageIndex]} alt={product.title} />
              <button className="product__info--left--image--button" onClick={handleImageRight} disabled={!rightButton}>
                {">"}</button>
            </div>
            <div className="product__info--left--title">{product.title}</div>
            <div className="webview_buttons">
              {product.quantity > 0 ? (
                <div className="product__content--item">
                  <div className="product__content--item-type">
                    Type: {product.orderType}
                  </div>
                  <div className="product__content--item-quantity">
                    {product.orderType === "buy"
                      ? "Quantity: " + product.quantity
                      : product.orderType === "trial"
                        ? "Days: " + product.quantity
                        : "Months: " + product.quantity}
                  </div>
                  <button
                    className="product__content--item-button"
                    onClick={handleDelete}
                  >
                    <img src={trashSolid} alt="Delete" />
                  </button>
                </div>
              ) : (
                <div className="product__info--left--buttons">
                  {product.order_type?.includes("trial") && <button
                    className="product__info--left--buttons--try"
                    onClick={() => {
                      setShowTryModal(true);
                    }}
                  >
                    Try
                  </button>}
                  {product.order_type?.includes("buy") &&<button
                    className="product__info--left--buttons--buy"
                    onClick={() => {
                      setShowBuyModal(true);
                    }}
                  >
                    Buy
                  </button>}
                  {product.order_type?.includes("subscribe") &&<button
                    className="product__info--left--buttons--subscribe"
                    onClick={() => {
                      setShowSubscribeModal(true);
                    }}
                  >
                    Subscribe
                  </button>}
                </div>
              )}
            </div>
          </div>
          <div className="product__info--right">
            <div className="product__info--right--title">{product.title}</div>
            <div className="product__info--right--info">
              Rs. {product.price}/-
            </div>
            <div className="product__info--right--info">
              Size: {product.size}
            </div>
            <div className="product__info--right--info">
              Brand Name: {product.brand_name}
            </div>
            <div className="product__info--right--info">
              Category: {product.category}
            </div>
            <div className="product__info--right--info">
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </div>
            <div className="product__info--right--description">
              <div className="product__info--right--description--title">
                Description
              </div>
              <div className="product__info--right--description--content">
                {product.description}
              </div>
            </div>
            <div className="product__info--right--benefits">
              <div className="product__info--right--benefits--title">
                {product.title} Benefits
              </div>
              <ul className="product__info--right--benefits--list">
                {product.benefits?.map((benefit) => (
                  <li
                    className="product__info--right--benefits--list--item"
                    key={benefit}
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mobile_view_buttons">
            {product.quantity > 0 ? (
              <div className="product__content--item">
                <div className="product__content--item-type">
                  Type: {product.orderType}
                </div>
                <div className="product__content--item-quantity">
                  {product.orderType === "buy"
                    ? "Quantity: " + product.quantity
                    : product.orderType === "trial"
                      ? "Days: " + product.quantity
                      : "Months: " + product.quantity}
                </div>
                <button
                  className="product__content--item-button"
                  onClick={handleDelete}
                >
                  <img src={trashSolid} alt="Delete" />
                </button>
              </div>
            ) : (
              <div className="product__info--left--buttons">
                <button
                  className="product__info--left--buttons--try"
                  onClick={() => {
                    setShowTryModal(true);
                  }}
                >
                  Try
                </button>
                <button
                  className="product__info--left--buttons--buy"
                  onClick={() => {
                    setShowBuyModal(true);
                  }}
                >
                  Buy
                </button>
                <button
                  className="product__info--left--buttons--subscribe"
                  onClick={() => {
                    setShowSubscribeModal(true);
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="product__mayAlsoLike">
          <div className="product__mayAlsoLike--title">
            Product You May Like
          </div>
          <div className="product__mayAlsoLike--list">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
      <TryModal
        open={showTryModal}
        setOpen={setShowTryModal}
        product={product}
      />
      <BuyModal
        open={showBuyModal}
        setOpen={setShowBuyModal}
        product={product}
      />
      <SubscribeModal
        open={showSubscribeModal}
        setOpen={setShowSubscribeModal}
        product={product}
      />
    </>
  );
};

export default Product;
