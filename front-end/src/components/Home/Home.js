import RotatingTitle from "./RotatingTitle/RotatingTitle"
import Form from "./Form/Form"
import './Home.css'
const Home = (props) => {
    return (
        <div className="Home">
            <RotatingTitle />
            <Form theme={props.theme} onSubmit={props.onAdd} />
        </div>
    )
}

export default Home
