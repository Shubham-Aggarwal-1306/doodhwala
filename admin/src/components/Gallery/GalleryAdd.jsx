import { InboxOutlined } from "@ant-design/icons";
import { Button, Spin, Form, Space, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { galleryImages, newImages } from "../../Actions/Gallery";

const formItemLayout = {};

const GalleryAdd = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.galleryReducer);

  const onFinish = (values) => {
    dispatch(newImages(values));
  };

  useEffect(() => {
    dispatch(galleryImages());
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <div className="heading">Add Images to Gallery</div>
        <div className="header__button">
          <button onClick={() => (window.location.href = "/gallery")}>
            Back
          </button>
        </div>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <div className="product-details__form">
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item label="Upload Images" name="images">
              <Upload.Dragger
                beforeUpload={() => false}
                listType="picture"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default GalleryAdd;
