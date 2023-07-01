import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css'

const Posts = () => {
  const [data, setData] = useState(
    {   
      "name" : "",
      "username" : "",
      "email": "",
      "signUpType": "user"
    }
  )

  const [query, setQuery] = useState('')

  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)


    const handleUsers = () => {
      axios.get(`${import.meta.env.VITE_BASE_URL}`)
      .then((response)=>
      {
        console.log(response.data)
        setUsers(response.data)
      }
      )
    }

    const allUsers = () => {
        setLoading(true)
        setTimeout(() => {
            handleUsers()
            setLoading(false)
        }, 1000);
    }

    const handleChange = (e) => {
      setData({
       ...data,
         [e.target.name]: e.target.value
      })
    }

    const makeUser = (e) => {
      setSubmitting(true)
      e.preventDefault()
        axios.post(`${import.meta.env.VITE_BASE_URL}/post`, data)
      .then((response)=>{
        setSubmitting(false)
        console.log(response)
          handleUsers()
        })
      .catch((err) => {
        setSubmitting(false)
        console.log("Make user:" , err);
      })
     }

     const deleteUser = (user) => {
       setLoading(true)
        axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/${user}`)
        .then((response)=>{
              if(response.status === 200){
                handleUsers()
              }
              setMessage(response.data)
              toggleModal()
              setLoading(false)

          })
     }


     const toggleModal = () => {
       const modal = document.getElementById('modal')
       modal.classList.toggle('hidden')
       modal.classList.toggle('flex')
     }

     const filterByType = (type) =>{
         setLoading(true)
        axios.get(`${import.meta.env.VITE_BASE_URL}/${type}`)
        .then((response)=>{
            setTimeout(() => {
                setUsers(response.data)
                setLoading(false)
            }, 1000);
        }).catch((err)=>
            {console.warn(err);}
        )
    }

    useEffect(() => {
      handleUsers()
    }, [])
    
    
     

     
 


  return (

    <div className="">
        {query}
      <p>{data.name}</p>
      <p>{data.username}</p>
      <p>{data.signUpType}</p>
      <p>{data.email}</p>

      <div className='flex py-6 gap-6'>
        <button type='button' onClick={allUsers} className="bg-black rounded-3xl text-fuchsia-500 px-6 py-3 hover:bg-fuchsia-500 hover:text-white hover:shadow-md transition-all duration-500 ease-in-out">Fetch Posts</button> 
        <button type='button' onClick={()=>filterByType('user')} className="bg-black rounded-3xl text-fuchsia-500 px-6 py-3 hover:bg-fuchsia-500 hover:text-white hover:shadow-md transition-all duration-500 ease-in-out">All Users</button> 
        <button type='button' onClick={()=>filterByType('admin')} className="bg-black rounded-3xl text-fuchsia-500 px-6 py-3 hover:bg-fuchsia-500 hover:text-white hover:shadow-md transition-all duration-500 ease-in-out">All Admins</button> 
      </div>
        <div className='grid grid-cols-4 gap-4 uppercase font-bold divide-x border border-b-fuchsia-500'>
           <p className='py-2'>Name</p> 
           <p className='py-2'>Username</p> 
           <p className='py-2'>Type</p> 
           <p className='py-2'></p> 
        </div>
    {
        loading 
        ?
        <div className='w-full py-10 flex flex-col items-center gap-5 text-lg font-bold'>
        <div className='h-10 w-10 rounded-[50%] animate-spin border-2 border-dashed  border-l-lime-500 border-r-fuchsia-500 border-t-red-500 border-b-orange-500'>
        </div>
        <p className='text-2xl'><span className='text-lg'>Fetching Posts</span> <span className='animate-pulse delay-150'>.</span> <span className='animate-pulse delay-300'>.</span> <span className='animate-pulse delay-700'>.</span></p>
      </div>
      :
      <ul className='pb-10'>
      {users.map(user => (
        <li key={user.username} className="even:bg-fuchsia-900 odd:bg-fuchsia-500 text-white/80 items-center grid grid-cols-4 gap-4 w-full py-2">
          <div className='px-2'>
              <p>{user.name}</p>
          </div>
          <div className='px-2'>
              <p>{user.username}</p>
          </div>
          <div className='px-2'>
              <p>{user.signUpType}</p>
          </div>
          <div className='flex justify-end px-2'>
              <button type='button' disable={loading} className={`bg-red-500 px-4 py-2 text-white rounded-lg w-fit`} onClick={()=>deleteUser(user.username)}>Delete</button>
          </div>
          </li>
      ))}
    </ul>
    }
    

      <div id='modal' className='hidden fixed w-full h-full top-0 left-0  py-20'>
          <div onClick={toggleModal} className='cursor-pointer modal-closer bg-black/40 backdrop-blur-sm fixed w-full h-full top-0 left-0 z-10'>
            
          </div>
          <div className='text-left w-[40%] py-10 px-5 bg-white m-auto z-20 rounded-lg space-y-8'>
            <h3 className='font-bold text-blue-500 text-2xl'>Action: Delete</h3>
            <p><span className='font-bold'>Returned: </span> {message}</p>
          </div>
      </div>

      <form action="" className="rounded-lg shadow-md px-6 py-4 flex flex-col gap-4 items-center border">
        <label htmlFor="name" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Name</span>
          <input onChange={handleChange} type="text" name='name' id='name' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.name} />
        </label>
        <label htmlFor="username" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Username</span>
          <input onChange={handleChange} type="text" name='username' id='username' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.username} />
        </label>
        <label htmlFor="signUpType" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Sign Up as</span>
          <select onChange={handleChange} name="signUpType" id="signUpType" required className='border rounded-lg px-3 py-2 w-full col-span-9'>
              <option value="user" selected>User</option>
              <option value="admin">Admin</option>
          </select>
        </label>
        <label htmlFor="email" className='w-full grid grid-cols-12 gap-2 items-center'>
          <span className='col-span-3 text-left text-bold font-bold'>Email</span>
          <input onChange={handleChange} type="email" name='email' id='email' className='border rounded-lg px-3 py-2 w-full col-span-9' required defaultValue={data.email} />
        </label>
        <button type='button'  onClick={makeUser} disabled={submitting} className={`bg-blue-500 disabled:bg-gray-600 px-4 py-2 flex items-center justify-center text-white rounded-lg w-fit`}>{submitting ? <ClipLoader /> : "Submit"}</button>
      </form>
    </div>
  )
}

export default Posts
