import { ITopic } from "./types";
import { createTopic, setTopics, updateTopic, deleteTopic } from "./reducer";
import topicService from "../../services/topics";
import { AppThunk } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

export const acCreateTopic = (topic: ITopic): AppThunk<Promise<PayloadAction<ITopic>>> => {
    return async (dispatch) => {
        const createdTopic = await topicService.create(topic);
        return dispatch(createTopic(createdTopic));
    };
};

export const acSetTopics = (): AppThunk<Promise<PayloadAction<ITopic[]>>> => {
    return async (dispatch) => {
        const topics = await topicService.readAll();
        return dispatch(setTopics(topics));
    };
};

export const acUpdateTopic = (topic: ITopic): AppThunk<Promise<PayloadAction<ITopic>>> => {
    return async (dispatch) => {
        const updatedTopic = await topicService.update(topic);
        return dispatch(updateTopic(updatedTopic));
    };
};

export const acDeleteTopic = (topic_id: number): AppThunk<Promise<PayloadAction<number>>> => {
    return async (dispatch) => {
        await topicService.remove(topic_id);
        return dispatch(deleteTopic(topic_id));
    };
};
