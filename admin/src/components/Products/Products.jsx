import React, { useEffect } from "react";
import { Modal, Table } from "antd";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Actions/Products";
const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productReducer);
  const dataWithKey = products?.map((product) => ({
    ...product,
    key: product._id,
  }));
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: 300,
      sorter: (a, b) => a.title > b.title,
      render: (text, record) => (
        <ProductItem
          title={record.title}
          image={record.images[0]}
          size={record.size}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price > b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category > b.category,
    },
    {
      title: "Order Type",
      dataIndex: "order_type",
      key: "order_type",
      sorter: (a, b) => a.brand_name > b.brand_name,
      render: (text, record) => (
        <div className="order__type">
          {record?.order_type?.map((item) => (
            <div className="order__type__item" key={item}>
              {/* UpperCase First letter of item */}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "In Stock",
      dataIndex: "in_stock",
      key: "in_stock",
      sorter: (a, b) => a.in_stock > b.in_stock,
      render: (text, record) => (
        <div className="in_stock">{record.in_stock ? "Yes" : "No"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="action__buttons">
          <div
            className="action__button"
            onClick={() => (window.location.href = `/products/${record._id}`)}
          >
            <button>Edit</button>
          </div>
          <div
            className="action__button"
            onClick={() => {
              setIsModalOpen(true);
              setProductId(record._id);
            }}
          >
            <button>Delete</button>
          </div>
        </div>
      ),
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.title,
    }),
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="products">
        <div className="header">
          <div className="heading">Products List</div>
          <div className="header__button">
            <button onClick={() => (window.location.href = "/products/add")}>
              Add Product<span>+</span>
            </button>
          </div>
        </div>
        <div className="table">
          <Table
            dataSource={dataWithKey}
            columns={columns}
            loading={loading}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={{
              position: ["bottomRight"],
            }}
            sticky={true}
            sortDirections={["descend", "ascend"]}
            scroll={{ x: 1250, y: 450 }}
          />
        </div>
      </div>
      <Modal
        title="Delete Product"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => {
          setIsModalOpen(false);
          setProductId("");
        }}
      >
        <p>Do you want to proceed deleting your Product?</p>
      </Modal>
    </>
  );
};

export default Products;
