import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("accessToken");

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "AllProductsRequest" });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/product/getAllProducts`
    );
    dispatch({
      type: "AllProductsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "AllProductsFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ProductDetailsRequest" });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/product/${id}`
    );
    const imageList = data.data[0].images.map((image) => {
      return {
        uid: image,
        name: image,
        status: "done",
        url: image,
      };
    });
    data.data[0].imageList = imageList
    dispatch({
      type: "ProductDetailsSuccess",
      payload: data.data[0],
    });
  } catch (error) {
    dispatch({
      type: "ProductDetailsFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateProductRequest" });
    const images = productData?.images?.fileList;
    //Upload images to cloudinary
    const cloudinaryImages = [];
    for (const element of images) {
      const formData = new FormData();
      formData.append("file", element.originFileObj);
      formData.append("upload_preset", "doodhwala");
      formData.append("folder", "products");
      formData.append("cloud_name", "dn2jk5smj");
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dn2jk5smj/image/upload`,
        formData
      );
      cloudinaryImages.push(data.secure_url);
    }
    const uploadedImages = cloudinaryImages;
    const details = {
      title: productData.title,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      size: productData.size_number + " " + productData.size_type,
      in_stock: productData.inStock,
      order_type: productData.orderTypes,
      brand_name: productData.brand_name,
      benefits: productData.benefits,
      images: uploadedImages,
    };
    console.log(details);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/product/addProduct`,
      details,
      config
    );
    dispatch({
      type: "CreateProductSuccess",
      payload: data,
    });
    dispatch(getProducts());
    toast.success("Product created successfully");
    window.location.href = "/products";
  } catch (error) {
    dispatch({
      type: "CreateProductFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const updateProduct = (productData, id) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateProductRequest" });
    console.log(productData);
    const images = productData?.images?.fileList;
    console.log(images);
    let uploadedImages = [];
    const cloudinaryImages = [];
    if (images.length !== 0) {
      for (const element of images) {
        const formData = new FormData();
        formData.append(
          "file",
          element.originFileObj ? element.originFileObj : element.url
        );
        formData.append("upload_preset", "test-dudhwala");
        formData.append("folder", "products");
        formData.append("cloud_name", "dbxm13zgr");
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/dbxm13zgr/image/upload`,
          formData
        );
        cloudinaryImages.push(data?.secure_url);
      }
      uploadedImages = cloudinaryImages;
    }
    console.log(uploadedImages);
    const details = {
      title: productData.title,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      size: productData.size_number + " " + productData.size_type,
      in_stock: productData.inStock,
      order_type: productData.orderTypes,
      brand_name: productData.brand_name,
      benefits: productData.benefits,
      images: uploadedImages,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/product/update/${id}`,
      details,
      config
    );

    dispatch({
      type: "UpdateProductSuccess",
      payload: data.success,
    });
    dispatch(getProducts());
    toast.success("Product updated successfully");
    window.location.href = "/products";
  } catch (error) {
    dispatch({
      type: "UpdateProductFailure",
      payload: error?.response?.data?.message,
    });
    toast.error(error?.response?.data?.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProductRequest" });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "DeleteProductSuccess",
      payload: data.success,
    });
    dispatch(getProducts());
    toast.success("Product deleted successfully");
  } catch (error) {
    dispatch({
      type: "DeleteProductFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
