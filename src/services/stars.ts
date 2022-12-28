import { STARS } from "utils/endpoints";
import { IStar } from "store/user/types";
import axios from "axios";

const create = async (star: IStar): Promise<IStar> => {
    const response = await axios.post(STARS, star);
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${STARS}/${id}`);
};

const starService = { create, remove };
export default starService;
