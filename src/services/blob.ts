import axios from "axios";
const fetchBlob = async (url: string): Promise<Blob> => {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
};
export default fetchBlob;
