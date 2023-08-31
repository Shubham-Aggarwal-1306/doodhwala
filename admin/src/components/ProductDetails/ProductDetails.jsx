import { DeleteOutlined, InboxOutlined, UserAddOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Upload,
  Input,
  Spin,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, newProduct, updateProduct } from '../../Actions/Products';
import { useEffect } from 'react';
const { Option } = Select;

const formItemLayout = {};

const ProductDetails = () => {
  const { TextArea } = Input;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productReducer);
  const onFinish = (values) => {
    if (id === "add") {
      dispatch(newProduct(values))
    } else {
      dispatch(updateProduct(values, id))
    }
  };

  useEffect(() => {
    if (id !== "add") {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const initialValues = (id === "add") ?
    ({
      'title': '',
      'category': 'Dairy',
      'brand_name': '',
      'size_number': "1000",
      'size_type': "g",
      'price': 0,
      'inStock': true,
      'orderTypes': [],
      'images': { fileList: [] },
      'description': '',
      'benefits': [],
    }) : ({
      'title': product?.title,
      'category': 'Dairy',
      'brand_name': product?.brand_name,
      'size_number': product?.size?.split(" ")[0],
      'size_type': product?.size?.split(" ")[1] || "g",
      'price': product?.price,
      'inStock': product?.in_stock,
      'orderTypes': product?.order_type,
      'description': product?.description,
      'benefits': product?.benefits,
      'images': { fileList: product?.imageList },
    })
  return (
    <>
      <div className="header">
        <div className="heading">
          {(id === "add") ? "Add" : "Edit"} Product
        </div>
        <div className="header__button">
          <button onClick={() => window.location.href = '/products'}>
            Back
          </button>
        </div>
      </div>
      {loading ? <Spin /> :
        <div className="product-details__form">
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            layout="vertical"
            initialValues={initialValues}
          >

            <div className="product-details__form--info">
              <Form.Item name="title" label="Title" wrapperCol={{ span: 8 }}>
                <Input placeholder="Product Title" />
              </Form.Item>
              <Form.Item name="category" label="Category" wrapperCol={{ span: 8 }}>
                <Select placeholder="Select Category">
                  <Option value="Dairy">Dairy</Option>
                </Select>
              </Form.Item>
              <Form.Item name="brand_name" label="Brand Name" wrapperCol={{ span: 8 }}>
                <Input placeholder="Product Brand" />
              </Form.Item>
            </div>
            <Form.Item name="size" label="Size" wrapperCol={{ span: 8 }}>
              <Space.Compact>
                <Form.Item
                  name={'size_number'}
                  noStyle
                >

                  <Input placeholder="Input Size" />

                </Form.Item>
                <Form.Item
                  name={'size_type'}
                  noStyle
                >
                  <Select>
                    <Option value="g">g</Option>
                    <Option value="ml">ml</Option>
                    <Option value="kg">kg</Option>
                    <Option value="l">l</Option>
                  </Select>
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item name="price" label="Price" wrapperCol={{ span: 8 }}>
              <InputNumber
                formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item name="inStock" label="Stock" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="orderTypes" label="Order Type">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value="trial"
                    >
                      Trial
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="buy"
                    >
                      Buy
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="subscribe"
                    >
                      Subscribe
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              wrapperCol={{ span: 8 }}
            >
              <TextArea
                showCount
                maxLength={400}
                style={{ height: 120, resize: 'none' }}
                placeholder="Product Description"
              />
            </Form.Item>
            {/* <Form.Item valuePropName="fileList" getValueFromEvent={normFile} noStyle> */}
            <Form.Item label="Upload Images" name="images">
              <Upload.Dragger beforeUpload={() => false} listType="picture" fileList={product?.imageList}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>


            {/* Form List with Array Items with a button to add more inputs*/}
            <h4>Benifits</h4>
            <Form.List name="benefits">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <Form.Item
                        {...field}
                        fieldKey={[field.fieldKey, index]}
                      >
                        <Input placeholder="Enter the Benifit Here" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="dashed" onClick={() => remove(index)} block icon={<DeleteOutlined />}>
                          Remove field
                        </Button>
                      </Form.Item>
                    </>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<UserAddOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
      }
    </>
  );
};
export default ProductDetails;