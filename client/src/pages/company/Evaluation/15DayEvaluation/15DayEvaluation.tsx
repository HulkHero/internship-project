import React from 'react'
import Modal from '../../../../components/Modal'
import openModal from '../../../../utils/handleModal'
const Day15Evaluation = () => {
  return (
    <>
    <div>15DayEvaluation</div>
    <button onClick={()=>openModal("error")}>Open Modal</button>
    <Modal  variant='warning'  buttonText='GoTo' linkText='Go To' title={"Warning" } description={"user saved successfully"}  ></Modal>
    <Modal  variant='error'  buttonText='GoTo' linkText='Go To' title={"Error" } description={"user saved successfully"}  ></Modal>
    <Modal  variant='success' linkPath='/company/' buttonText='GoTo' linkText='Go To' title={"Success" } description={"user saved successfully"}  ></Modal>
    </>
  )
}

export default Day15Evaluation