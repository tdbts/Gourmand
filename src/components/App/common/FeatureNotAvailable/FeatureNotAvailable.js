import './FeatureNotAvailable.css';
import { Container } from 'reactstrap';

const FeatureNotAvailable = ({ featureName }) => (
    <div className="feature-not-available-container">
        <div className="feature-not-available-background" style={{backgroundImage: 'url(/feature-not-available-background.jpg)'}} />
        <Container className="feature-not-available-content">
            <div className="text-container with-image-underlay">
                <h1 className="content-header">{`We're sorry, but the ${featureName} page isn't yet available.`}</h1>
                <p className="content-text">But you can be sure that, like a good bar, this feature is just around the corner. 🥂</p>
            </div>
        </Container>
    </div>
);

export default FeatureNotAvailable;
