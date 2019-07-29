import React, { Fragment, useState, useEffect } from "react";

export default function FetchData() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=7")
            .then(response => response.json())
            .then(data => setData(data));
    }, []);
    return (
        <div>
            <ul>
                {data.map((quote, index) => (
                    <Fragment key={index}>
                        <li>{quote.quote}</li>
                        <li>{quote.character}</li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}