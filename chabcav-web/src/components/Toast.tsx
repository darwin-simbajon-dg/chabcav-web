import React from "react";
import ToastPropertiess from "../models/ToastProperties";

const Toast : React.FC<ToastPropertiess> = ({message, visible}) => {
    if(!visible) return null;

return (
    // <div className="container">
    // <div className="row">
    //     <div className="col-6 mx-auto">
    //     <div className="toast fade show p-2 mx-auto mt-7" role="alert" aria-live="assertive" aria-atomic="true">
    //         <div className="toast-body text-center">
    //         {message}
    //         {/* <hr className="horizontal dark"> */}
    //         <div className="d-flex justify-content-center">
    //             <button type="button" className="btn bg-gradient-secondary btn-sm mb-0" data-bs-dismiss="toast" onClick={onClose}>Close</button>
    //         </div>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    // </div>
    <div
    className="position-fixed top-50 start-50 translate-middle toast fade show p-2"
    style={{ zIndex: 1055 }}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="toast-body text-center bg-dark text-white rounded">
      {message}
      {/* <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          className="btn btn-sm bg-gradient-secondary mb-0"
          onClick={onClose}
        >
          Close
        </button>
      </div> */}
    </div>
  </div>

)

}

export default Toast;