import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AlterExecutiveMaster = () => {

  let navigate = useNavigate();

  const {executiveCode} = useParams();   //Use executiveCode from URL parameters

    const [executive, setExecutive] = useState({
        executiveCode: "",
        executiveMaster: "",
        dateOfJoin: "",
        mobileNo: "",
        emailId: "",
        status: ""
    });


    const inputRef = useRef(null);

    const onInputChange = (e) => {
        setExecutive({...executive, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/api/master/alterExecutiveMaster/${executiveCode}`, executive);
      navigate("/alteredExecutive");
    }

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
        
        loadExecutive();
    }, []);

    const loadExecutive = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/master/displayExecutive/${executiveCode}`);
            setExecutive(result.data);
        }catch(error){
            console.error("Error fetching the executive data",error);
        }
    }


  return (
    <div>
        <div className='flex'>
                <div className='w-1/2 h-[100vh] border border-bg-gray-500'>

                </div>

                <div className='w-1/2 border border-bg-gray-500'>

                    <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0'>
                        <h2 className='ml-[200px]'>Executive Master</h2>
                        <span className='cursor-pointer mt-[5px] mr-2'>
                            <IoClose />
                        </span>
                    </div>

                    <div className='w-[550px] h-[30vh] border border-gray-500 ml-[80px] '>
                        <form onSubmit={(e) => {onSubmit(e)}}>
                            <div className='input-ldgr mt-3'>
                                <label htmlFor="executiveCode" className='text-sm ml-2 mr-[49px]'>Executive Code</label>
                                : <input type="text" id='executiveCode' name='executiveCode' value={executive.executiveCode} onChange={(e) =>onInputChange(e)} ref={inputRef} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' /> <br />
                            </div>

                            <div className='input-ldgr mt-1'>
                                <label htmlFor="executiveMaster" className='text-sm mr-[39.5px] ml-2'>Executive Master</label>
                                : <input type="text" id='executiveMaster' name='executiveMaster' value={executive.executiveMaster} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="dateOfJoin" className='text-sm mr-[69px] ml-2'>Date Of Join</label>
                                : <input type="text" id='dateOfJoin' name='dateOfJoin' value={executive.dateOfJoin} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="mobileNo" className='text-sm mr-[83.5px] ml-2'>Mobile No</label>
                                : <input type="text" id='mobileNo' name='mobileNo' value={executive.mobileNo} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="emailId" className='text-sm mr-[97.5px] ml-2'>Email Id</label>
                                : <input type="text" id='emailId' name='emailId' value={executive.emailId} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[106.5px] ml-2'>Status</label>
                                : <input type="text" id='status' name='status' value={executive.status} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='mt-[345px]'>
                                <button type='submit' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' >A: Accept</button>
                            </div>  
                        </form>
                        
                    </div>

                    <div className='mt-[329px] ml-[480px]'>
                    <Link to={"/executiveFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
                </div>

                    

                </div>
                
            </div>

    </div>
  )
}

export default AlterExecutiveMaster