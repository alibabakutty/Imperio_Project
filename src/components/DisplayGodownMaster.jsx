import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom';

const DisplayGodownMaster = () => {

  const {godownCode} = useParams();

  const [godown, setGodown] = useState({
    godownCode: "",
    godownName: ""
  });

  const inputRefs = useRef({
    godownCode: null,
    godownName: null,
    backButton: null
  });

  const godownCodeRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() =>{
    if(godownCodeRef.current){
      godownCodeRef.current.focus();
    }


    loadGodown();



    const handleCtrlB = (event) => {
      if(event.ctrlKey && event.key === 'b'){
        event.preventDefault();

        if(backButtonRef.current){
          backButtonRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleCtrlB);


    return () => {
      document.removeEventListener('keydown', handleCtrlB);
    }
  }, [godownCode]);


  const handleKeyDown = (event) => {
    const { keyCode, target } = event;

    if (keyCode === 13) { // Enter key
      event.preventDefault(); // Prevent form submission
      const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
      );
      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) { // Check if it's the last input field
        backButtonRef.current.focus(); // Focus on the back button
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
      }
    } else if (keyCode === 27) { // Escape key
      if (target.id === 'backButton') {
        // If the escape key is pressed on the back button, focus on the sellingPrice
        inputRefs.current.godownName.focus();
      } else {
        let currentInputIndex = Object.keys(inputRefs.current).findIndex(
          (key) => key === target.id
        );
        let prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
      }
    }
  };


  const loadGodown = async () =>{
    try{
      const result = await axios.get(`http://localhost:8080/api/master/displayGodown/${godownCode}`);
      setGodown(result.data);
    }catch(error){
      console.error("Error fetching the godown data",error);
    }
  }

  return (
    <div className='w-1/2 border h-[100vh]'>
      <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
        <h2 className='ml-[200px]'>Godown Master</h2>
        <span className='cursor-pointer mt-[5px] mr-2'>
          <Link to={"/godownFilter"}><IoClose /></Link>
        </span>
      </div>

      <div className='w-[550px] h-[15vh] border border-gray-500 ml-[750px]'>

        <form >

          <div className='input-ldgr mt-3'>
            <label htmlFor="godownCode" className='text-sm mr-[73px] ml-2'>Godown Code</label>
            : <input
                type="text"
                id='godownCode'
                name='godownCode'
                value={godown.godownCode}
                onKeyDown={handleKeyDown}
                ref={(input) => {godownCodeRef.current = input; inputRefs.current.godownCode = input; }}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
              
          </div>

          <div className='input-ldgr'>
            <label htmlFor="goodownName" className='text-sm mr-[70px] ml-2'>Godown Name</label>
            : <input
                type="text"
                id='godownName'
                name='godownName'
                value={godown.godownName}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.godownName = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          


        </form>

      </div>

      <div className='mt-[430px] ml-[495px]'>
        <Link to={"/godownFilter"} id='backButton' ref={(button) => {backButtonRef.current = button; inputRefs.current.backButton = button; }} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>B: Back</Link>
      </div>
    </div>
  )
}

export default DisplayGodownMaster