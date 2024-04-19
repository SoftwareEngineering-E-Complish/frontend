import axiosInstance from "./axiosInstance"

const getPropertySecondaryImages = async (propertyId) => {
    const response = await axiosInstance.get('/getImageUrls', {
        params: { propertyId: propertyId }
    });
    return response.data ?? [];
}

export default getPropertySecondaryImages;