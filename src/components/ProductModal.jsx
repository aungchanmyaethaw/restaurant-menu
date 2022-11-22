import { useEffect, useRef, useState, useCallback } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { v4 as uuidv4 } from "uuid";

const ProductCategory = () => {
  const {
    categories,
    products,
    editProductId,
    editProduct,
    handleEditProduct,
    handleAddProduct,
    isProductModalShow,
    handleProductModalClose,
    handleAddingNotification,
  } = useAppContext();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState(UNCATEGORIZED_PRODUCT);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const priceCheck = (price) => {
    if (price < 0) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
  };

  const nameCheck = (name) => {
    let result;

    if (editProductId) {
      result = products
        .filter((product) => product.id !== editProductId)
        .every((product) => product.name.toLowerCase() !== name?.toLowerCase());
    } else {
      result = products.every(
        (product) => product.name.toLowerCase() !== name?.toLowerCase()
      );
    }

    if (!result) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const inputReset = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory(UNCATEGORIZED_PRODUCT);
  };

  useEffect(() => {
    if (editProductId) {
      const { name, price, category } = editProduct;
      setProductName(name);
      setProductPrice(price);
      setProductCategory(category);
    }
  }, [editProductId]);

  useEffect(() => {
    priceCheck(productPrice);
  }, [productPrice]);

  useEffect(() => {
    nameCheck(productName);
  }, [productName]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempProduct = {
      id: editProductId || uuidv4(),
      name: productName,
      price: parseInt(productPrice),
      category: productCategory,
    };

    if (editProductId) {
      if (numberError || nameError) {
        handleAddingNotification("danger", "Product editing failed.");
        return;
      } else {
        handleEditProduct(tempProduct);
        inputReset();
      }
    } else {
      if (numberError || nameError) {
        handleAddingNotification("danger", "Product adding failed.");
        return;
      } else {
        handleAddProduct(tempProduct);
        inputReset();
      }
    }

    handleProductModalClose();
    inputReset();
  }

  return (
    <Modal
      show={isProductModalShow}
      onHide={() => {
        handleProductModalClose();
        inputReset();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editProductId ? "Edit" : "Add"} Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              autoFocus
              className={`${nameError && "error"} mb-1`}
            />
            {nameError && <span className="text-danger">Already exist.</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Price</Form.Label>

            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              min="0"
              className={`${numberError && "error"} mb-1`}
            />
            {numberError && (
              <span className="text-danger">
                Negative numbers are not accepted.
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value={UNCATEGORIZED_PRODUCT}>
                {UNCATEGORIZED_PRODUCT}
              </option>
              {categories.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="dark" type="submit">
              {editProductId ? "Edit" : "Add"}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleProductModalClose();
                inputReset();
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ProductCategory;
