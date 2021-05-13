const searchRoute = (router, service) => {
    router.get('/query', (req, res) => {
        console.log("New search query.");
        const { location, description, distance } = req.query;
        console.log("location:", location);
        console.log("description:", description);
        console.log("distance:", distance);  // Distance remains a string (thus, truthy) until array lookup
        return service.find({location, description, distance})
            .then(restaurants => {
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurants);
            })
            .catch(e => {
                console.error("Something went wrong during search request.");
                console.error(e);
                res.send(500);
            });
    });

    return router;
};

export default searchRoute;
