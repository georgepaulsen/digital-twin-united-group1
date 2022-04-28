import './styles.css';
import Select from 'react-select';
import Papa from 'papaparse';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddIcon from '@material-ui/icons/Add';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
  Form,
  Row,
  Col,
  // Button,
  FloatingLabel,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import CsvReader from './components/CsvReader';
import Popup from 'reactjs-popup';
import SearchField from 'react-search-field';
import data from './components/cargo.json';
import dataNull from './components/cargoNull.json';
import TableView from 'react-table-view';
import { CardonContainer } from 'cardon';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/addcsv';
import React, { useState, useEffect } from 'react';
import { CSVReader } from 'react-papaparse';

import { useFormik } from 'formik';

//CsvReader

//
export default function Input() {
  const [name, setName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('name');
    const initialValue = JSON.parse(saved);
    console.log(initialValue);
    return initialValue || '';
  });
  useEffect(() => {
    // storing input name
    localStorage.setItem('name1', JSON.stringify(name));
  }, [name]);

  //
  var DATA = JSON.parse(localStorage.getItem('cargoDatas') || '[]');
  const [dataSet, setDataSet] = useState(DATA);
  var dataList = [];
  let COLUMNS = {
    id: function (data) {
      return <span>Cargo-{data.id}</span>;
    },

    type: function (data) {
      if (data.type === 1 || data.type === '1' || data.type === 'Hazard') {
        return <font color="red">Hazard</font>;
      } else if (
        data.type === 3 ||
        data.type === '3' ||
        data.type === 'Standard'
      ) {
        return <font color="Green">Standard</font>;
      } else {
        return <font color="Blue">Live Stock</font>;
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const dataClear = () => {
    DATA = JSON.parse(JSON.stringify(dataNull));
    setDataSet(DATA);
    localStorage.setItem('cargoDatas', JSON.stringify(dataNull));
    console.log(DATA);
    console.log(data);
    console.log(localStorage.getItem('cargoDatas'));
  };

  const importSet = () => {
    DATA = JSON.parse(JSON.stringify(data));
    console.log('DATA is');
    setDataSet(DATA);
    localStorage.setItem('cargoDatas', JSON.stringify(data));
    console.log(DATA);
    console.log(data);
    console.log(localStorage.getItem('cargoDatas'));
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      height: 0,
      weight: 0,
      type: 3,
      width: 0,
      length: 0
    },
    onSubmit: (values) => {
      DATA.push(values);
      console.log('DATA');
      console.log(DATA);
      setDataSet(DATA);
      localStorage.setItem('cargoDatas', JSON.stringify(DATA));
      console.log('DATA in localStorage');
      console.log(localStorage.getItem('cargoDatas'));
      setIsOpen(false);
      values.id = 0;
      values.height = 0;
      values.width = 0;
      values.length = 0;
      values.weight = 0;
      values.type = 3;
    }
  });

  //
  const changeHandler = (event) => {
    console.log('csv is reading');
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        DATA = JSON.parse(JSON.stringify(results.data));
        setDataSet(DATA);
        localStorage.setItem('cargoDatas', JSON.stringify(DATA));
      }
    });
  };
  //

  return (
    <Wrapper className="Input">
      {/* <Popup trigger={<button> Import CSV</button>} position="right center">
        <CsvReader />
      </Popup> */}
      <div className="button">
        <Button
          type="button"
          onClick={dataClear}
          variant="contained"
          color="primary"
        >
          <DeleteIcon />
          Clear Data
        </Button>
      </div>

      <div className="button">
        <Button
          type="button"
          onClick={importSet}
          variant="contained"
          color="primary"
        >
          <AutorenewIcon />
          import Pre Set Data
        </Button>
      </div>

      {/* File Uploader */}
      <div className="button">
        <Button
          type="button"
          onChange={changeHandler}
          variant="contained"
          color="primary"
          component="label"
        >
          <DriveFolderUploadIcon />
          Upload Cargo data
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv"
            hidden
            // style={{ display: 'block', margin: '10px auto' }}
          />
        </Button>
      </div>

      <div className="button">
        <Button
          type="button"
          onClick={togglePopup}
          variant="contained"
          color="primary"
          component="label"
          value="Add Cargo Data"
        >
          <CreateIcon />
          Add Cargo Data
          {/* <input type="button" value="Add Cargo Data" onClick={togglePopup} /> */}
        </Button>
        {isOpen && (
          <App
            content={
              <>
                <form onSubmit={formik.handleSubmit}>
                  <h3 style={{ color: 'blue' }}> Enter Cargo Details</h3>
                  <label className="label">ID:</label>
                  <input
                    id="id"
                    name="id"
                    type="number"
                    onChange={formik.handleChange}
                    // onChange={(e) => setName(e.target.value)}
                    // value={name}
                  />
                  <br />

                  <label className="label">Height:</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.height}
                  />
                  <br />

                  <label className="label">Width:</label>
                  <input
                    id="width"
                    name="width"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.width}
                  />
                  <br />

                  <label className="label">Length:</label>
                  <input
                    id="length"
                    name="length"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.length}
                  />

                  <br />

                  <label className="label">Weight:</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                  />

                  <br />
                  <label className="label">Cargo Type </label>
                  <br />
                  <select
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <option selected value={3} className="Standard">
                      Standard
                    </option>
                    <option value={1} className="Hazard">
                      Hazard
                    </option>
                    <option value={2}>Live Animal</option>
                  </select>
                  <br />
                  {/* <input type="submit" /> */}
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>

      <div className="main">
        {/* <h1>Search</h1>
        <div className="search">
          <SearchField
            placeholder="Search..."
            searchText="This is initial search text"
            classNames="test-class"
          />
        </div> */}

        {dataSet !== null ? (
          <div>
            <TableView data={dataSet} columns={COLUMNS} />
          </div>
        ) : (
          <>
            <div>
              <TableView columns={COLUMNS} />
            </div>
          </>
        )}
      </div>

      <div> </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background: #082444;
  height: 1500px;
  color: white;
`;
