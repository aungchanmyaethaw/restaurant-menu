import { useEffect, useState } from "react";
import { QtyBadge } from "./index";
import { useAppContext } from "../contexts";
import { FaConciergeBell } from "react-icons/fa";
import { Button, Badge } from "react-bootstrap";
const UsersMenuBtn = () => {
  const { handleCheckOutModalOpen } = useAppContext();

  return (
    <Button
      className="d-flex align-items-center gap-2"
      onClick={handleCheckOutModalOpen}
    >
      <FaConciergeBell />
      Checkout
      <QtyBadge />
    </Button>
  );
};

export default UsersMenuBtn;
