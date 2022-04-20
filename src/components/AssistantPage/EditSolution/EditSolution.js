import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PageHeading} from "../../Utility/text-styles";
import {useParams} from "react-router-dom";
import APIService from "../../../APIService";
import {URL_CLASSES, URL_INSTRUCTORS, URL_SOLUTIONS} from "../../../urls";
import {DataGrid} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";


const columns = [
  { field: 'id', headerName: 'ID'},
  { field: 'section', headerName: 'Section ID', width: 300},
  { field: 'instructor', headerName: 'Instructor ID', width: 300}
];


const EditSolution = () => {
  const [solution, setSolution] = useState();
  const [editedSolution, setEditedSolution] = useState();
  const [instructors, setInstructors] = useState({});
  const [sections, setSections] = useState({});

  const { solution_id } = useParams();

  useEffect(() => {
    APIService.get(URL_SOLUTIONS + solution_id.toString()).then((data) => {
      console.log(solution)
      setSolution(data);
      setEditedSolution(data);
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_INSTRUCTORS).then((data) => {
      setInstructors(new Map(data.map(obj => [obj.id, obj])));
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_CLASSES).then((data) => {
      setSections(new Map(data.map(obj => [obj.id, obj])));
    }, (error) => {
      console.error(error);
    });
  }, [solution_id]);


  return (
    <div data-testid="EditSolution">
      {PageHeading('Edit Solution')}
      <div style={{marginBottom: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        width: '80vw', marginLeft: 'auto', marginRight: 'auto'}}>
        <Button variant={"contained"}>Cancel</Button>
        <Button variant={"contained"} color={"primary"}>Submit</Button>
      </div>
      <div style={{height: '80vh', width: '80vw', margin: 'auto'}}>
        {(solution != null) ?
          (<DataGrid rows={solution.assignments} columns={columns} autoPageSize/>)
          : (<p>Loading</p>)}
      </div>
    </div>
  );
};

EditSolution.propTypes = {};

EditSolution.defaultProps = {};

export default EditSolution;
