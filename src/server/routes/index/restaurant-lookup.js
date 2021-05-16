const restaurantLookupRoute = (router, service) => {
    router.get('/restaurant-lookup', (req, res) => {
        console.log("New restaurant query.");
        const { id } = req.query;
        console.log("id: " + id);
        return service.findRestaurant({id})
            .then(restaurant => {
                if (restaurant) {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(restaurant);
                } else {
                    console.log(`Restaurant not found: ${id}`);
                    res.status(404);
                }
            })
            .catch(e => {
                console.error("Something went wrong during restaurant query request.");
                console.error(e);
                res.send(500);
            });
    });

    return router;
};

export default restaurantLookupRoute;
