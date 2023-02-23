import React from 'react'
import ImageItem from '../../Components/ImagesPage/ImageItem';
import ImageFolder from '../../Components/ImagesPage/ImageFolder';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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
    <main className="main-component">
      <h1 className="text-center">Images</h1>
      {/* <div className="upload-img image-item"> <FontAwesomeIcon icon={faUpload} /> Upload Image</div> */}
      <div className="images-wrapper">
          <div className="action-img image-item">
            <FontAwesomeIcon icon={faUpload} className="uploadImgIcon"/>
            <p className='text-center'>Upload Image</p>
          </div>
          <ImageFolder items={dummyData} date={"12/12"}/>
          <ImageFolder items={dummyData} date={"12/13"}/>
          <ImageFolder items={dummyData} date={"12/14"}/>
          <ImageFolder items={dummyData} date={"12/15"}/>
          <ImageFolder items={dummyData} date={"12/16"}/>
      </div>

    </main>
  )
}

export default ImagesPage