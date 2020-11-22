/*

	Media slice JSON has top-level property 'media' which is a list of media in the slice.

	Each media object has 'id', 'url' and 'caption' properties'.
		- 'user' too, but not necessary

	Media URLs ending in 'o.jpg' link to original photo.

	This is the bare minimum request attributes that will return JSON:

		curl 'https://www.yelp.com/biz_photos/get_media_slice/CMm3Xf-9v3QJ4ge20MoEVg?tab=food&get_local_ads=0&start=0&dir=f' \
		  -H 'x-requested-with: XMLHttpRequest' \
		  --compressed

	This means we don't really have to parse the photo page HTML in order to get the URLs, we can just make 'get-media-slice' requests.

	Slices are about 30 at a time.

	When a Yelp returns a list of restaurants for a query, for each restaurant get media slices successively with a delay between each request (so we don't get flagged) until all photos have been retrieved.

	Food tab request tells you how many media files there are so we know how many requests to make.
*/