import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createProject, getProjectById, editProject } from '../../Hooks/project';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
import placeholder from '../../assets/placeholder/project.png';

import './Project.css';

const Project = () => {
  //Toast Data
  const [ toastMessage, setToastMessage ] = useState("");
  const [ openToast, setOpenToast ] = useState(false); 

  //Form Data 
  const [ projectName, setProjectName ] = useState("");
  const [ startDate, setStartDate ] = useState("");
  const [ targetDate, setTargetDate ] = useState("");
  const [ projectEngineer, setTargetEngineer ] = useState("");
  const [ siteEngineer, setSiteEngineer ] = useState("");
  const [ safetyOfficer, setSafetyOfficer ] = useState("");
  const [ projectCode, setProjectCode ] = useState("");
  const [ budget, setBudget ] = useState();
  const [ status, setStatus ] = useState("");
  const [ image, setImage ] = useState("");
  const [ objId, setObjId ] = useState("");

  // ID
  const projId = sessionStorage.getItem("selProjId");
  let { id } = useParams();
  if (projId) id = projId;
  const checkId = id === undefined;
  

  //Toggle
  const [ isEdit, setIsEdit ] = useState(true);

  //Form Functions  
  const setFunctions = {
    "project-name": setProjectName,
    "start-date": setStartDate,
    "target-date": setTargetDate,
    "project-engineer": setTargetEngineer,
    "site-engineer": setSiteEngineer,
    "safety-officer": setSafetyOfficer,
    "project-code": setProjectCode,
    "project-budget": setBudget,
    "project-status": setStatus,
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    document.getElementById("image-display").src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create new formdata object
    const formData = createFormData();

    const response = await createProject(formData);
    console.log(response);
    // const toastMessage = await response.data.message;
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const formData = createFormData();

    const response = await editProject(objId, formData);
    console.log(response);
  }

  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("projectName", projectName);
    formData.append("startDate", startDate);
    formData.append("endDate", targetDate);
    formData.append("projectEngineer", projectEngineer);
    formData.append("siteEngineer", siteEngineer);
    formData.append("safetyOfficer", safetyOfficer);
    formData.append("projectCode", projectCode);
    formData.append("budget", budget);
    formData.append("status", status);
    formData.append("imageUrl", image);

    return formData;
  }

  const getProject = async () => {
    const response = await getProjectById(id);
    const data = response.data;
    setProjectName(data.projectName);
    setStartDate(formatDate(new Date(data.startDate)));
    setTargetDate(formatDate(new Date(data.endDate)));
    setTargetEngineer(data.projectEngineer);
    setSiteEngineer(data.siteEngineer);
    setSafetyOfficer(data.safetyOfficer);
    setProjectCode(data.projectCode);
    setBudget(data.budget);
    setStatus(data.status);
    setObjId(data._id);

    document.getElementById("image-display").src = data.imageUrl;
  }

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (!checkId) {
      getProject();
    }
  }, [])

  return (
    <div className="main-component">
        <h2>Project</h2>
        <div className="component-header">
            <div className="left-header">
                <img src={placeholder} alt="image" className="image" id="image-display"/>
            </div>
            {!checkId &&
                <div className="right-header">
                    <h3 className="hproject-name">{projectName}</h3>
                    <p className="date">{startDate}</p>
                </div>
            }
        </div>
        <h2>Project Details</h2>
        
        {/* Fields */}
        <form method="post" className="project-details" >
            <div className="upload-img">
                <FontAwesomeIcon icon={faUpload} className="form-icon"/>
                <input type="file" name="project-image" id="project-image" accept=".jpg .jpeg .png" onChange={e => handleChangeImage(e)}/>
            </div>
            {!id &&
              <div className="form-input">
                  <label htmlFor="project-name">Project name:</label>
                  <input type="text" name="project-name" id="project-name" value={projectName} onChange={onValueChange} disabled={!isEdit}/>
              </div>
            }
            <div className="form-input">
                <label htmlFor="start-date">Start Date:</label>
                <input type="date" name="start-date" id="start-date" value={startDate}  onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="targer-date">Target Date:</label>
                <input type="date" name="target-date" id="target-date" value={targetDate} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            {/* Name of the logged in kineme */}
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
                <label htmlFor="project-status">Status:</label>
                <input type="text" name="project-status" id="project-status" value={status} onChange={onValueChange} disabled={!isEdit}/>
            </div>
            <div className="form-input">
                <label htmlFor="project-budget">Budget:</label>
                <input type="number" name="project-budget" id="project-budget" value={budget} onChange={onValueChange} disabled={!isEdit}/>
            </div>

            
            {id === undefined ?
            <div className="btn" onClick={(e) => handleSubmit(e)}>
              <span>Create Project</span>
            </div>
            :
            <div className="btn" onClick={(e) => handleEdit(e)}>
                <span>Save</span>
            </div>
            }
        </form>
    </div>
  )
}

export default Project