import './Home.css';
import Gallery from "../common/Gallery/Gallery";
import { useState } from 'react';
import mediaOrder from './home-page-media-order.js'

const Home = (props) => {
    const [canShowText, setCanShowText] = useState(false);

    return (
        <div className="home-page-container">
            <div className={"home-page-text-container"  + (canShowText ? " show" : "")}>
                <h1 className="home-page-text home-page-company-name">Gourmand</h1>
                <h3 className="home-page-text home-page-slogan">Find food.  Fast.</h3>
            </div>
            <Gallery {...props} mediaOrder={mediaOrder} onEntered={() => setCanShowText(true)}
                transitionTimeout={50} />
        </div>
    );
};

export default Home;
