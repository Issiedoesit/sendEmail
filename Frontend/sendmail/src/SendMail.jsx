import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";


const SendMail = () => {
  const [data, setData] = useState(
    {   
      "email" : "",
      "subject" : "",
      "message": "",
      "sender": ""
    }
  )

  // const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  
  const handleChange = (e) => {
    setData({
     ...data,
       [e.target.name]: e.target.value
    })
  }


  const toggleModal = () => {
    const modal = document.getElementById('modal')
    modal.classList.toggle('hidden')
    modal.classList.toggle('flex')
  }

  const sendEmail = (e) => {
    setSubmitting(true)
    e.preventDefault()
    // console.log('Working');
    // console.log(`${import.meta.env.VITE_BASE_URL}/api/sendmail`);
    axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendmail`, data)
    .then((response)=>{
      console.log(response)
      setSubmitting(false)
        setMessage(response.data.message)
        toggleModal()
      })
      .catch((err)=>
      {  
        setSubmitting(false)
        setMessage(err.message)
        toggleModal()}
      )
  
   }



   
      

  return (

    <div className="">

      <div className='py-6 px-6 text-4xl text-black'>
          <div>
            Send emails
            <div className='flex flex-col h-10 overflow-hidden'>
              <div id='mover' className=' transition-all duration-500 ease-in-out flex flex-col'>
              </div>
            </div>
          </div>
      </div>
       {/* <p>{data.email}</p>
      <p>{data.subject}</p>
      <p>{data.message}</p> */}

      <div id='modal' className='hidden fixed w-full h-full top-0 left-0 py-20 z-30'>
          <div onClick={toggleModal} className='cursor-pointer modal-closer bg-black/40 backdrop-blur-sm fixed w-full h-full top-0 left-0 z-10'>
            
          </div>
          <div className='text-left w-[40%] py-10 px-5 bg-white m-auto z-20 rounded-lg space-y-8'>
            <h3 className='font-bold text-blue-500 text-2xl'>Action: Send Mail</h3>
            <p><span className='font-bold'>Returned: </span> {message}</p>
          </div>
      </div>
  

    <form action="" className="rounded-lg drop-shadow-md max-w-lg mx-auto w-full px-6 py-4 flex flex-col gap-4 items-center border">
      <label htmlFor="email" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Email</span>
          <input onChange={handleChange} type="email" name='email' id='email' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.email} />
        </label>
        <label htmlFor="sender" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Full Name</span>
          <input onChange={handleChange} type="text" name='sender' id='sender' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.name} />
        </label>
        <label htmlFor="subject" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Subject</span>
          <input onChange={handleChange} type="text" maxLength={50} name='subject' id='subject' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.name} />
        </label>
        <label htmlFor="message" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Message</span>
          <input onChange={handleChange} type="text" name='message' id='message' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.username} />
        </label>
        <button type='button'  onClick={sendEmail} disabled={submitting} className={`bg-blue-500 disabled:bg-gray-600 px-4 py-2 flex items-center justify-center text-white rounded-lg w-fit`}>{submitting ? <Cliploader /> : "Submit"}</button>
      </form>
    </div>
  )
}

export default SendMail
