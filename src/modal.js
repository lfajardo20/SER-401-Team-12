import React from "react";

export default (props) => {
    const {onClose, children, active} = props;

    if(!active) {
        return null;
    }
    return (
        <div className="modal-background" >
            <div className="modal-content">
            <span className="modal-close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    )
}