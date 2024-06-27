import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/font.css'

const Gateway = () => {

    const createRef = useRef(null);
    const displayRef = useRef(null);
    const alterRef = useRef(null);
    const vouchersRef = useRef(null);
    const dayBookRef = useRef(null);


    const links = [createRef, displayRef, alterRef, vouchersRef, dayBookRef];


    useEffect(() => {
        // Add the 'focused' class to the "Create" link on load
        if(createRef.current){
            createRef.current.focus();
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
        };

    }, [links])
  return (
    <div className='flex'>

        <div className='w-[45%] bg-[#DDDDDD] h-[100vh]'>
            
        </div>



        <div className='w-[45%] bg-[#EEEEEE] h-[100vh] flex justify-center'>
            
            <div className='w-[350px] h-[70vh] bg-[#def1fc]  mt-20 border border-[#5BBCFF]'>

                <h2 className=' p-1 bg-[#2a67b1] text-white text-left text-[14px] pl-28'>Gateway to DOMSS</h2>

                <p className='text-[12px] pl-28 mt-3 mb-2 text-[#5BBCFF]'>MASTERS</p>

                <Link to="/list" ref={createRef} className='block text-left pl-28 text-[14px] focus:bg-[#FEB941] outline-none mb-1'>
                    <p className='m-0'>Create</p>
                </Link>

                <Link to="/display" ref={displayRef} className='block text-left pl-28 text-[14px] focus:bg-[#FEB941] outline-none mb-1'>
                    <p className='m-0'>Display</p>
                </Link>

                <Link to="/alter" ref={alterRef} className='block text-left pl-28 text-[14px] focus:bg-[#FEB941] outline-none mb-1'>
                    <p className='m-0'>Alter</p>
                </Link>

                <p className='text-[12px] text-left pl-28 mt-3 mb-2 text-[#5BBCFF]'>TRANSACTIONS</p>

                <Link to="/paymentVoucher"  ref={vouchersRef} className='block text-left pl-28 text-[14px] focus:bg-[#FEB941] outline-none mb-1'>
                    <p className='m-0'>Vouchers</p>
                </Link>

                <Link to="/conditional"  ref={dayBookRef} className='block text-left pl-28 text-[14px] focus:bg-[#FEB941] outline-none mb-1'>
                    <p className='m-0'>Day Book</p>
                </Link>

            </div>

        </div>



        <div className='w-[10%] bg-[#DDDDDD] h-[100vh]'>

        </div>

        
        
        
    </div>
  )
}

export default Gateway