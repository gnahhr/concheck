import { useState, useEffect } from 'react'
import { uploadImage } from '../../Hooks/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({images, projId, setShowModal, setShowToast, setToastData}) => {
  const [ captionList, setCaptionList ] = useState();

  const initializeCaptionList = () => {
    return Array.from(Array(images.length), (e, i) => ({
      "id": i,
      "content": ""
    }));
  }

  const createFormData = () => {
    const formData = new FormData();

    Array.from(Array(images.length), (e, i) => 
      {
        formData.append("imageUrl", images[i]);
        formData.append("caption", captionList[i].content);
      }
    );

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = createFormData();
    const response = await uploadImage(projId, data);

    let toastType;

    if (response.statusCode === 200) {
      toastType = 'success';
    } else {
      toastType = 'warning';
    }

    setToastData({
      toastMsg: response.response.message,
      toastType: toastType,
    })

    setShowToast(true);
    setShowModal(false);
  };

  const handleExit = (e) => {
    setShowModal(false);
  }

  const handleCaptionChange = (e, i) => {
    e.preventDefault();
    setCaptionList([...captionList], captionList[i].content = e.target.value);
  };

  useEffect(() => {
    setCaptionList(initializeCaptionList());
  }, []);


  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <h2 className="text-center">Upload Image</h2>
        <FontAwesomeIcon icon={faClose} className="icon icon-trim exit" onClick={e => handleExit(e)}/>
        <div className="main-component">
          <form method="post">
          {images.length > 0 &&
            Array.from(Array(images.length), (e, i) => {
                return (
                <div className="img-upload-caption">
                  <img src={URL.createObjectURL(images[i])} alt={images[i].name} key={images[i].name}/>
                  <input type="text" name={`caption-${i}`} id={`caption-${i}`} onChange={e => handleCaptionChange(e, i)} placeholder="Enter caption..."/>
                </div>
                )
            })
          }
          </form>
        </div>

        <div className="btn" onClick={e => handleSubmit(e)}>
          <span>Submit</span>
        </div>
      </div>
    </div>
  )
}

export default ImageModal