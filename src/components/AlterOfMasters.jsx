import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const AlterOfMasters = () => {


  const regionRef = useRef(null);
  const executiveRef = useRef(null);
  const distributorRef = useRef(null);
  const productRef = useRef(null);
  const godownRef = useRef(null);
  const backButtonRef = useRef(null);

  const links = [regionRef, executiveRef, distributorRef, productRef, godownRef, backButtonRef];


  useEffect(() =>{
    if(regionRef.current){
      regionRef.current.focus();
    }



    const handleKeyDown = (event) => {
      const currentIndex = links.findIndex(link => link.current === document.activeElement);
  
      if(event.key === 'ArrowDown'){
        event.preventDefault();
  
        const nextIndex = (currentIndex + 1) % links.length;
        links[nextIndex].current.focus();
      }else if(event.key === 'ArrowUp'){
        event.preventDefault();
  
        const prevIndex = (currentIndex - 1 + links.length) % links.length;
        links[prevIndex].current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [links]);


  
  return (
    <div className='flex'>

      
      <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'>

      </div>


      <div className='w-[45%] h-[100vh] bg-[#EEEEEE]'>

      <div className='flex justify-center items-center flex-col'>
        <div className='w-[350px] h-[70vh] border border-gray-600 mt-20 bg-[#def1fc]'>
          <h2 className='p-1 bg-[#2a67b1] text-white text-center text-[14px]'>List of Masters</h2>

          <p className='text-[13px] ml-[120px] mt-12 text-[#686D76]'>DOMSS MASTER</p>

          <Link to="/regionAlter" ref={regionRef} className='block text-center text-sm focus:bg-yellow-500 outline-none mt-2 mb-1'>
            <p className='m-0'>Region Master</p>
          </Link>

          <Link to="/executiveAlter" ref={executiveRef} className='block text-center text-sm focus:bg-yellow-500 outline-none mt-1 mb-1'>
            <p className='m-0'>Executive Master</p>
          </Link>

          <Link to="/distributorAlter" ref={distributorRef} className='block text-center text-sm focus:bg-yellow-500 outline-none mt-1 mb-1'>
            <p className='m-0'>Distributor Master</p>
          </Link>

          <Link to="/productAlter" ref={productRef} className='block text-center text-sm focus:bg-yellow-500 outline-none mt-1 mb-1'>
            <p className='m-0'>Product Master</p>
          </Link>

          <Link to="/godownAlter" ref={godownRef} className='block text-center text-sm focus:bg-yellow-500 outline-none mt-1 mb-1'>
            <p className='m-0'>Godown Master</p>
          </Link>

          
        </div>
        <div className='mt-[70px]'>
            <Link to="/" ref={backButtonRef} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
          </div>
      </div>

      </div>

      

      <div className='w-[10%] bg-[#DDDDDD] h-[100vh]'>

      </div>
    </div>
  )
}

export default AlterOfMasters