import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewDistributorMaster } from '../services/MasterService';
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
    const [regionSuggestions, setRegionSuggestions] = useState({});

    const [filteredExecutiveCodeSuggestions, setFilteredExecutiveCodeSuggestions] = useState([]);
    const [filteredExecutiveMasterSuggestions, setFilteredExecutiveMasterSuggestions] = useState([]);
    const [filteredRegionCodeSuggestions, setFilteredRegionCodeSuggestions] = useState([]);
    const [filteredRegionMasterSuggestions, setFilteredRegionMasterSuggestions] = useState([]);

    const inputRefs = useRef({
        distributorCode: null,
        distributorCompanyName: null,
        distributorOwnerName: null,
        mobileNo: null,
        executiveCode: null,
        executiveMaster: null,
        regionCode: null,
        regionMaster: null,
        contactPersonName: null,
        contactMobileNo: null,
        acceptButton: null
    });


    const distributorCodeRef = useRef(null);
    const acceptButtonRef = useRef(null);


    const navigator = useNavigate();


    useEffect(() =>{
        if(distributorCodeRef.current){
            distributorCodeRef.current.focus();
        }


        //fetch executive suggestions
        const fetchExecutiveSuggestions = async () =>{
            try{
                const responseExecutive = await axios.get('http://localhost:8080/api/master/allExecutive');
                setExecutiveSuggestions(responseExecutive.data);
            }catch(error){
                console.error('Error fetching executive data:', error);
            }
        };

        fetchExecutiveSuggestions();


        //fetch region suggestions
        const fetchRegionSuggestions = async () =>{
            try{
                const responseRegion = await axios.get('http://localhost:8080/api/master/allRegion');
                setRegionSuggestions(responseRegion.data);
                console.log(responseRegion.data);
            }catch(error){
                console.error('Error fetching region data:', error);
            }
         };
         fetchRegionSuggestions();

    }, []);


    const handleExecutiveCodeInputChange = (e) =>{
        const executiveCodeValue = e.target.value;
        setExecutiveCode(executiveCodeValue);

        if(executiveCodeValue.trim() !== ''){
            const filteredSuggestions = executiveSuggestions.filter((executive) => executive.executiveCode.toLowerCase().includes(executiveCodeValue.toLowerCase()));
            setFilteredExecutiveCodeSuggestions(filteredSuggestions);
        }else{
            setFilteredExecutiveCodeSuggestions([]);
        }
    };


    const handleExecutiveNameInputChange = (e) =>{
        const executiveNameValue = e.target.value;
        setExecutiveMaster(executiveNameValue);

        if(executiveNameValue.trim() !== ''){
            const filteredSuggestions = executiveSuggestions.filter((executive) => executive.executiveMaster.toLowerCase().includes(executiveNameValue.toLowerCase()));
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


    const handleRegionCodeInputChange = (e) => {
        const regionCodeValue = e.target.value;
        setRegionCode(regionCodeValue);

        if(regionCodeValue.trim() !== ''){
            const filteredSuggestions = regionSuggestions.filter((region) => region.regionMasterId.toLowerCase().includes(regionCodeValue.toLowerCase()));
            setFilteredRegionCodeSuggestions(filteredSuggestions);
        }else{
            setFilteredRegionCodeSuggestions([]);
        }
    };


    const handleRegionMasterInputChange = (e) => {
        const regionMasterValue = e.target.value;
        setRegionMaster(regionMasterValue);


        if(regionMasterValue.trim() !== ''){
            const filteredSuggestions = regionSuggestions.filter((region) => region.regionName.toLowerCase().includes(regionMasterValue.toLowerCase()));
            setFilteredRegionMasterSuggestions(filteredSuggestions);
        }else{
            setFilteredRegionMasterSuggestions([]);
        }
    };


    const selectRegion = (region) => {
        setRegionCode(region.regionMasterId);
        setRegionMaster(region.regionName);
        setFilteredRegionCodeSuggestions([]);
        setFilteredRegionMasterSuggestions([]);
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


    const handleKeyDown = (event) => {
        const {keyCode, target} = event;

        if(keyCode === 13){      //Enter Key
            event.preventDefault();    //prevent form submission
            const currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            if(currentInputIndex === Object.keys(inputRefs.current).length - 2){
                acceptButtonRef.current.focus();
            }else{
                const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
                nextInputRef.focus();
            }
        }else if(keyCode === 27){
            let currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
            let prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
            prevInputRef.focus();
        }
    }

  return (
    <div className='w-1/2 border h-[100vh]'>

        <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[190px]'>Distributor Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
                <Link to={"/list"}><IoClose /></Link>
            </span>
        </div>

        <div className='w-[550px] h-[45vh] border border-gray-500 ml-[750px]'>


            <form>
                

            <div className='input-ldgr  mr-4 mt-3   '  >
            <label htmlFor="distributorCode" className='text-sm mr-[79px] ml-2'>Distributor Code</label>
            : <input type="text" id='distributorCode' name='distributorCode' value={distributorCode} onChange={(e) => setDistributorCode(e.target.value)} onKeyDown={handleKeyDown}  ref={(input) => {distributorCodeRef.current = input; inputRefs.current.distributorCode = input; }}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            {errors.distributorCode && <p className='text-red-500 text-xs ml-2'>{errors.distributorCode}</p>}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="distributorCompanyName" className='text-sm mr-[13px] ml-2'>Distributor Company Name</label>
                : <input type="text" id='distributorCompanyName' name='distributorCompanyName' value={distributorCompanyName} onChange={(e) => setDistributorCompanyName(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.distributorCompanyName = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="distributorOwnerName" className='text-sm  mr-[31px] ml-2'>Distributor Owner Name</label>
                : <input type="text" id='distributorOwnerName' name='distributorOwnerName' value={distributorOwnerName} onChange={(e) => setDistributorOwnerName(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.distributorOwnerName = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="mobileNo" className='text-sm  mr-[118px] ml-2'>Mobile No</label>
                : <input type="text" id='mobileNo' name='mobileNo' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.mobileNo = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="executiveCode" className='text-sm  mr-[84px] ml-2'>Executive Code</label>
                : <input type="text" id='executiveCode' name='executiveCode' value={executiveCode} onChange={(e) => {handleExecutiveCodeInputChange(e); setExecutiveCode(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredExecutiveCodeSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{position: 'absolute',top: '41px',left: '1028px'}}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Executive Codes</p>
                        </div>
                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                            {filteredExecutiveCodeSuggestions.map((executive, index) =>(
                                <li key={index} tabIndex={0} onClick={() => selectExecutive(executive)} onKeyDown={(e) => e.key === 'Enter' && selectExecutive(executive)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                    {executive.executiveCode.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="executiveMaster" className='text-sm  mr-[75px] ml-2'>Executive Master</label>
                : <input type="text" id='executiveMaster' name='executiveMaster' value={executiveMaster} onChange={(e) => {handleExecutiveNameInputChange(e); setExecutiveMaster(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveMaster = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredExecutiveMasterSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{position: 'absolute', top: '40px', left: '1028px'}}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Executive Masters</p>
                        </div>

                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                            {filteredExecutiveMasterSuggestions.map((executive, index) =>(
                                <li key={index} tabIndex={0} onClick={() => selectExecutive(executive)} onKeyDown={(e) => e.key === 'Enter' && selectExecutive(executive)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                    {executive.executiveMaster.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="regionCode" className='text-sm  mr-[101px] ml-2'>Region Code</label>
                : <input type="text" id='regionCode' name='regionCode' value={regionCode} onChange={(e) => {handleRegionCodeInputChange(e); setRegionCode(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredRegionCodeSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{position: 'absolute',top: '41px',left: '1028px'}}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Region Codes</p>
                        </div>

                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                            {filteredRegionCodeSuggestions.map((region, index) => (
                                <li key={index} tabIndex={0} onClick={() => selectRegion(region)} onKeyDown={(e) => e.key === 'Enter' && selectRegion(region)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                    {region.regionMasterId.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="regionMaster" className='text-sm  mr-[92px] ml-2'>Region Master</label>
                : <input type="text" id='regionMaster' name='regionMaster' value={regionMaster} onChange={(e) => {handleRegionMasterInputChange(e); setRegionMaster(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionMaster = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredRegionMasterSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[25%] h-[85vh] border border-gray-500' style={{position: 'absolute', top: '70px', left: '1000px'}}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Region Masters</p>
                        </div>

                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                            {filteredRegionMasterSuggestions.map((region, index) => (
                                <li key={index} tabIndex={0} onClick={() => selectRegion(region)} onKeyDown={(e) => e.key === 'Enter' && selectRegion(region)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                    {region.regionName.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="contactPersonName" className='text-sm  mr-[46px] ml-2'>Contact Person Name</label>
                : <input type="text" id='contactPersonName' name='contactPersonName' value={contactPersonName} onChange={(e) => setContactPersonName(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.contactPersonName = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="contactMobileNo" className='text-sm  mr-[67px] ml-2'>Contact Mobile No</label>
                : <input type="text" id='contactMobileNo' name='contactMobileNo' value={contactMobileNo} onChange={(e) => setContactMobileNo(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.contactMobileNo = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            </div>

            <div className='mt-[250px] '>
                <button type='submit' ref={(button) => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} id='acceptButton' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onClick={saveDsitributorMaster}   >A: Accept</button>
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