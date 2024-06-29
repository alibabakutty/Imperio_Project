import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/font.css'
// import  imperio1  from '../assets/imperio1.jpeg'

const Gateway = () => {

    const createRef = useRef(null);
    const displayRef = useRef(null);
    const alterRef = useRef(null);
    


    const links = [createRef, displayRef, alterRef];


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
    <>
    
    <div className='flex justify-evenly'>

        <div className='w-[90%] flex h-screen'>
            <div className='w-1/2 bg-white flex items-center'>
                <div>
                    {/* <img src={imperio1} alt="Imperio Golden Label" className='w-[900px]'  /> */}
                </div>
            </div> 

            <div className='w-1/2 bg-slate-100 flex justify-center'>

                <div className='w-[300px] h-96 border border-blue-400 text-sm bg-[#def1fc] mt-[82px]'>

                    <h2 className=' text-white bg-[#2a67b1] px-20'>Gateway of Imperio</h2>

                    <ul>
                        <li className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
                            <h2>MASTERS</h2>
                        </li>
                        <Link to={"/list"} ref={createRef} className='block outline-none focus:bg-yellow-500'>
                            <li className="w-full  pl-20 ">
                                Create
                            </li>
                        </Link>
                        <Link to={"/alter"} ref={displayRef} className='block outline-none focus:bg-yellow-500'>
                            <li className="w-full pl-20 p-0">
                                Alter
                            </li>
                        </Link>
                        <Link to={"display"} ref={alterRef} className='block outline-none focus:bg-yellow-500'>
                            <li className="w-full pl-20 p-0">
                                Display
                            </li>
                        </Link>
                    </ul>

                </div>

            </div>

        </div>

    </div>
    
    </>
  )
}

export default Gateway