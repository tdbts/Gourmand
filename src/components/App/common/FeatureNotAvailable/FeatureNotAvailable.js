import './FeatureNotAvailable.css';
import { Container } from 'reactstrap';

const FeatureNotAvailable = ({ featureName }) => (
    <div className="feature-not-available-container" style={{backgroundImage: 'url(/feature-not-available-background.jpg)'}}>
        <div className="contrast-overlay" />
        <Container className="feature-not-available-content">
            <div className="text-container with-image-underlay">
                <h2 className="content-header">We're sorry, but <span className="feature-phrase">the <span className="feature-name">{featureName}</span> page</span> isn't available yet.</h2>
                <p className="content-text">But you can be sure that, like a good bar, this feature is just around the corner. 🥂</p>
            </div>
        </Container>
    </div>
);

export default FeatureNotAvailable;
