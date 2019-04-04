import {
  MODEL_LIST,
  MODEL_LIST_ERROR,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_LIST_ERROR,
  GET_MODEL_LIST,
  GET_MODEL_LIST_ERROR,
} from 'constants/action-types';

import { CATEGORIES_PAGINATION_SIZE, MODELS_PAGINATION_SIZE } from 'constants/app';


const initialState = {
  categories: {},
  categoriesError: null,
  categoriesPaginated: [],
  categoriesPaginatedMeta: {},
  categoriesPaginatedError: null,
};

export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case MODEL_LIST:
      return {
        ...state,
        categories: payload.categories,
        categoriesError: null,
      };

    case MODEL_LIST_ERROR:
      return {
        ...state,
        categoriesError: payload,
      }

    case GET_CATEGORIES_LIST: {
      const { lastFetched = 0 } = state.categoriesPaginatedMeta;
      const lastFetchedIndex = lastFetched * CATEGORIES_PAGINATION_SIZE;
      const currentPage = state.categories.slice(lastFetchedIndex, lastFetchedIndex + CATEGORIES_PAGINATION_SIZE);
      const currentPaginatedPage = currentPage.map(({ models, ...rest }) =>
        ({ ...rest,
          models: models.slice(0, MODELS_PAGINATION_SIZE),
          modelsMeta: { lastFetched: 1, totalPages: Math.ceil(models.length / MODELS_PAGINATION_SIZE) } }));

      return {
        ...state,
        categoriesPaginated: meta.append
          ? [...state.categoriesPaginated, ...currentPaginatedPage]
          : currentPaginatedPage,
        categoriesPaginatedMeta: { ...state.categoriesPaginatedMeta,
          lastFetched: lastFetched + 1,
          totalPages: Math.ceil(state.categories.length / CATEGORIES_PAGINATION_SIZE) },
        categoriesPaginatedError: null,
      };
    }

    case GET_CATEGORIES_LIST_ERROR:
      return {
        ...state,
        modelCategoriesError: payload,
      }

    case GET_MODEL_LIST: {
      const { categoryIndex, pageNo } = meta;

      const { categoriesPaginated } = state;

      const currentPage = categoriesPaginated[categoryIndex];

      const { models, modelsMeta, ...rest } = currentPage;
      const { lastFetched } = modelsMeta;

      const currentFetchIndex = lastFetched * MODELS_PAGINATION_SIZE;

      const newModels = state.categories[categoryIndex].models
        .slice(currentFetchIndex, currentFetchIndex + MODELS_PAGINATION_SIZE);

      const currentPaginatedPage = { ...currentPage, models: [...models, ...newModels],
        modelsMeta: { ...modelsMeta, lastFetched: lastFetched + 1 } };

      categoriesPaginated[categoryIndex] = currentPaginatedPage;

      return {
        ...state,
        categoriesPaginated,
      }
    }

    // case GET_MODEL_LIST_ERROR: {
    //
    //   return {
    //     ...state,
    //     categoriesPaginated,
    //   }
    // }

    default:
      return state;
  }
};
