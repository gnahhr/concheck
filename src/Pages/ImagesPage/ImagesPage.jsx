import React from 'react'
import ImageItem from '../../Components/ImageItem';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faFolder } from '@fortawesome/free-solid-svg-icons';

//Styles
import './ImagesPage.css';
import sampleImage from '../../assets/placeholder/project.png';

const dummyData = [
  {
    id: 1,
    image: sampleImage,
    date: "12/12/23",
  },
  {
    id: 2,
    image: sampleImage,
    date: "12/12/23",
  },
  {
    id: 3,
    image: sampleImage,
    date: "12/12/23",
  },
  {
    id: 4,
    image: sampleImage,
    date: "12/12/23",
  },
];

const ImagesPage = () => {
  return (
    <div className="main-component">
      <div className="upload-img"> <FontAwesomeIcon icon={faUpload} /> Upload Image</div>
      <div className="filter">
        <label htmlFor="filter">Filter:</label>
          <select name="filter" id="filter">
            <option value="">none</option>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
      </div>
      <div className="images-wrapper">
          <ImageItem image={sampleImage} date={"12/12"}/>
          <ImageItem image={sampleImage} date={"12/12"}/>
          <ImageItem image={sampleImage} date={"12/12"}/>
          <ImageItem image={sampleImage} date={"12/12"}/>
          <ImageItem image={sampleImage} date={"12/12"}/>
      </div>

    </div>
  )
}

export default ImagesPage