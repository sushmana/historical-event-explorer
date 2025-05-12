import React from 'react'
import './modal.css'

const Modal = (props) => {
  const title = props.showEvents?"Event Detail":props.showBirths?"Birth Detail": <></>;
  return (
    <>
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${props.openModal ? "visibile bg-white/20": "invisible"}`}>
      <div onClick={(e)=>{e.stopPropagation() }} className={` mx-[20px] w-[-webkit-fill-available] h-[500px] overflow-y-auto overflow-hidden bg-white rounded-xl shadow p-2 transition-all ${props.openModal ? "scale-100 opacity-95": "scale-125 opacity-0"}`}>
        <div className='flex flex-row justify-center gap-1 m-[10px]'>
        <h3 className="absolute top-6 text-blue-950 font-bold ">{title}  </h3>
        <button onClick={props.closeModal} className="absolute top-2 right-2 p-1 m-2 rounded-lg text-gray-400 bg-red-500 hover:bg-gray-50 hover:text-gray-600">X</button>
        </div>
        {props.children}
      </div>
    </div>
    </>
  )
}

export default Modal;