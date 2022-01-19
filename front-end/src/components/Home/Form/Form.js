import './Form.css';
import { useState } from 'react';

const Form = (props) => {

    const [redirect_url, setUrl] = useState('');
    const [alias, setAlias] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({ redirect_url, alias });
        setUrl('');
        setAlias('');
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form__input" placeholder="URL to Shorten" onChange={(e) => setUrl(e.target.value)} />
                <input type="text" className="form__input" placeholder="Enter a URL Alias" onChange={(e) => setAlias(e.target.value)} />
                <button type="submit" className="form__button">Shorten</button>
            </form>
        </>
    )
}

export default Form
