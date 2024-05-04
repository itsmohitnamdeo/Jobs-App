import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import JobList from './components/JobList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-white vh-100">
        <div className="container-fluid py-5">
          <JobList />
        </div>
      </div>
    </Provider>
  );
}

export default App;

