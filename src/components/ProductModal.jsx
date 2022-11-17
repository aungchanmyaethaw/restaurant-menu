import { useEffect, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { v4 as uuidv4 } from "uuid";

const ProductCategory = () => {
  const {
    categories,
    editProductId,
    editProduct,
    handleEditProduct,
    handleAddProduct,
    isProductModalShow,
    handleProductModalClose,
  } = useAppContext();

  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if (editProductId) {
      const { name, price, category } = editProduct;
      nameRef.current.value = name;
      priceRef.current.value = price;
      categoryRef.current.value = category;
    }
  }, [editProductId]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempProduct = {
      id: editProductId || uuidv4(),
      name: nameRef.current.value,
      price: parseInt(priceRef.current.value),
      category:
        categoryRef.current.value === UNCATEGORIZED_PRODUCT
          ? UNCATEGORIZED_PRODUCT
          : categoryRef.current.value,
    };

    if (editProductId) {
      handleEditProduct(tempProduct);
    } else {
      handleAddProduct(tempProduct);
    }

    nameRef.current.value = "";
    priceRef.current.value = "";
    categoryRef.current.value = UNCATEGORIZED_PRODUCT;
    handleProductModalClose();
  }

  return (
    <Modal
      show={isProductModalShow}
      onHide={handleProductModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editProductId ? "Edit" : "Add"} Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Select ref={categoryRef}>
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
            <Button variant="danger" onClick={handleProductModalClose}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ProductCategory;