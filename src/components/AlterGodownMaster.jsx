import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AlterGodownMaster = () => {
  let navigate = useNavigate();
  const { godownCode } = useParams();

  const [godown, setGodown] = useState({
    godownCode: "",
    godownName: ""
  });

  const inputRefs = useRef({
    godownCode: null,
    godownName: null,
    acceptButton: null
  });


  const godownCodeRef = useRef(null);
  const acceptButtonRef = useRef(null);

  const onInputChange = (e) => {
    setGodown({ ...godown, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/master/alterGodownMaster/${godownCode}`, godown);
      navigate("/alteredGodown");
    } catch (error) {
      console.error("Error updating the godown", error);
    }
  };

  useEffect(() => {
    if (godownCodeRef.current) {
      godownCodeRef.current.focus();
    }
    loadGodown();
  }, [godownCode]);


  const handleKeyDown = (event) => {
    const { keyCode, target } = event;

    if (keyCode === 13) {
      event.preventDefault();
      const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
        acceptButtonRef.current.focus();
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
      }
    } else if (keyCode === 27) {
      if (target.id === 'acceptButton') {
        inputRefs.current.godownName.focus();
      } else {
        const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
        const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
      }
    }
  };

  const loadGodown = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/master/displayGodown/${godownCode}`);
      setGodown(result.data);
    } catch (error) {
      console.error("Error fetching the godown data", error);
    }
  };

  return (
    <div>
      <div className='flex'>
        <div className=' h-[100vh] border border-gray-500'>

        </div>

        <div className='w-1/2 border h-[100vh]'>
          <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Godown Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
              <Link to={"/godownAlter"}><IoClose /></Link>
            </span>
          </div>

          <div className='w-[550px] h-[10vh] border border-gray-500 ml-[750px]'>
            <form onSubmit={onSubmit}>
              {['godownCode', 'godownName'].map((field) => (
                <div key={field} className='input-ldgr flex items-center mt-1'>
                  <label htmlFor={field} className='text-sm ml-2 mr-2 w-[140px]'>{field.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase())}</label>
                  <span className='mr-2'>:</span>
                  <input type="text" id={field} name={field} value={godown[field]} onChange={onInputChange} onKeyDown={handleKeyDown} ref={input => {if(field === 'godownCode') godownCodeRef.current = input; inputRefs.current[field] = input; }} className='w-[300px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                </div>
              ))}

              <div className='mt-[440px]'>
                <button type='submit' id='acceptButton' ref={button => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'> A: Accept</button>
              </div>

            </form>
          </div>

        <div className='mt-[450px] ml-[1150px]'>
          <Link to={"/godownAlter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AlterGodownMaster;
