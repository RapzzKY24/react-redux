import ReactDOM from "react-dom";

const BackdropOverlay = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75"
      onClick={onClose}
    ></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-30">
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-500 mx-2">
        {children}
      </div>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  if (typeof window === "undefined") return null;

  const portalElement = document.getElementById("modal");
  if (!portalElement) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <BackdropOverlay onClose={onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
