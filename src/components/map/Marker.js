const Marker = ({ text, img }) => <div className={"d-flex flex-column justify-content-center align-items-center text-center fw-bold fs-6"} style={{ width: '150px' }}>
    <img src={img} alt={"home icon"} />
    {text}
</div>;

export default Marker;