import { useNavigate } from 'react-router-dom';

function Marker({ text, img, property }) {
    const navigate = useNavigate();

    return <div
        className={"d-flex flex-column justify-content-center align-items-center text-center fw-bold fs-6"}
        style={{ width: '150px', cursor: 'pointer' }}
        onClick={() => navigate({
            pathname: `/properties/${property.propertyId}`,
            state: { property: property }
        })}>
        <img src={img} alt={"home icon"} />
        {text}
    </div>;
}

export default Marker;