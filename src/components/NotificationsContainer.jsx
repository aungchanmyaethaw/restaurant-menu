import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useAppContext } from "../contexts";
function NotificationsContainer() {
  const { notifications } = useAppContext();

  return (
    <ToastContainer className="p-3 position-fixed" position="top-start">
      {notifications.map(({ id, clsName, text }) => (
        <Toast key={id} bg={clsName}>
          <Toast.Body className="fs-6 text-light">{text}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default NotificationsContainer;
