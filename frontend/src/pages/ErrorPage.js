import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '100vh' }}>
            <div className="has-text-centered">
                <h1 className="title is-size-1">404</h1>
                <p className="subtitle">Page not found</p>
                <p className="p-4">Hmm.. Looks like you're lost.. </p><Link className="button is-link" to='/'>Back to Home</Link>
            </div>
        </div>
    );
}


export default ErrorPage;