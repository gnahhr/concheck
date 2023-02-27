import { useEffect } from "react"



const Toast = ({message, openToast, type}) => {

  const handleToast = () => {
    //set timer for 3 seconds then make openToast false
    if (openToast) {
        setInterval
    }
  };

  useEffect(() => {
    
  }, [])

  return (
    <div className="toast">
        <span>{message}</span>
    </div>
  )
}

export default Toast