import axios from 'axios';

import {
  MODEL_LIST,
  MODEL_LIST_ERROR,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_LIST_ERROR,
  GET_MODEL_LIST,
  GET_MODEL_LIST_ERROR,
} from 'constants/action-types';

import { handleErrors } from '../utils/network';

import data from 'db';

// const MODELS_URL = 'https://s3.ap-south-1.amazonaws.com/scapic-others/json/models.json';

export const fetchModelList = () => (dispatch) => {
  dispatch({ payload: data, type: MODEL_LIST });
  // axios.get(MODELS_URL)
  //   .then((response) => {
  //     const { data } = response.data;
  //     dispatch({ payload: data, type: MODEL_LIST });
  //   })
  //   .catch(handleErrors(dispatch, MODEL_LIST));
};


export const getModelCategories = (params = {}) => (dispatch) => {
  const { pageNo } = params;
  dispatch({ type: GET_CATEGORIES_LIST, meta: { append: !!pageNo } });
};

export const getModels = (params = {}) => (dispatch) => {
  const { pageNo } = params;
  dispatch({ type: GET_MODEL_LIST, meta: { append: !!pageNo, ...params } });
};
