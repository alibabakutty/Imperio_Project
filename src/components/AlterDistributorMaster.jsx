import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AlterDistributorMaster = () => {

  let navigate = useNavigate();

    const {distributorCode} = useParams();     //Use distributorCode from URL parameters

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

    const onInputChange = (e) => {
        setDistributor({...distributor, [e.target.name]: e.target.value})
    };


    const onSubmit = async (e) => {
      e.preventDefault();

      await axios.put(`http://localhost:8080/api/master/alterDistributorMaster/${distributorCode}`, distributor);

      navigate("/alteredDistributor");
    };

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
                            <Link to={"/distributorAlter"}><IoClose /></Link>
                        </span>
                    </div>

                    <div className='w-[550px] h-[45vh] border border-gray-500 ml-[80px] '>
                        <form onSubmit={(e) => {onSubmit(e)}}>
                            <div className='input-ldgr mt-3'>
                                <label htmlFor="distributorCode" className='text-sm ml-2 mr-[87px]'>Distributor Code</label>
                                : <input type="text" id='distributorCode' name='distributorCode' value={distributor.distributorCode} onChange={(e) =>onInputChange(e)} ref={inputRef} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' /> <br />
                            </div>

                            <div className='input-ldgr mt-1'>
                                <label htmlFor="distributorCompanyName" className='text-sm mr-[20px] ml-2'>Distributor Company Name</label>
                                : <input type="text" id='distributorCompanyName' name='distributorCompanyName' value={distributor.distributorCompanyName} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="distributorOwnerName" className='text-sm mr-[38px] ml-2'>Distributor Owner Name</label>
                                : <input type="text" id='distributorOwnerName' name='distributorOwnerName' value={distributor.distributorOwnerName} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="mobileNo" className='text-sm mr-[125px] ml-2'>Mobile No</label>
                                : <input type="text" id='mobileNo' name='mobileNo' value={distributor.mobileNo} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="executiveCode" className='text-sm mr-[92px] ml-2'>Executive Code</label>
                                : <input type="text" id='executiveCode' name='executiveCode' value={distributor.executiveCode} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="executiveMaster" className='text-sm mr-[82px] ml-2'>Executive Master</label>
                                : <input type="text" id='executiveMaster' name='executiveMaster' value={distributor.executiveMaster} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="regionCode" className='text-sm mr-[108px] ml-2'>Region Code</label>
                                : <input type="text" id='regionCode' name='regionCode' value={distributor.regionCode} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="regionMaster" className='text-sm mr-[99px] ml-2'>Region Master</label>
                                : <input type="text" id='regionMaster' name='regionMaster' value={distributor.regionMaster} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="contactPersonName" className='text-sm mr-[53px] ml-2'>Contact Person Name</label>
                                : <input type="text" id='contactPersonName' name='contactPersonName' value={distributor.contactPersonName} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="contactMobileNo" className='text-sm mr-[75px] ml-2'>Contact Mobile No</label>
                                : <input type="text" id='contactMobileNo' name='contactMobileNo' value={distributor.contactMobileNo} onChange={(e) =>onInputChange(e)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='mt-[261px]'>
                                <button type='submit' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'   >A: Accept</button>
                            </div>  
                        </form>
                        
                    </div>

                    <div className='mt-[245px] ml-[480px]'>
                    <Link to={"/distributorFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
                </div>

                    

                </div>
                
            </div>
    </div>
  )
}

export default AlterDistributorMaster