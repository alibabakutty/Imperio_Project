import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewGodownMaster } from '../services/MasterService';

const GodownMaster = () => {

  const [godownCode, setGodownCode] = useState('');
  const [godownName, setGodownName] = useState('');

  const inputRef = useRef(null);

  const navigator = useNavigate();

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
    }

  }, []);


  function saveGodownMaster(e){
    e.preventDefault();

    const godown = {godownCode, godownName};

    console.log(godown);

    createNewGodownMaster(godown).then((response) =>{
      console.log(response.data);

      navigator('/addedGodown');
    }).catch((error) =>{
      console.error('Error creating godown master:', error);
    })
  };


  return (
    <div className='w-1/2 border h-[100vh]'>
      <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
        <h2 className='ml-[200px]'>Godown Master</h2>
        <span className='cursor-pointer mt-[5px] mr-2'>
          <Link to={"/list"}><IoClose /></Link>
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
                value={godownCode}
               onChange={(e) => setGodownCode(e.target.value)}
                ref={inputRef}
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
                value={godownName}
                onChange={(e) => setGodownName(e.target.value)}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          

          <div className='mt-[445px]'>
            <button
              type='submit'
              
              className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
              id='accptButton'
              onClick={saveGodownMaster}
            >A: Accept</button>
          </div>

        </form>

      </div>

      <div className='mt-[430px] ml-[495px]'>
        <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>
      </div>
    </div>

  )
}

export default GodownMaster