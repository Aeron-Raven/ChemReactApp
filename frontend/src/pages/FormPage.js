import LeftCard from '../components/LeftCard'
import RightCard from '../components/RightCard'

const FormPage = () => {
    return (
        <div className="form-page">
            <div className="container is-fluid form-card">
                <LeftCard />
                <RightCard />
            </div>
        </div>
    );
}

export default FormPage;