import { useEffect, useState } from "react";
import { QtyBadge } from "./index";
import { useAppContext } from "../contexts";
import { FaConciergeBell, FaReceipt } from "react-icons/fa";
import { Button } from "react-bootstrap";
const UsersMenuBtn = () => {
  const { handleCheckOutModalOpen, isCheckoutConfirm } = useAppContext();

  return (
    <Button
      className="d-flex align-items-center gap-2"
      onClick={handleCheckOutModalOpen}
    >
      {isCheckoutConfirm ? <FaReceipt /> : <FaConciergeBell />}
      {isCheckoutConfirm ? "Receipts" : "Checkout"}
      <QtyBadge />
    </Button>
  );
};

export default UsersMenuBtn;
