import { useContext, createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

export const UNCATEGORIZED_PRODUCT = "uncategorized";

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({});
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategory, setEditCategory] = useState({});
  const [isProductModalShow, setIsProductModalShow] = useState(false);
  const [isCategoryModalShow, setIsCategoryModalShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleChangeAdmin = () => setIsAdmin(true);
  const handleChangeUsers = () => setIsAdmin(false);

  const handleCategoryModalClose = () => {
    setIsCategoryModalShow(false);
    setEditCategory({});
    setEditCategoryId(null);
  };
  const handleCategoryModalOpen = () => setIsCategoryModalShow(true);

  const handleProductModalClose = () => {
    setIsProductModalShow(false);
    setEditProduct({});
    setEditProductId(null);
  };

  const handleProductModalOpen = () => setIsProductModalShow(true);

  const handleCheckOutModalOpen = () => setIsCheckoutModalOpen(true);

  const handleCheckOutModalClose = () => setIsCheckoutModalOpen(false);

  const handleAddingNotification = (clsName, text) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: uuidv4(),
        clsName,
        text,
      },
    ]);
  };

  const handleAddSingleProductOrderDetails = (productDetails) => {
    const isAlready = orders.find(
      (order) => order.productId === productDetails.productId
    );

    if (isAlready) {
      const { qty: prevQty, total: prevTotal } = isAlready;
      const { qty: newQty, total: newTotal } = productDetails;
      const tempQty = prevQty + newQty;
      const tempTotal = prevTotal + newTotal;
      fetch(`http://localhost:8000/orders/${isAlready.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          qty: tempQty,
          total: tempTotal,
        }),
      }).then(() => {
        const tempOrders = orders.map((order) => {
          if (order.productId === productDetails.productId) {
            return { ...order, qty: tempQty, total: tempTotal };
          }
          return order;
        });

        setOrders(tempOrders);
      });
    } else {
      fetch("http://localhost:8000/orders/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productDetails),
      }).then(() => {
        setOrders((prev) => [...prev, productDetails]);
      });
    }
  };

  // Fetching Data

  const getData = async (url, setState) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setState(data);
      setIsError(false);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData("http://localhost:8000/sampleProducts", setProducts);
    getData("http://localhost:8000/categories", setCategories);
    getData("http://localhost:8000/orders", setOrders);
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(
        () =>
          setNotifications((prev) => {
            return prev.slice(1);
          }),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  //////Products

  // Delete Products

  function handleDeleteProduct(productId) {
    const filteredProducts = products.filter(({ id }) => id !== productId);
    fetch("http://localhost:8000/sampleProducts/" + productId, {
      method: "DELETE",
    }).then(() => {
      setProducts(filteredProducts);
      setNotifications((prev) => [
        ...prev,
        {
          id: uuidv4(),
          clsName: "warning",
          text: "Product successfully deleted.",
        },
      ]);
    });
  }

  // Edit Products

  function handleEditProductId(productId) {
    setIsProductModalShow(true);
    setEditProductId(productId);
    const tempProduct = products.find((product) => product.id === productId);
    setEditProduct(tempProduct);
  }

  function handleEditProduct(editedProduct) {
    fetch("http://localhost:8000/sampleProducts/" + editProductId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedProduct),
    }).then(() => handlEditProductInUI(editedProduct));
  }

  function handlEditProductInUI(editedProduct) {
    const newProducts = products.map((product) => {
      if (product.id === editedProduct.id) {
        return editedProduct;
      }
      return product;
    });
    console.log(newProducts);
    setProducts(newProducts);
    setEditProductId(null);
    setEditProduct({});
    handleAddingNotification("info", "Product successfully edited.");
  }

  // Add Products

  function handleAddProduct(addedProduct) {
    fetch("http://localhost:8000/sampleProducts/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(addedProduct),
    }).then(() => {
      setProducts((prev) => [...prev, addedProduct]);
      handleAddingNotification("success", "Product successfully added.");
    });
  }

  ////// Category

  // Add Category

  function handleAddCategory(newCategory) {
    fetch("http://localhost:8000/categories/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCategory),
    }).then(() => {
      setCategories((prev) => [...prev, newCategory]);
      setNotifications((prev) => [
        ...prev,
        {
          id: uuidv4(),
          clsName: "success",
          text: "Category successfully added.",
        },
      ]);
    });
  }

  // Edit Category

  function handleEditCategoryId(categoryId) {
    handleCategoryModalOpen();
    setEditCategoryId(categoryId);
    const tempCategory = categories.find(
      (category) => category.id === categoryId
    );
    setEditCategory(tempCategory);
  }

  function handleEditCategory(editedCategory) {
    fetch("http://localhost:8000/categories/" + editCategoryId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedCategory),
    }).then(() => handleEditCategoryInUI(editedCategory));
  }

  function handleEditCategoryInUI(editedCategory) {
    const newCategories = categories.map((category) => {
      if (category.id === editCategory.id) {
        return editedCategory;
      }

      return category;
    });

    setCategories(newCategories);
    setEditCategoryId(null);
    setEditCategory({});
    handleAddingNotification("info", "Category successfully edited.");
  }

  //Delete Category

  function handleDeleteCategory(cateogryId) {
    const filteredCategories = categories.filter(({ id }) => id !== cateogryId);
    fetch("http://localhost:8000/categories/" + cateogryId, {
      method: "DELETE",
    }).then(() => {
      moveDeletedCategoryProducts(cateogryId);
      setCategories(filteredCategories);
      handleAddingNotification(
        "warning",
        "Category successfully deleted and all products are move to uncategorized."
      );
    });
  }

  function moveDeletedCategoryProducts(categoryId) {
    const newProducts = products.map((product) => {
      if (product.category === categoryId) {
        return { ...product, category: UNCATEGORIZED_PRODUCT };
      }
      return product;
    });
    setProducts(newProducts);
  }

  function handleOrderChangesFromUsersModal(id, qty, total) {
    console.log(id, qty, total);
    fetch(`http://localhost:8000/orders/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        qty,
        total,
      }),
    }).then(() => {
      const tempOrders = orders.map((order) => {
        if (order.id === id) {
          return { ...order, qty, total };
        }
        return order;
      });

      setOrders(tempOrders);
    });
  }

  function handleOrderDelete(orderId) {
    const filteredOrders = orders.filter(({ id }) => id !== orderId);
    fetch("http://localhost:8000/orders/" + orderId, {
      method: "DELETE",
    }).then(() => {
      setOrders(filteredOrders);
    });
  }

  return (
    <AppContext.Provider
      value={{
        categories,
        products,
        editProductId,
        handleDeleteProduct,
        handleEditProductId,
        handleEditProduct,
        handleAddProduct,
        editProduct,
        isProductModalShow,
        handleProductModalOpen,
        handleProductModalClose,
        isLoading,
        isCategoryModalShow,
        handleCategoryModalClose,
        handleCategoryModalOpen,
        handleAddCategory,
        handleEditCategoryId,
        handleEditCategory,
        editCategory,
        editCategoryId,
        handleDeleteCategory,
        notifications,
        handleAddingNotification,
        isError,
        isAdmin,
        handleChangeAdmin,
        handleChangeUsers,
        isCheckoutModalOpen,
        orders,
        handleCheckOutModalOpen,
        handleCheckOutModalClose,
        handleAddSingleProductOrderDetails,
        handleOrderChangesFromUsersModal,
        handleOrderDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
