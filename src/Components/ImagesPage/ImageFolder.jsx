import { useState} from 'react';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const ImageFolder = ({date, items, setShowEdit, setSelectedImage}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }
  
  const handleClickImage = (e, item) => {
    setShowEdit(true);
    setSelectedImage(item);
  }
  return (
    <>
    <div className="image-item action-img" onClick={e => handleClick()}>
        <FontAwesomeIcon icon={faFolder} className="uploadImgIcon"/>
        <p className="text-center">{date}</p>
    </div>
    {open && items && items.map(item =>
        <div className="image-item" key={item.imageId} onClick={e => handleClickImage(e, item)}>
            <img src={item.imageUrl} alt="img" className="projImages"/> 
            <p className="text-center">{item.caption}</p>
        </div>
    )
    }
    </>
  )
}

export default ImageFolder