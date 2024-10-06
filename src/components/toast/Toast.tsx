import React from 'react'
import "./toast.css"

interface toastProps {
    title: string;
    text: string;
}
const Toast: React.FC<toastProps> = ({ title, text }) => {
    return (
        <div className='toast-box'>
            <div className='d-flex gap-3'>
                <img className="align-self-start" src='toastIcon.svg' />
                <div>
                    <p className='headingToast mb-1'>{title}</p>
                    <p className='textToast'>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Toast
