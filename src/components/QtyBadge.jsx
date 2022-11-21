import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useAppContext } from "../contexts";
const QtyBadge = () => {
  const { orders } = useAppContext();
  const [badgeamt, setBadgeAmt] = useState(0);

  function handleBadgeAmt() {
    const tempAmt = orders.reduce((prev, current) => prev + current.qty, 0);
    setBadgeAmt(tempAmt);
  }

  useEffect(() => {
    handleBadgeAmt();
  }, [orders]);
  return (
    <Badge bg="dark" as="span" pill>
      {badgeamt}
    </Badge>
  );
};

export default QtyBadge;
