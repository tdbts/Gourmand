const Gallery = ({media}) => {
	console.log("media:", media);
	return (
		<>
			{media.map((m, i) => <img className="food-media" src={m.getThumbnailURLs()[0]} key={i} />)}
		</>
	);
};

export default Gallery;