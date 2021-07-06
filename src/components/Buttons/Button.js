import React from "react";

function Button(props) {
    return (
        <button
            onClick={props.clicked}
        >
            {props.children}
        </button>
    );
}

export default Button;
