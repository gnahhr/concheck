import { useState } from 'react'
import { editCaption, deleteImage } from '../../Hooks/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


const ImageItem = ({image, setShowEdit, setShowToast, setToastData}) => {
  const [ caption, setCaption ] = useState(image.caption);
  const handleEdit = async (e) => {
    const response = await editCaption(image.imageId, {caption: caption});
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
    setShowEdit(false);
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setCaption(e.target.value);
  }

  const handleExit = (e) => {
    e.preventDefault(e);
    setShowEdit(false);
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault(e);

    const response = await deleteImage(image.imageId);

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
    setShowEdit(false);
  }

  return (
    <div className="modal-wrapper">
      
      <div className="modal-content">
        <h2>Edit Caption</h2>
        <FontAwesomeIcon icon={faClose} className="icon icon-trim exit" onClick={e => handleExit(e)}/>
        <img src={image.imageUrl} alt={image._id} className="upImg-modal" />
        <input type="text" name="caption" id="caption" value={caption} onChange={e => handleOnChange(e)} />
        <div className="btn-group">
          <div className="btn" onClick={e => handleEdit(e)}>
            Edit Caption
          </div>
          <div className="btn red-btn" onClick={e => handleDeleteImage(e)}>
            Delete Photo
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageItem