import React from 'react'
import CrewItem from '../../Components/CrewItem';

const ProjectsCrew = () => {
  return (
    <div className="main-component">
        <h2 className="text-center">Project Name</h2>
        <div className="crew-list">
            <CrewItem />
            <CrewItem />
            <CrewItem />
            <CrewItem />
        </div>
    </div>
  )
}

export default ProjectsCrew