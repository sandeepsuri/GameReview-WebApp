/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom'

const Details = () => {
    const { id } = useParams();
    return <h2>{id}</h2>
};

export default Details;