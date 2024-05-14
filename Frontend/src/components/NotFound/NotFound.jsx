import React from 'react';
import { Link } from 'react-router-dom';
//rafce
const NotFound = () => {
    return (
        <div>
            <img src="/hk.png" alt="notfound" />
            <Link to={"/"}>RETURN TO HOME</Link>
        </div>
    );
}

export default NotFound;
