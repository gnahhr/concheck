import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

import './Project.css';

const Project = () => {
  //Form Data 
  const [ projectName, setProjectName ] = useState("Sample Project Name");
  const [ startDate, setStartDate ] = useState("2019-04-04");
  const [ targetDate, setTargetDate ] = useState("2019-04-04");
  const [ projectEngineer, setTargetEngineer ] = useState("Engineer 1");
  const [ siteEngineer, setSiteEngineer ] = useState("Engineer 2");
  const [ safetyOfficer, setSafetyOfficer ] = useState("Officer 1");
  const [ projectCode, setProjectCode ] = useState("ABC123");
  const [ budget, setBudget ] = useState(9999);

  // ID
  const { id } = useParams();
  const checkId = id === undefined;

  //Toggle
  const [ isEdit, setIsEdit ] = useState(checkId);

  //Form Functions  
  const setFunctions = {
    "project-name": setProjectName,
    "start-date": setStartDate,
    "target-date": setTargetDate,
    "project-engineer": setTargetEngineer,
    "site-engineer": setSiteEngineer,
    "safety-officer": setSafetyOfficer,
    "project-code": setProjectCode,
    "project-budget": setBudget
  }

  const onValueChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFunctions[name](value);
  }

  const toggleEdit = (e) => {
    e.preventDefault();

    setIsEdit(() => !isEdit);
  }

  const createProject = () => {
    // post request to create a project from form submit using axios

  }

  return (
    <div className="main-component">
        <h2>Project</h2>
        <div className="component-header">
            <div className="left-header">
                <div className="image">
                    IMAGE                
                </div>
            </div>
            <div className="right-header">
                <h3 className="hproject-name">Project Name</h3>
                <p className="date">Start Date</p>
            </div>
        </div>
        <h2>Project Details</h2>
        <div className="upload-img">
            <FontAwesomeIcon icon={faUpload} className="form-icon"/>
            <span>Upload Image</span>
        </div>
        {/* Fields */}
        <form action="#" method="post" className="project-details">
            <div className="form-input">
                <label htmlFor="project-name">Project name:</label>
                <input type="text" name="project-name" id="project-name" value={projectName} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="start-date">Start Date:</label>
                <input type="date" name="start-date" id="start-date" value={startDate}  onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="targer-date">Target Date:</label>
                <input type="date" name="target-date" id="target-date" value={targetDate} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="project-engineer">Project Engineer:</label>
                <input type="text" name="project-engineer" id="project-engineer" value={projectEngineer} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="site-engineer">Site Engineer:</label>
                <input type="text" name="site-engineer" id="site-engineer" value={siteEngineer} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="safety-officer">Safety Officer:</label>
                <input type="text" name="safety-officer" id="safety-officer" value={safetyOfficer} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="project-code">Project Code:</label>
                <input type="text" name="project-code" id="project-code" value={projectCode} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="project-budget">Budget:</label>
                <input type="number" name="project-budget" id="project-budget" value={budget} onChange={onValueChange} disabled={!isEdit}/>
            </div>

            
            {id === undefined ?
            <div className="btn" onClick={(e) => toggleEdit(e)}>
              <span>Create Project</span>
            </div>
            :
            <div className="btn" onClick={(e) => toggleEdit(e)}>
                <span>{isEdit? "Save" : "Edit"}</span>
            </div>
            }
        </form>
    </div>
  )
}

export default Project