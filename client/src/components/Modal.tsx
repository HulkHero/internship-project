import React from 'react'
import openModal from '../utils/handleModal'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
type Props = {
    variant: "success" | "error" | "warning" | "info";
    title: string;
    description: string;
    buttonText?: string;
    linkPath?: string;
    linkText?: string;
    goBack?: boolean;
    buttonAction?: () => void;
}

const Modal = ({variant,title,description,buttonText,linkPath,linkText,goBack}: Props) => {
   const navigate=useNavigate()
  switch (variant) {
    case "success":
      return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="success" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-success">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            {linkPath? <Link to={linkPath} className='btn btn-success'>
              {buttonText}</Link>:goBack===true? <button onClick={()=>navigate(-1)} className='btn btn-success' >{linkText}</button> :<button className="btn btn-success">OK</button>}
          </form>
        </div>
      </div>
    </dialog>
    </>
      )
    case "error":
      return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="error" className="modal modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog">
          {linkPath? <Link to={linkPath} className='btn btn-error'>
              {buttonText}</Link>:<button className="btn btn-error">OK</button>}
          </form>
      
        </div>
      </div>
    </dialog>

            
            
        </>
      )

    case "warning":
      return ( 
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="warning" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-warning">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            {linkPath? <Link to="/company/" className='btn btn-warning'>
              {buttonText}</Link>:<button className="btn btn-warning">OK</button>}
          </form>
        </div>
      </div>
    </dialog>
    </>

       )

    default:
      return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg bg-error">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        {linkPath?<div>

            <Link to={linkPath}>
              {linkText}</Link>
          </div>
        :null}
        </div>
      </div>
    </dialog>
    </>
      )
    
  }



}

export default Modal