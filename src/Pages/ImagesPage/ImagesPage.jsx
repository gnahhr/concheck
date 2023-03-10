import { useState, useEffect } from 'react'

// Components
import Toast from '../../Components/General/Toast';
import ImageFolder from '../../Components/ImagesPage/ImageFolder';
import ImageModal from '../../Components/ImagesPage/ImageModal';
import ImageItem from '../../Components/ImagesPage/ImageItem';

import { getImages } from '../../Hooks/image';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';

//Styles
import './ImagesPage.css';

const ImagesPage = ({projId}) => {
  const [ imageList, setImageList ] = useState([]);
  const [ dates, setDates ] = useState([]);
  const [ images, setImages ] = useState([]);
  const [ selectedImage, setSelectedImage ] = useState([]);
  
  // Modal
  const [ showModal, setShowModal ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);

  // Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState(); 


  const handleSelectImages = (e) => {
    e.preventDefault();
    setImages(e.target.files);
    if (e.target.files.length > 0) setShowModal(true);
  }

  const handleGetImages = async () => {
    const response = await getImages(projId);
    const data = response.response.data;
    let imageFilter = {};
    let tempDates = [];

    if (data){
      data.map(image => {
        const imageDate = formatDate(new Date(image.date));
        if (imageFilter[imageDate]) {
          imageFilter[imageDate] = [...imageFilter[imageDate], image]
        } else {
          tempDates.push(imageDate);
          imageFilter[imageDate] = [image]
        }
      })
      setImageList(imageFilter);
      setDates(tempDates);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  useEffect(() => {
    handleGetImages();
  }, [showModal, showEditModal]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  }
  

  return (
    <main>
      <h1 className="text-center">Images</h1>
      <div className="main-component">
        <div className="images-wrapper">
            <div className="action-img image-item">
              <label htmlFor="project-image" className="action-img">
                <FontAwesomeIcon icon={faUpload} className="uploadImgIcon"/>
                <span>Upload Image</span>
                </label>
                <input type="file" name="project-image" id="project-image" accept="images/*" onChange={e => handleSelectImages(e)} multiple/>
            </div>
            {!imageList ?
              <h2>No Images Uploaded yet.</h2>
            :
            dates.map((date) =>
              <ImageFolder
                items={imageList[date]}
                date={date}
                setSelectedImage={setSelectedImage}
                setShowEdit={setShowEditModal}/>
            )
          }
        </div>
      </div>
      {showModal && <ImageModal images={images} projId={projId} setShowModal={setShowModal} setShowToast={setShowToast} setToastData={setToastData}/>}
      {showEditModal && <ImageItem image={selectedImage} setShowEdit={setShowEditModal} setShowToast={setShowToast} setToastData={setToastData}/>}
      {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
  )
}

export default ImagesPage