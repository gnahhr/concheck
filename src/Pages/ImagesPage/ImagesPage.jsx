import { useState, useEffect } from 'react'
import ImageFolder from '../../Components/ImagesPage/ImageFolder';
import ImageModal from '../../Components/ImagesPage/ImageModal';

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

const ImagesPage = ({projId}) => {
  const [ images, setImages ] = useState([]);
  const handleSelectImages = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setImages(e.target.files);
  }

  console.log

  return (
    <main className="main-component">
      <h1 className="text-center">Images</h1>
      <div className="images-wrapper">
          <div className="action-img image-item">
            <label htmlFor="project-image" className="action-img">
              <FontAwesomeIcon icon={faUpload} className="uploadImgIcon"/>
              <span>Upload Image</span>
              </label>
              <input type="file" name="project-image" id="project-image" accept="images/*" onChange={e => handleSelectImages(e)} multiple/>
          </div>
          <ImageFolder items={dummyData} date={"12/12"}/>
          <ImageFolder items={dummyData} date={"12/13"}/>
          <ImageFolder items={dummyData} date={"12/14"}/>
          <ImageFolder items={dummyData} date={"12/15"}/>
          <ImageFolder items={dummyData} date={"12/16"}/>
          
          {images.length > 0 && <ImageModal images={images} projId={projId}/>}

      </div>
    </main>
  )
}

export default ImagesPage