import { useEffect, useState } from "react";
import {
  ProductModal,
  ProductMenu,
  Loader,
  CategoryModal,
  Error,
  NotificationsContainer,
  ConfirmModal,
} from "../components";
import { useAppContext } from "../contexts";

const Admin = () => {
  const {
    isLoading,
    isError,
    handleChangeAdmin,
    handleDeleteProduct,
    handleDeleteCategory,
    handleConfirmAlertClose,
    confirmAlert,
  } = useAppContext();

  let deleteId = "";

  function handleConfirm() {
    if (confirmAlert.payload.productId == undefined) {
      deleteId = "categoryId";
      return handleDeleteCategory;
    } else {
      deleteId = "productId";
      return handleDeleteProduct;
    }
  }

  useEffect(() => {
    handleChangeAdmin();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CategoryModal />
      <ProductModal />
      <NotificationsContainer />
      <ConfirmModal
        confirm={handleConfirm()}
        cancel={handleConfirmAlertClose}
        id={deleteId}
      />
      {isError ? (
        <Error />
      ) : (
        <main className="container">
          <ProductMenu />
        </main>
      )}
    </>
  );
};

export default Admin;
