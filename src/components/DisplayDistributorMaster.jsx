import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

const DisplayDistributorMaster = () => {

    const {distributorCode} = useParams();

    const [distributor, setDistributor] = useState({
        distributorCode: "",
        distributorCompanyName: "",
        distributorOwnerName: "",
        mobileNo: "",
        executiveCode: "",
        executiveMaster: "",
        regionCode: "",
        regionMaster: "",
        contactPersonName: "",
        contactMobileNo: ""
    });


    const inputRef = useRef(null);

    

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
        
        loadDistributor();
    }, []);

    const loadDistributor = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/master/displayDistributor/${distributorCode}`);
            setDistributor(result.data);
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
                        <h2 className='ml-[200px]'>Distributor Master</h2>
                        <span className='cursor-pointer mt-[5px] mr-2'>
                            <IoClose />
                        </span>
                    </div>

                    <div className='w-[550px] h-[45vh] border border-gray-500 ml-[80px] '>
                        <form>
                            <div className='input-ldgr mt-3'>
                                <label htmlFor="executiveCode" className='text-sm ml-2 mr-[87px]'>Distributor Code</label>
                                : <input type="text" id='executiveCode' name='executiveCode' value={distributor.distributorCode} ref={inputRef} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' /> <br />
                            </div>

                            <div className='input-ldgr mt-1'>
                                <label htmlFor="executiveMaster" className='text-sm mr-[20px] ml-2'>Distributor Company Name</label>
                                : <input type="text" id='executiveMaster' name='executiveMaster' value={distributor.distributorCompanyName}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="dateOfJoin" className='text-sm mr-[38px] ml-2'>Distributor Owner Name</label>
                                : <input type="text" id='dateOfJoin' name='dateOfJoin' value={distributor.distributorOwnerName}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="mobileNo" className='text-sm mr-[125px] ml-2'>Mobile No</label>
                                : <input type="text" id='mobileNo' name='mobileNo' value={distributor.mobileNo}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="emailId" className='text-sm mr-[92px] ml-2'>Executive Code</label>
                                : <input type="text" id='emailId' name='emailId' value={distributor.executiveCode}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[82px] ml-2'>Executive Master</label>
                                : <input type="text" id='status' name='status' value={distributor.executiveMaster}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[108px] ml-2'>Region Code</label>
                                : <input type="text" id='status' name='status' value={distributor.regionCode}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[99px] ml-2'>Region Master</label>
                                : <input type="text" id='status' name='status' value={distributor.regionMaster}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[53px] ml-2'>Contact Person Name</label>
                                : <input type="text" id='status' name='status' value={distributor.contactPersonName}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="status" className='text-sm mr-[75px] ml-2'>Contact Mobile No</label>
                                : <input type="text" id='status' name='status' value={distributor.contactMobileNo}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>  
                        </form>
                        
                    </div>

                    <div className='mt-[245px] ml-[30px]'>
                    <Link to={"/distributorFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
                </div>

                    

                </div>
                
            </div>
    </div>
  )
}

export default DisplayDistributorMaster