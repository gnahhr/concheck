import React from 'react'

const ImageItem = ({image, date}) => {
  return (
    <div className="image-item">
        <img src={image} alt="img" className="projImages"/>
        <p className="text-center">{date}</p>
    </div>
  )
}

export default ImageItem