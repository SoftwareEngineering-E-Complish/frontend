import axiosInstance from "./axiosInstance"

const getPropertySecondaryImages = async (propertyId) => {
    const response = await axiosInstance.get('/getImageUrls', {
        params: { propertyId: propertyId }
    });

    console.log(response);

    return response.data ?? [];
}

export default getPropertySecondaryImages;