import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, employeeName, employeeLastName }) => { 
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Success</h2>
        <p>The employee {employeeName} {employeeLastName} has been successfully created!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
