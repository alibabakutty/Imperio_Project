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
    const [executiveSuggestions, setExecutiveSuggestions] = useState([]);
    const [regionSuggestions, setRegionSuggestions] = useState([]);
    const [ledgerSuggestions, setLedgerSugestions] = useState([]);
    const [filteredExecutiveSuggestions, setFilteredExecutiveSuggestions] = useState([]);
    const [filteredRegionSuggestions, setFilteredRegionSuggestions] = useState([]);
    const [filteredLedgerSuggestions, setFilteredLedgerSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAllLedgerSuggestions, setShowAllLedgerSuggestions] = useState(false);
    const [showAllRegionSuggestions, setShowAllRegionSuggestions] = useState(false);

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
        acceptButton: null,
    });

    const distributorCodeRef = useRef(null);
    const acceptButtonRef = useRef(null);
    const yesQuitButtonRef = useRef(null);
    const cancelModalConfirmRef = useRef(null);

    const navigator = useNavigate();

    useEffect(() => {
        if (distributorCodeRef.current) {
            distributorCodeRef.current.focus();
        }

        const fetchExecutiveSuggestions = async () => {
            try {
                const responseExecutive = await axios.get('http://localhost:8080/api/master/allExecutive');
                setExecutiveSuggestions(responseExecutive.data);
            } catch (error) {
                console.error('Error fetching executive data:', error);
            }
        };

        fetchExecutiveSuggestions();

        const fetchRegionSuggestions = async () => {
            try {
                const responseRegion = await axios.get('http://localhost:8080/api/master/allRegion');
                setRegionSuggestions(responseRegion.data);
                setLedgerSugestions(responseRegion.data);
                console.log(responseRegion.data);
            } catch (error) {
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
                saveDsitributorMaster(event);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', handleCtrlA);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', handleCtrlA);
        };
    }, [navigator]);

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
        setExecutiveCode(executiveValue);

        if(executiveValue.trim() !== ''){
            const filteredExecutiveSuggestions = executiveSuggestions.filter((executive) => executive.executiveCode.toLowerCase().includes(executiveValue.toLowerCase()) );
            setFilteredExecutiveSuggestions(filteredExecutiveSuggestions);

            const exactMatch = executiveSuggestions.find((executive) => executive.executiveCode.toLowerCase() === executiveValue.toLowerCase());


            if(exactMatch){
                setExecutiveMaster(exactMatch.executiveMaster);
            }
        }else{
            setFilteredExecutiveSuggestions([]);
            setExecutiveMaster('');
        }
    };

    

    
    const selectExecutive = (executive) => {
        setExecutiveCode(executive.executiveCode);
        setExecutiveMaster(executive.executiveMaster);
        setFilteredExecutiveSuggestions([]);
    };
    

    const handleRegionInputChange = (e) => {
        const regionValue = e.target.value;
        setRegionCode(regionValue);

        if(regionValue.trim() !== ''){
            const filteredSuggestions = regionSuggestions.filter((region) => region.regionMasterId.toLowerCase().includes(regionValue.toLowerCase()));
            setFilteredRegionSuggestions(filteredSuggestions);

            const exactMatch = regionSuggestions.find((region) => region.regionMasterId.toLowerCase() === regionValue.toLowerCase());

            if(exactMatch){
                setRegionMaster(exactMatch.regionMaster);
            }
        }else{
            setFilteredRegionSuggestions([]);
            setRegionMaster('');
        }
    };

    
    const selectRegion = (region) =>{
        setRegionCode(region.regionMasterId);
        setRegionMaster(region.regionName);
        setFilteredRegionSuggestions([]);
    }


    const handleDistributorChange = (e) => {
        const ledgerValue = e.target.value;
        setDistributorCode(ledgerValue);

        if(ledgerValue.trim() !== ''){
            const filteredSuggestions = ledgerSuggestions.filter((ledger) => ledger.ledgerCode.toLowerCase().includes(ledgerValue.toLowerCase()));
            setFilteredLedgerSuggestions(filteredSuggestions);

            const exactMatch = ledgerSuggestions.find((ledger) => ledger.ledgerCode.toLowerCase() === ledgerValue.toLowerCase());

            if(exactMatch){
                setDistributorCode(exactMatch.distributorCompanyName);
            }
        }else{
            setFilteredLedgerSuggestions([]);
            setDistributorCompanyName('');
        }

    }

    const selectLedger = (ledger) => {
        setDistributorCode(ledger.ledgerCode);
        setDistributorCompanyName(ledger.ledgerName);
        setFilteredLedgerSuggestions([]);
    }

    

    const validateForm = () => {
        const newErrors = {};
        if (!distributorCode.trim()) {
            newErrors.distributorCode = 'Distributor Code is required!';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    function saveDsitributorMaster(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const distributor = {
            distributorCode,
            distributorCompanyName,
            distributorOwnerName,
            mobileNo,
            executiveCode,
            executiveMaster,
            regionCode,
            regionMaster,
            contactPersonName,
            contactMobileNo,
        };

        createNewDistributorMaster(distributor)
            .then((response) => {
                console.log(response.data);
                navigator('/addedDistributor');
            })
            .catch((error) => {
                console.error('Error catching distributor master:', error);
            });
    }

    const handleKeyDown = (event) => {
        const { keyCode, target } = event;

        if (keyCode === 13) {
            event.preventDefault();

            const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);

            if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
                acceptButtonRef.current.focus();
            } else {
                const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
                nextInputRef.focus();
            }
        } else if (keyCode === 27) {
            setShowModal(true);
        } else if (keyCode === 8 && target.value === '') {
            event.preventDefault();

            const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key ===  target.id);
            const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
            prevInputRef.focus();
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
      };
    
      const handleModalConfirm = () => {
        navigator('/list');
      };

      const toggleShowAllLedgerSuggestions = () => {
        setShowAllLedgerSuggestions((prevShowAll) => !prevShowAll);
    };

    const toggleShowAllRegionSuggestions = () => {
        setShowAllRegionSuggestions((prevShowAll) => !prevShowAll);
    };

    // const handleDropdownChange = (e) => {
    //     const selectedRegionId = e.target.value;
    //     navigator(`/displayRegion/${selectedRegionId}`);
    // };


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
            : <input type="text" id='distributorCode' name='distributorCode' value={distributorCode} onChange={(e) => {handleDistributorChange(e); setDistributorCode(e.target.value);}} onKeyDown={handleKeyDown}  ref={(input) => {distributorCodeRef.current = input; inputRefs.current.distributorCode = input; }}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
            {errors.distributorCode && <p className='text-red-500 text-xs ml-2'>{errors.distributorCode}</p>}

            {filteredLedgerSuggestions.length > 0 && (
                <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '40px', left: '1028px' }}>
                    <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                        <p>List Of Executive Master</p>
                    </div>

                    <div className='suggestions-dropdown'>
                    <ul className='suggestions w-full h-[50vh] text-center mt-2'>
                        {filteredLedgerSuggestions.slice(0, showAllLedgerSuggestions ? undefined : 15).map((ledger) => (
                            <li key={ledger.ledgerCode} tabIndex={0} onClick={() => selectLedger(ledger)} onKeyDown={(e) => e.key === 'Enter' && selectLedger(ledger)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                {ledger.ledgerCode.toUpperCase()} - {ledger.ledgerName.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                    {filteredLedgerSuggestions.length > 15 && !showAllLedgerSuggestions && (
                        <div className='text-center'>
                            <button tabIndex={0} onClick={toggleShowAllLedgerSuggestions} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>Show all</button>
                        </div>
                        
                    )}
                </div>
                </div>
            )}

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
                : <input type="text" id='executiveCode' name='executiveCode' value={executiveCode} onChange={(e) => {handleExecutiveInputChange(e); setExecutiveCode(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />


                {filteredExecutiveSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '40px', left: '1028px' }}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Executive Master</p>
                        </div>

                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                            {filteredExecutiveSuggestions.map((executive, index) => (
                                <li key={index} tabIndex={0} onClick={() => selectExecutive(executive)} onKeyDown={(e) => e.key === 'Enter' && selectExecutive(executive)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                    {executive.executiveCode.toUpperCase()} - {executive.executiveMaster.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="executiveMaster" className='text-sm  mr-[75px] ml-2'>Executive Master</label>
                : <input type="text" id='executiveMaster' name='executiveMaster' value={executiveMaster} onChange={(e) => { setExecutiveMaster(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveMaster = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                
            </div>

            <div className='input-ldgr    '  >
                <label htmlFor="regionCode" className='text-sm  mr-[101px] ml-2'>Region Code</label>
                : <input type="text" id='regionCode' name='regionCode' value={regionCode} onChange={(e) => {handleRegionInputChange(e); setRegionCode(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                {filteredRegionSuggestions.length > 0 && (
                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '40px', left: '1028px' }}>
                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                            <p>List Of Region Master</p>
                        </div>

                        <div className='suggestions-dropdown'>
                            <ul className='suggestions w-full h-[50vh] text-center mt-2'>
                                {filteredRegionSuggestions.slice(0, showAllRegionSuggestions ? undefined : 15).map((region) => (
                                    <li key={region.regionCode} tabIndex={0} onClick={() => selectRegion(region)} onKeyDown={(e) => e.key === 'Enter' && selectRegion(region)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
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

            <div className='input-ldgr    '  >
                <label htmlFor="regionMaster" className='text-sm  mr-[92px] ml-2'>Region Master</label>
                : <input type="text" id='regionMaster' name='regionMaster' value={regionMaster} onChange={(e) => {handleRegionInputChange(e); setRegionMaster(e.target.value)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionMaster = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />

                
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


            <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Q: Quit</Link>

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

export default DistributorMaster