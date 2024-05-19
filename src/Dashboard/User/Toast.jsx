import React from 'react'

const Toast = ({ toast , removeToast}) => {
  return (
    <div>
       <li className={`toast ${toast.type}`} key={toast.id}>
      <div className="column">
        <i className="fa-solid fa-circle-check"></i>
        <span>{toast.text}</span>
      </div>
      <i className="fa-solid fa-xmark" onClick={() => removeToast(toast.id)}></i>
    </li>
    </div>
  )
}

export default Toast
