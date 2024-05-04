import { FETCH_JOBS_SUCCESS } from './actions';

const initialState = {
  jobs: []
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload
      };
    default:
      return state;
  }
};

export default jobsReducer;
