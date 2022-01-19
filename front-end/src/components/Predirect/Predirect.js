import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import "./Predirect.css";

const Predirect = (props) => {
    const { alias } = useParams();
    useEffect(() => {
        props.onFetch(alias).then(data => {
            window.location.replace(data.redirect_url);
        });
    }, [])

    return (
        <h1 className="redirect-text">Redirecting...</h1>
    )
}

export default Predirect
