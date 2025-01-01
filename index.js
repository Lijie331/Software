import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import E2Class from './E2';
import HistoryTable from "./HistoryTable";
ReactDOM.render(
  <React.StrictMode>
    {<E2Class />}
    {/*{<HistoryTable />}*/}
  </React.StrictMode>,
  document.getElementById('root')
);

