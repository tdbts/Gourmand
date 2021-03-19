import './About.css';
import { Container } from 'reactstrap';

// Due to a known 'create-react-app' bug (https://github.com/facebook/create-react-app/issues/9870), need to inline the background image from the 'public' directory
const About = ({}) => (
    <Container className="about-container" style={{backgroundImage: 'url(/about-background.jpg)'}}>
        <div className="text-container">
            <p><span className="company-name">Gourmand</span> is for people who absolutely love food.  Those who always search for new restaurants, dishes, and neighborhoods to try.</p>
            <p>The problem is that whittling down reviews to find good places is difficult and time consuming.  Information about restaurants is fractured into many different platforms.  Who has time to conduct a research project whenever they get a little hungry?</p>
            <p>At <span className="company-name">Gourmand</span>, we believe the food should speak for itself.  The rest will follow.</p>
            <p>Salud!</p>
        </div>
    </Container>
);

export default About;
