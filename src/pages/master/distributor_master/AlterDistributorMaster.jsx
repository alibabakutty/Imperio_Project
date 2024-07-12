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

    
    const acceptButtonRef = useRef(null);
    const yesQuitButtonRef = useRef(null);
    const cancelModalConfirmRef = useRef(null);
    const suggestionExecutiveRef = useRef([]);
    const suggestionRegionRef = useRef([]);

    const [showModal, setShowModal] = useState(false);
    const [executiveSuggestions, setExecutiveSuggestions] = useState([]);
    const [regionSuggestions, setRegionSuggestions] = useState([]);
    const [filteredExecutiveSuggestions, setFilteredExecutiveSuggestions] = useState([]);
    const [filteredRegionSuggestions, setFilteredRegionSuggestions] = useState([]);
    const [executiveFocused, setExecutiveFocused] = useState(false);
    const [regionFocused, setRegionFocused] = useState(false);
    const [highlightedExecutiveIndex, setHighlightedExecutiveIndex] = useState(0);
    const [highlightedRegionIndex, setHighlightedRegionIndex] = useState(0);
    const [showOtherRegionDropdown, setShowOtherRegionDropdown] = useState(0);


    const pulseCursor = (input) => {
      const value = input.value;
      if (value) {
        input.value = '';
        setTimeout(() => {
          input.value = value.charAt(0).toUpperCase() + value.slice(1);
          input.setSelectionRange(0, 0);
        }, 0);
      }
    };

    const onInputChange = (e) => {
        const {name, value} = e.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setDistributor({ ...distributor, [name]: capitalizedValue });
    };


    const onSubmit = async (e) => {
      e.preventDefault();

      await axios.put(`http://localhost:9080/distributorMasterApi/alterDistributorMaster/${distributorCode}`, distributor);

      // navigate("/alteredDistributor");
    };

    useEffect(() => {
        
      if(inputRefs.current.distributorCode){
        inputRefs.current.distributorCode.focus();
        pulseCursor(inputRefs.current.distributorCode);
      }
        
        loadDistributor();

        const fetchExecutiveSuggestions = async () => {
          try{
            const responseExecutive = await axios.get('http://localhost:9080/executiveMasterApi/allExecutives');
            setExecutiveSuggestions(responseExecutive.data);
          }catch (error){
            console.error('Error fetching executive data:', error);
          }
        };

        fetchExecutiveSuggestions();

        const fetchRegionSuggestions = async () => {
          try{
            const responseRegion = await axios.get('http://localhost:9080/regionMasterApi/allRegions');
            setRegionSuggestions(responseRegion.data);
          }catch (error){
            console.error('Error fetching region data:', error);
          }
        };

        fetchRegionSuggestions();

        const handleKeyDown = (event) => {
            const { ctrlKey, key } = event;
            if ((ctrlKey && key === 'q') || key === 'Escape') {
              event.preventDefault();
              setShowModal(true);
            }
          };
      
          const handleCtrlA = (event) => {
            if (event.ctrlKey && event.key === 'a') {
              event.preventDefault();
              acceptButtonRef.current.click();
              saveRegionMaster(event);
            }
          };
      
          document.addEventListener('keydown', handleKeyDown);
          document.addEventListener('keydown', handleCtrlA);
      
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', handleCtrlA);
          };

    }, [navigate]);


    useEffect(() => {

      if(showModal){
        yesQuitButtonRef.current.focus();
        const handleModalKeyDown = (event) => {
          if(event.key.toLowerCase() === 'y'){
            handleModalConfirm();
          }else if(event.key === 'n'){
            handleModalClose();
          }else if(event.key === 'ArrowLeft'){
            cancelModalConfirmRef.current.focus();
          }else if(event.key === 'ArrowRight'){
            yesQuitButtonRef.current.focus();
          }
        }
  
        document.addEventListener('keydown', handleModalKeyDown);
  
        return() => {
          document.removeEventListener('keydown', handleModalKeyDown);
        }
      };
  
  
    }, [showModal]);


    const handleExecutiveInputChange = (e) => {
      const executiveValue = e.target.value;
      setDistributor((prevState) => ({
        ...prevState,
        executiveCode: executiveValue,
        executiveMaster: ''
      }));
  
      if (executiveValue.trim() !== '') {
        const filtered = executiveSuggestions.filter((executive) =>
          executive.executiveCode.toLowerCase().includes(executiveValue.toLowerCase())
        );
        setFilteredExecutiveSuggestions(filtered);
  
        const exactMatch = executiveSuggestions.find((executive) =>
          executive.executiveCode.toLowerCase() === executiveValue.toLowerCase()
        );
  
        if (exactMatch) {
          setDistributor((prevState) => ({
            ...prevState,
            executiveMaster: exactMatch.executiveMaster
          }));
        }
      } else {
        setFilteredExecutiveSuggestions([]);
      }
    };


    const selectExecutive = (executive) => {
      setDistributor((prevState) => ({
        ...prevState,
        executiveCode: executive.executiveCode,
        executiveMaster: executive.executiveMaster
      }));
      setFilteredExecutiveSuggestions([]);
    };


    const handleRegionInputChange = (e) => {
      const regionValue = e.target.value;
      setDistributor((prevState) => ({
        ...prevState,
        regionCode: regionValue,
        regionMaster: ''
      }));
  
      if (regionValue.trim() !== '') {
        const filtered = regionSuggestions.filter((region) =>
          region.regionMasterId.toLowerCase().includes(regionValue.toLowerCase())
        );
        setFilteredRegionSuggestions(filtered);
  
        const exactMatch = regionSuggestions.find((region) =>
          region.regionMasterId.toLowerCase() === regionValue.toLowerCase()
        );
  
        if (exactMatch) {
          setDistributor((prevState) => ({
            ...prevState,
            regionMaster: exactMatch.regionMaster
          }));
        }
      } else {
        setFilteredRegionSuggestions([]);
      }
    };
  
    const selectRegion = (region) => {
      setDistributor((prevState) => ({
        ...prevState,
        regionCode: region.regionMasterId,
        regionMaster: region.regionName
      }));
      setFilteredRegionSuggestions([]);
    };

    const handleKeyDown = (event) => {
      const { keyCode, target } = event;
      const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);

      if (keyCode === 13) { // Enter key
        event.preventDefault();

        if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
          acceptButtonRef.current.focus();
        } else {
          const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
          nextInputRef.focus();
          pulseCursor(nextInputRef);
        }
      } else if (keyCode === 27) { // Escape key
        event.preventDefault();
        setShowModal(true);
      } else if (keyCode === 8 && target.id !== 'distributorCode') { // Backspace key
        const isEmptyOrZero = target.value.trim() === '' || (target.value === '0');
        if (isEmptyOrZero) {
          event.preventDefault();
          const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
          const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
          prevInputRef.focus();
          pulseCursor(prevInputRef); // Call pulseCursor for the previous input field
        } else if (target.selectionStart === 0 && target.selectionEnd === 0) {
          event.preventDefault();
          const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
          const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
          prevInputRef.focus();
          pulseCursor(prevInputRef); // Call pulseCursor for the previous input field
        }
      } else if(keyCode === 46){
        event.preventDefault();
        setDistributor({ ...distributor, [target.name]: '' });
      }
    };

    const loadDistributor = async () => {
        try{
            const result = await axios.get(`http://localhost:9080/distributorMasterApi/displayDistributor/${distributorCode}`);
            setDistributor(result.data);
        }catch(error){
            console.error("Error fetching the executive data",error);
        }
    };


    const handleModalClose = () => {
        setShowModal(false);

        if(inputRefs.current.distributorCode){
          inputRefs.current.distributorCode.focus();
          pulseCursor(inputRefs.current.distributorCode);
        }
      };
    
      const handleModalConfirm = () => {
        navigate('/distributorAlter');
      };

      const handleExecutiveFocus = (e) => {
        const {id} = e.target;
        if(id === 'executiveCode'){
          setExecutiveFocused(true);
          setFilteredExecutiveSuggestions(executiveSuggestions);

        }else{
          setExecutiveFocused(false);
          setFilteredExecutiveSuggestions([]);
        }
      };

      const handleRegionFocus = (e) => {
        const {id} = e.target;
        if(id === 'regionCode'){
          setRegionFocused(true);
          setFilteredRegionSuggestions(regionSuggestions.slice(0,25));
        }else{
          setRegionFocused(false);
          setFilteredRegionSuggestions([]);
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
                                : <input type="text" id='distributorCode' name='distributorCode' value={distributor.distributorCode} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => { inputRefs.current.distributorCode = input; }} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' /> 
                            </div>

                            <div className='input-ldgr mt-1'>
                                <label htmlFor="distributorCompanyName" className='text-sm mr-[20px] ml-2'>Distributor Company Name</label>
                                : <input type="text" id='distributorCompanyName' name='distributorCompanyName' value={distributor.distributorCompanyName} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.distributorCompanyName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="distributorOwnerName" className='text-sm mr-[38px] ml-2'>Distributor Owner Name</label>
                                : <input type="text" id='distributorOwnerName' name='distributorOwnerName' value={distributor.distributorOwnerName} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.distributorOwnerName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="mobileNo" className='text-sm mr-[125px] ml-2'>Mobile No</label>
                                : <input type="text" id='mobileNo' name='mobileNo' value={distributor.mobileNo} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.mobileNo = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="executiveCode" className='text-sm mr-[92px] ml-2'>Executive Code</label>
                                : <input type="text" id='executiveCode' name='executiveCode' value={distributor.executiveCode} onChange={(e) => {onInputChange(e); handleExecutiveInputChange(e); }} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            
                                {filteredExecutiveSuggestions.length > 0 && (
                                  <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '70px', left: '1028px' }}>
                                      <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                                          <p>List Of Executive Master</p>
                                      </div>

                                      <ul className='suggestions w-full h-[20vh] text-left mt-2'>
                                          {filteredExecutiveSuggestions.map((executive, index) => (
                                              <li key={index} tabIndex={0} onClick={() => selectExecutive(executive)} onKeyDown={(e) => e.key === 'Enter' && selectExecutive(executive)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px] pl-2'>
                                                  {executive.executiveCode.toUpperCase()} - {executive.executiveMaster.toUpperCase()}
                                              </li>
                                          ))}
                                      </ul>
                                    </div>
                                  )}

                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="executiveMaster" className='text-sm mr-[82px] ml-2'>Executive Master</label>
                                : <input type="text" id='executiveMaster' name='executiveMaster' value={distributor.executiveMaster} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveMaster = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="regionCode" className='text-sm mr-[108px] ml-2'>Region Code</label>
                                : <input type="text" id='regionCode' name='regionCode' value={distributor.regionCode} onChange={(e) => {onInputChange(e); handleRegionInputChange(e); }} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                  
                                {filteredRegionSuggestions.length > 0 && (
                                  <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '70px', left: '1028px' }}>
                                      <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                                          <p>List Of Region Master</p>
                                      </div>

                                      <div className='suggestions-dropdown'>
                                          <ul className='suggestions w-full h-[50vh] text-left mt-2'>
                                              {filteredRegionSuggestions.slice(0, showAllRegionSuggestions ? undefined : 15).map((region) => (
                                                  <li key={region.regionCode} tabIndex={0} onClick={() => selectRegion(region)} onKeyDown={(e) => e.key === 'Enter' && selectRegion(region)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px] pl-2'>
                                                      {region.regionMasterId.toUpperCase()} - {region.regionName.toUpperCase()}
                                                  </li>
                                              ))}
                                              
                                          </ul>

                                          {filteredRegionSuggestions.length > 15 && !showAllRegionSuggestions && (
                                              <div className='text-center'>
                                                  <button onClick={toggleShowAllRegionSuggestions} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>Show All</button>
                                              </div>
                                              
                                          )}
                                      </div>
                                  </div>
                                )}    
                            
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="regionMaster" className='text-sm mr-[99px] ml-2'>Region Master</label>
                                : <input type="text" id='regionMaster' name='regionMaster' value={distributor.regionMaster} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionMaster = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="contactPersonName" className='text-sm mr-[53px] ml-2'>Contact Person Name</label>
                                : <input type="text" id='contactPersonName' name='contactPersonName' value={distributor.contactPersonName} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.contactPersonName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="contactMobileNo" className='text-sm mr-[75px] ml-2'>Contact Mobile No</label>
                                : <input type="text" id='contactMobileNo' name='contactMobileNo' value={distributor.contactMobileNo} onChange={onInputChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.contactMobileNo = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div className='mt-[261px]'>
                                {/* <button type='submit' id='acceptButton' ref={(button) => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button}} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'   >A: Accept</button> */}
                                <input type="button" id='acceptButton' onKeyDown={(e) => {if(e.key === 'Backspace'){e.preventDefault(); if(inputRefs.current.contactMobileNo && inputRefs.current.contactMobileNo.focus){inputRefs.current.contactMobileNo.focus(); }}}} value={"A: Accept"} ref={(button) => {acceptButtonRef.current = button; }} onClick={(e) => {onSubmit(e)}} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800 ml-[100px]' />
                            </div>  
                        </form>
                        
                    </div>

                    <div className='mt-[245px] ml-[480px]'>
                    <Link to={"/distributorFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Q: Quit</Link>
                </div>

                    

                </div>
                
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Quit Confirmation
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to quit without saving changes?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        ref={yesQuitButtonRef}
                        onClick={handleModalConfirm}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Yes, Quit
                      </button>
                      <button
                        type="button"
                        ref={cancelModalConfirmRef}
                        onClick={handleModalClose}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


    </div>
  )
}

export default AlterDistributorMaster