import jobData from '../jobdata.json';

export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs
});

export const fetchJobs = () => {
  return (dispatch) => {
    dispatch(fetchJobsSuccess(jobData));
  };
};
