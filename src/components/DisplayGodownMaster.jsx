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

  const inpuRef = useRef(null);

  useEffect(() =>{
    if(inpuRef.current){
      inpuRef.current.focus();
    }


    loadGodown();
  }, [godownCode]);

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
                ref={inpuRef}
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
               
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          


        </form>

      </div>

      <div className='mt-[430px] ml-[495px]'>
        <Link to={"/godownFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>
      </div>
    </div>
  )
}

export default DisplayGodownMaster