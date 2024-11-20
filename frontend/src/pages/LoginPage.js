import LeftCard from '../components/LeftCard'
import RightCard from '../components/RightCard'

const LoginPage = () => {
    return (
        <div className="form-page">
            <div className="container is-flex is-fluid form-card">
                <LeftCard />
                <RightCard />
            </div>
        </div>
    );
}

export default LoginPage;