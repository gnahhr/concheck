import React, { useState } from 'react';
import ImageItem from './ImageItem';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const ImageFolder = ({date, items}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <>
    <div className="image-item action-img" onClick={e => handleClick()}>
        <FontAwesomeIcon icon={faFolder} className="uploadImgIcon"/>
        <p className="text-center">{date}</p>
    </div>
    {open && items && items.map(item =>
        <ImageItem image={item.image} date={item.date} key={item.id} />
    )
    }
    </>
  )
}

export default ImageFolder