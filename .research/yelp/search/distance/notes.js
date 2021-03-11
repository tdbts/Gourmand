/* ==========================================================================
   Distance Filter Notes
   ========================================================================== */

/*

https://www.yelp.com/search/snippet?find_desc=&find_loc=Brooklyn%2C%20NY%2011219&ns=1&l=g%3A-74.0002369881%2C40.6309232084%2C-73.9938426018%2C40.6358084265&parent_request_id=05e4d0d3354b883d&request_origin=user

https://www.yelp.com/search/snippet?find_desc=&find_loc=Brooklyn%2C%20NY%2011219&ns=1&l=g%3A-74.0002369881%2C40.6309232084%2C-73.9938426018%2C40.6358084265&parent_request_id=05e4d0d3354b883d&request_origin=user

To filter by distance, pass query parameter 'l' to request.

Value is encoded of form "g:lat1,long1,lat2,long2".

Filter values are found in snippet JSON, under "json.searchPageProps.filterPanelProps.filterInfoMap" property, under sub-properties of the form "g:lat1,long1,lat2,long2".

*/
