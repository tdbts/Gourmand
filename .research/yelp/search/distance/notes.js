/* ==========================================================================
   Distance Filter Notes
   ========================================================================== */

/*

https://www.yelp.com/search/snippet?find_desc=&find_loc=Brooklyn%2C%20NY%2011219&ns=1&l=g%3A-74.0002369881%2C40.6309232084%2C-73.9938426018%2C40.6358084265&parent_request_id=05e4d0d3354b883d&request_origin=user

https://www.yelp.com/search/snippet?find_desc=&find_loc=Brooklyn%2C%20NY%2011219&ns=1&l=g%3A-74.0002369881%2C40.6309232084%2C-73.9938426018%2C40.6358084265&parent_request_id=05e4d0d3354b883d&request_origin=user

To filter by distance, pass query parameter 'l' to request.

Value is encoded of form "g:lat1,long1,lat2,long2".

Filter values are found in snippet JSON, under "json.searchPageProps.filterPanelProps.filterInfoMap" property, under sub-properties of the form "g:lat1,long1,lat2,long2".

Distance coordinates are not returned from Yelp until user makes an initial search.  If we want to allow users to configure this property on the first search, the server will need to make an initial search with the given location, and then make a second search with the desired distance filter.

Need to add additional 'geodata' property to cached objects.  They will now look like:
    { cacheTime, restaurants, geoData }

Distance-specification flow:
    * If distance specified:
        - Check cache for (description + location + distance)
            * If cached, return restaurants
        - Check cache for (description + location)
            * If cached:
                - Get geodata
                - Make distance-specified request using cached geodata
                - Cache and return restaurants
        - Make initial request w/o distance param
        - Parse response JSON for restaurants and geodata
        - Cache results under (description + location)
        - If distance !== UNKNOWN
            * Make subsequent request with geodata specified
            * Cache results under (description + location + distance)
            * Return restaurants

Hmm, perhaps there should be a separate cache for mapping location to geodata.  The current cache mechanism would generate a new cached entity for the same location but different descriptions.  As far as geodata is concerned, all that matters is location.


Distance-specification flow:
    * If distance specified:
        - Check cache for (description + location + distance)
            * If cached, return restaurants
        - Check cache for (location)
            * If cached:
                - Get geodata
                - Make distance-specified request using cached geodata
                - Cache and return restaurants
        - Make initial request w/o distance param
        - Parse response JSON for restaurants and geodata
        - Cache restaurants under (description + location)
        - Cache geodata under (location)
        - Make subsequent request with geodata specified
        - Cache results under (description + location + distance)
        - Return restaurants
*/
