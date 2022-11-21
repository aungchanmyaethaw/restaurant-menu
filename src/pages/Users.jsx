import { useEffect, useState } from "react";
import {
  NotificationsContainer,
  Loader,
  Error,
  ProductMenu,
  UsersCheckoutModal,
} from "../components";

import { useAppContext } from "../contexts";
const Users = () => {
  const { isLoading, isError, handleChangeUsers } = useAppContext();

  useEffect(() => handleChangeUsers(), []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NotificationsContainer />
      <UsersCheckoutModal />
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

export default Users;
