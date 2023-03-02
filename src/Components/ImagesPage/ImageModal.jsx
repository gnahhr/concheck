import { useState, useEffect } from 'react'
import { uploadImage } from '../../Hooks/image';

const ImageModal = ({images, projId}) => {
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
    console.log(response);
  };

  const handleCaptionChange = (e, i) => {
    e.preventDefault();
    setCaptionList([...captionList], captionList[i].content = e.target.value);
  };

  useEffect(() => {
    setCaptionList(initializeCaptionList());
  }, []);


  return (
    <div className="image-modal">
        <h2 className="text-center">Upload Image</h2>

        <div className="main-component">
          <form method="post"></form>
          {images.length > 0 &&
            Array.from(Array(images.length), (e, i) => {
                return (
                <>
                  <img src={URL.createObjectURL(images[i])} alt={images[i].name} key={images[i].name}/>
                  <input type="text" name={`caption-${i}`} id={`caption-${i}`} onChange={e => handleCaptionChange(e, i)}/>
                </>
                )
            })
          }
        </div>

        <div className="btn" onClick={e => handleSubmit(e)}>
          <span>Submit</span>
        </div>
    </div>
  )
}

export default ImageModal