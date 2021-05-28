import './Home.css';
import { useState } from 'react';
import Gallery from "../common/Gallery/Gallery";
import withOrderedMedia from "../common/Gallery/withOrderedMedia";
import mediaOrder from './home-page-media-order.js'

const OrderedGallery = withOrderedMedia(Gallery);

// Slice media order because a large media list can degrade performance, and not many images are needed
// for the home page.
const Home = (props) => {
    const [canShowText, setCanShowText] = useState(false);

    return (
        <div className="home-page-container">
            <div className={"home-page-text-container"  + (canShowText ? " show" : "")}>
                <h1 className="home-page-text home-page-company-name company-name">Gourmand</h1>
                <h3 className="home-page-text home-page-slogan">Find food.  Fast.</h3>
            </div>
            <OrderedGallery {...props} mediaOrder={mediaOrder.slice(0, 30)} onEntered={() => setCanShowText(true)}
                transitionTimeout={50} />
        </div>
    );
};

export default Home;
