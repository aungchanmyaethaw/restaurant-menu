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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleModalClose = () => {
    setIsModalShow(false);
    setEditProduct({});
    setEditCategoryId(null);
  };
  const handleModalOpen = () => setIsModalShow(true);

  const getData = async (url, setState) => {
    const res = await fetch(url);
    const data = await res.json();
    setState(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:8000/sampleProducts", setProducts);
    getData("http://localhost:8000/categories", setCategories);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setNotifications((prev) => {
          return prev.slice(1);
        }),
      3000
    );

    return () => clearTimeout(timer);
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
    setIsFormOpen(true);
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
    setProducts(newProducts);
    setEditProductId(null);
    setEditProduct({});
    setNotifications((prev) => [
      ...prev,
      {
        id: uuidv4(),
        clsName: "info",
        text: "Product successfully edited.",
      },
    ]);
  }

  // Add Products

  function handleAddProduct(addedProduct) {
    fetch("http://localhost:8000/sampleProducts/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(addedProduct),
    }).then(() => {
      setProducts((prev) => [...prev, addedProduct]);
      setNotifications((prev) => [
        ...prev,
        {
          id: uuidv4(),
          clsName: "success",
          text: "Product successfully added.",
        },
      ]);
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
          text: "Product successfully added.",
        },
      ]);
    });
  }

  // Edit Category

  function handleEditCategoryId(categoryId) {
    handleModalOpen();
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
    setNotifications((prev) => [
      ...prev,
      {
        id: uuidv4(),
        clsName: "info",
        text: "Category successfully edited.",
      },
    ]);
  }

  //Delete Category

  function handleDeleteCategory(cateogryId) {
    const filteredCategories = categories.filter(({ id }) => id !== cateogryId);
    fetch("http://localhost:8000/categories/" + cateogryId, {
      method: "DELETE",
    }).then(() => {
      moveDeletedCategoryProducts(cateogryId);
      setCategories(filteredCategories);
      setNotifications((prev) => [
        ...prev,
        {
          id: uuidv4(),
          clsName: "warning",
          text: "Category successfully deleted and all products are moved to uncategorized.",
        },
      ]);
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
        isFormOpen,
        setIsFormOpen,
        isLoading,
        isModalShow,
        handleModalClose,
        handleModalOpen,
        handleAddCategory,
        handleEditCategoryId,
        handleEditCategory,
        editCategory,
        editCategoryId,
        handleDeleteCategory,
        notifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
