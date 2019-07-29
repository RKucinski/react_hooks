import React, { Fragment, useState, useEffect } from "react";
import useFetch from "./useCustomFetch"

// One way to do it

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

// Another way, with more sharing logic by splitting code

export function FetchDataSplit(props) {
    const data = useFetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=7");
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