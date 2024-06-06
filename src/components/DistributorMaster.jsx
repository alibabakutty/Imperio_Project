import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewDistributorMaster } from '../services/MasterService';
import '../assets/css/font.css'
import axios from 'axios';


const DistributorMaster = () => {



    const [distributorCode, setDistributorCode] = useState('');
    const [distributorCompanyName, setDistributorCompanyName] = useState('');
    const [distributorOwnerName, setDistributorOwnerName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [executiveCode, setExecutiveCode] = useState('');
    const [executiveMaster, setExecutiveMaster] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const [regionMaster, setRegionMaster] = useState('');
    const [contactPersonName, setContactPersonName] = useState('');
    const [contactMobileNo, setContactMobileNo] = useState('');

    const [errors, setErrors] = useState({});


    const[executiveSuggestions, setExecutiveSuggestions] = useState({});

    const [filteredExecutiveCodeSuggestions, setFilteredExecutiveCodeSuggestions] = useState([]);
    const [filteredExecutiveMasterSuggestions, setFilteredExecutiveMasterSuggestions] = useState([]);

    const inputRef = useRef(null);


    const navigator = useNavigate();


    useEffect(() =>{
        if(inputRef.current){
            inputRef.current.focus();
        }


        //fetch executive suggestions
        const fetchExecutiveSuggestions = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/api/master/allExecutive');
                setExecutiveSuggestions(response.data);
            }catch(error){
                console.error('Error fetching executive data:', error);
            }
        };

        fetchExecutiveSuggestions();
    }, []);


    const handleExecutiveCodeInputChange = (e) =>{
        const value = e.target.value;
        setExecutiveCode(value);

        if(value.trim() !== ''){
            const filteredSuggestions = executiveSuggestions.filter((executive) => executive.executiveCode.toLowerCase().includes(value.toLowerCase()));
            setFilteredExecutiveCodeSuggestions(filteredSuggestions);
        }else{
            setFilteredExecutiveCodeSuggestions([]);
        }
    };


    const handleExecutiveNameInputChange = (e) =>{
        const value = e.target.value;
        setExecutiveMaster(value);

        if(value.trim() !== ''){
            const filteredSuggestions = executiveSuggestions.filter((executive) => executive.executiveMaster.toLowerCase().includes(value.toLowerCase()));
            setFilteredExecutiveMasterSuggestions(filteredSuggestions);
        }else{
            setFilteredExecutiveMasterSuggestions([]);
        }
    };


    const selectExecutive = (executive) =>{
        setExecutiveCode(executive.executiveCode);
        setExecutiveMaster(executive.executiveMaster);
        setFilteredExecutiveCodeSuggestions([]);
        setFilteredExecutiveMasterSuggestions([]);
    }


    const validateForm = () =>{
        const newErrors = {};
        if(!distributorCode.trim()){
            newErrors.distributorCode = 'Distributor Code is required!';
        }
        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;
    }


    function saveDsitributorMaster(e){
        e.preventDefault();


        if(!validateForm()){
            return;
        }

        const distributor = {distributorCode, distributorCompanyName, distributorOwnerName, mobileNo, executiveCode, executiveMaster, regionCode, regionMaster, contactPersonName, contactMobileNo};

        console.log(distributor);


        createNewDistributorMaster(distributor).then((response) =>{
            console.log(response.data);
            navigator('/addedDistributor');
        }).catch((error) => {
            console.error('Error catching distributor master:', error);
        })
    };

  return (
    <div className='w-1/2 border h-[100vh]'>

        <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[190px]'>Distributor Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
                <IoClose />
            </span>
        </div>

        <div className='w-[550px] h-[45vh] border border-gray-500 ml-[750px]'>


            <form>
                

            <div className='input-ldgr  mr-4 mt-3   '  >
            <label htmlFor="distributorCode" className='text-sm mr-[79px] ml-2'>Distributor Code</label>
            : <input type="text" id='distributorCode' name='distributorCode' value={distributorCode} onChange={(e) => setDistributorCode(e.target.value)} ref={inputRef}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            {errors.distributorCode && <p className='text-red-500 text-xs ml-2'>{errors.distributorCode}</p>}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="distributorCompanyName" className='text-sm mr-[13px] ml-2'>Distributor Company Name</label>
                : <input type="text" id='distributorCompanyName' name='distributorCompanyName' value={distributorCompanyName} onChange={(e) => setDistributorCompanyName(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="distributorOwnerName" className='text-sm  mr-[31px] ml-2'>Distributor Owner Name</label>
                : <input type="text" id='distributorOwnerName' name='distributorOwnerName' value={distributorOwnerName} onChange={(e) => setDistributorOwnerName(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="mobileNo" className='text-sm  mr-[118px] ml-2'>Mobile No</label>
                : <input type="text" id='mobileNo' name='mobileNo' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="executiveCode" className='text-sm  mr-[84px] ml-2'>Executive Code</label>
                : <input type="text" id='executiveCode' name='executiveCode' value={executiveCode} onChange={(e) => setExecutiveCode(e.target.value)} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredExecutiveCodeSuggestions.length > 0 && (
                    <div>
                        <div>
                            <p>List Of Executive Codes</p>
                        </div>
                        <ul>
                            
                        </ul>
                    </div>
                )}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="executiveMaster" className='text-sm  mr-[75px] ml-2'>Executive Master</label>
                : <input type="text" id='executiveMaster' name='executiveMaster' value={executiveMaster} onChange={(e) => setExecutiveMaster(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="regionCode" className='text-sm  mr-[101px] ml-2'>Region Code</label>
                : <input type="text" id='regionCode' name='regionCode' value={regionCode} onChange={(e) => setRegionCode(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="regionMaster" className='text-sm  mr-[92px] ml-2'>Region Master</label>
                : <input type="text" id='regionMaster' name='regionMaster' value={regionMaster} onChange={(e) => setRegionMaster(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="contactPersonName" className='text-sm  mr-[46px] ml-2'>Contact Person Name</label>
                : <input type="text" id='contactPersonName' name='contactPersonName' value={contactPersonName} onChange={(e) => setContactPersonName(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="contactMobileNo" className='text-sm  mr-[67px] ml-2'>Contact Mobile No</label>
                : <input type="text" id='contactMobileNo' name='contactMobileNo' value={contactMobileNo} onChange={(e) => setContactMobileNo(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='mt-[250px] '>
                <button type='submit' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onClick={saveDsitributorMaster}   >A: Accept</button>
            </div>



            </form>
            
        </div>

        <div className='mt-[230px] ml-[495px]'>


            <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>

        </div>


    </div>
  )
}

export default DistributorMaster