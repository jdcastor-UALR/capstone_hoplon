import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PageHeading} from "../../Utility/text-styles";
import {Link, useParams} from "react-router-dom";
import APIService from "../../../APIService";
import {URL_CLASSES, URL_INSTRUCTORS, URL_SOLUTION_CONSTRAINT_MAP, URL_SOLUTIONS} from "../../../urls";
import {DataGrid} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import EditAssignmentDialog from "./EditAssignmentDialog/EditAssignmentDialog";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";


const EditSolution = () => {
  const [solution, setSolution] = useState();
  const [editedSolution, setEditedSolution] = useState();
  const [instructors, setInstructors] = useState({});
  const [sections, setSections] = useState({});
  const [sectionOverlapMap, setSectionOverlapMap] = useState({});
  const [disciplineMap, setDisciplineMap] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState();

  const { solution_id } = useParams();

  const columns = [
    { field: 'id', headerName: 'ID', hide: true},
    { field: 'course_title', headerName: 'Course', flex: 1},
    { field: 'course_number', hide: true},
    { field: 'meetingTimeString', headerName: 'Meeting Times', flex: 3},
    { field: 'subject_disciplines', headerName: 'Subject Disciplines', hide: true},
    { field: 'instructor_lastName', headerName: 'Assigned Instructor', flex: 1},
    { field: 'Edit', renderCell: (cellValues) => {
        return (
          <IconButton onClick={() => {
            setEditRow(cellValues.row);
            setEditDialogOpen(true);
          }}>
            <EditIcon />
          </IconButton>
        );
      }, flex: 0.5},
  ];

  const getTableData = (assignments) => {
    let data = [];

    if (sections.size !== 0 && sections.size != null) {
      for (let assignment of assignments) {
        const section = sections.get(assignment.section);

        let instructor_name = 'Unassigned';
        if (assignment.instructor != null) {
          instructor_name = instructors.get(assignment.instructor).lastName;
        }

        if (section) {
          data.push({id: assignment.id, course_title: section.course.course_title,
            course_number: section.course.course_number, meetingTimeString: section.meetingTimeString,
            instructor: assignment.instructor, instructor_lastName: instructor_name,
            subject_disciplines: section.course.subject_disciplines});
        }
      }
    }

    return data;
  };

  const isDataPopulated = () => (solution != null && instructors.size != null && sections.size != null &&
    Object.keys(sectionOverlapMap).length !== 0 && Object.keys(disciplineMap).length !== 0);

  useEffect(() => {
    APIService.get(URL_SOLUTIONS + solution_id.toString()).then((data) => {
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

    APIService.get(URL_SOLUTION_CONSTRAINT_MAP).then((data) => {
      setSectionOverlapMap(data.section_overlap_map);
      setDisciplineMap(data.discipline_overlap_map);
    }, (error) => console.error(error));
  }, [solution_id]);


  return (
    <div data-testid="EditSolution">
      <div style={{marginBottom: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-end', width: '80vw', marginLeft: 'auto', marginRight: 'auto'}}>
        <Button variant={"contained"} style={{height: '36px'}} component={Link} to={'/'}>Cancel</Button>
        {PageHeading('Edit Solution')}
        <Button variant={"contained"} style={{height: '36px'}} color={"primary"}>Submit</Button>
      </div>
      <div style={{height: '80vh', width: '80vw', margin: 'auto'}}>
        {(isDataPopulated()) ?
          (<DataGrid rows={getTableData(editedSolution.assignments)} columns={columns} autoPageSize/>)
          : (<p>Loading</p>)}
      </div>
      {isDataPopulated() &&
        <EditAssignmentDialog open={editDialogOpen} setOpen={setEditDialogOpen} row={editRow} schedule={editedSolution}
                              setSchedule={setEditedSolution} instructors={instructors}
                              sectionOverlapMap={sectionOverlapMap} disciplineMap={disciplineMap} />
      }
    </div>
  );
};

EditSolution.propTypes = {};

EditSolution.defaultProps = {};

export default EditSolution;
