import React, { useState } from "react";

export default function Button() {
    const [buttonText, setButtonText] = useState("Click me, please");
    return (
        <button onClick={() => setButtonText("Thanks, been clicked!")}>
            {buttonText}
        </button>
    );
}