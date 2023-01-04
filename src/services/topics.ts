import { TOPICS } from "../utils/endpoints";
import { ITopic } from "../store/topics/types";
import axios from "axios";

const create = async (topic: ITopic): Promise<ITopic> => {
    const response = await axios.post(TOPICS, topic);
    return response.data;
};

export const readOne = async (id: number): Promise<ITopic> => {
    const response = await axios.get(`${TOPICS}/${id}`);
    return response.data;
};

const readAll = async (): Promise<ITopic[]> => {
    const response = await axios.get(TOPICS);
    return response.data;
};

const update = async (topic: ITopic): Promise<ITopic> => {
    const response = await axios.put(`${TOPICS}/${topic.id}`, topic);
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${TOPICS}/${id}`);
};

const topicService = { create, readOne, readAll, update, remove };
export default topicService;
