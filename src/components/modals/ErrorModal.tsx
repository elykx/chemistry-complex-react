import React from "react";
import Modal from "react-modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    errorText: string;
}

const ErrorModal: React.FC<Props> = ({ isOpen, onClose, errorText }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                content: {
                    width: "50%",
                    height: "50%",
                    margin: "auto",
                    backgroundColor: "#f2f2f2",
                    color: "#333",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
            }}
        >
            <h2 style={{ color: "red" }}>Ошибка численного интегрирования</h2>
            <p style={{ color: "#333" }}>{errorText}</p>
            <button
                onClick={onClose}
                style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Закрыть
            </button>
        </Modal>
    );
};

export default ErrorModal;