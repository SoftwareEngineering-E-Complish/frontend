import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const apiKey = process.env.GOOGLE_MAPS_API_KEY ?? "AIzaSyDkWh3Nr1WBBY3lgfbzjyyZeVLRUwJ6U0w";


console.log(process.env);

console.log(apiKey);

const Map = ({ properties }) => {
    const center = { lat: 47.3769, lng: 8.5417 }
    const navigate = useNavigate();

    const points = useMemo(() => {
        return properties?.map((property) => ({ lat: property.latitude, lng: property.longitude })) ?? [];
    }, [properties]);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        points.forEach(point => bounds.extend(point));
        map.map.fitBounds(bounds);

    }, [points]);

    return <div className={"h-100 w-100 position-relative"}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            yesIWantToUseGoogleMapApiInternals
            style={{
                height: '100vh',
                width: '100%',
                minHeight: '100%',
                maxHeight: 'none'
            }}
            defaultCenter={center}
            defaultZoom={12}
            onGoogleApiLoaded={onLoad}
            shouldUnregisterMapOnUnmount
        >
            {properties.map((property, i) => (
                <Marker
                    key={property.propertyId}
                    lat={property.latitude}
                    lng={property.longitude}
                    onClick={() => navigate({
                        pathname: `/properties/${property.propertyId}`,
                        state: { property: property }
                    })}
                    style={{ cursor: 'pointer' }}
                    text={property.title}
                    img={require("../../assets/icon/home.png")}
                />
            ))}
        </GoogleMapReact>
    </div>
};

export default Map;