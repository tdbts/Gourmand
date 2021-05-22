import {useParams} from "react-router-dom";

const withIDFromURL = Component => (props) => {
    const { id } = useParams();
    return <Component {...props} id={id} />
};

export default withIDFromURL;
