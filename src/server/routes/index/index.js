import express from 'express';
import searchRoute from "./search.js";
import restaurantLookupRoute from "./restaurant-lookup.js";
import contactRoute from "./contact.js";
import pipe from '../../../utils/pipe.js';

const router = express.Router();

const indexRoute = (service, transporter) => {
    return pipe(
        router => searchRoute(router, service),
        router => restaurantLookupRoute(router, service),
        router => contactRoute(router, transporter)
    )(router);
};

export default indexRoute;
