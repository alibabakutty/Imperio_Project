import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { createNewRegionMaster } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegionMaster = () => {

  const [ledgerCode, setLedgerCode] = useState('');
  const [ledgerName, setLedgerName] = useState('');
  const [regionMasterId, setRegionMasterId] = useState('');
  const [regionName, setRegionName] = useState('');
  const [regionState, setRegionState] = useState('');
  const [country, setCountry] = useState('');
  const [godownCode, setGodownCode] = useState('');
  const [godownName, setGodownName] = useState('');

  const [errors, setErrors] = useState({});
  const [godownSuggestions, setGodownSuggestions] = useState([]);
  const [filteredGodownCodeSuggestions, setFilteredGodownCodeSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // const [selectedIndex, setSelectedIndex] = useState(0);
  

  const inputRefs = useRef({
    ledgerCode: null,
    ledgerName: null,
    regionMasterId: null,
    regionName: null,
    regionState: null,
    country: null,
    godownCode: null,
    godownName: null,
    acceptButton: null,
  });

  const ledgerCodeRef = useRef(null);
  const acceptButtonRef = useRef(null);
  const yesQuitButtonRef = useRef(null);
  const cancelModalConfirmRef = useRef(null);
  const navigate = useNavigate();
  // const dropdownRef = useRef(null);

  useEffect(() => {
    if (ledgerCodeRef.current) {
      ledgerCodeRef.current.focus();
    }

    const fetchGodownSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/master/allGodown');
        setGodownSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching godown data:', error);
      }
    };

    fetchGodownSuggestions();

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
      };

      document.addEventListener('keydown', handleModalKeyDown);

      return() => {
        document.removeEventListener('keydown', handleModalKeyDown);
      }
    };


  }, [showModal]);

  

  const handleKeyDown = (event) => {
    const { keyCode, target } = event;

    if (keyCode === 13) {
      event.preventDefault();
      const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
      );
      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
        acceptButtonRef.current.focus();
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
      }
    } else if (keyCode === 27) {
      setShowModal(true);
    } else if (keyCode === 8 && target.value === '') {
      const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
      );
      const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
      const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
      prevInputRef.focus();
    }
  };

  const handleGodownCodeInputChange = (e) => {
    const value = e.target.value;
    setGodownCode(value);

    if (value.trim() !== '') {
      const filteredSuggestions = godownSuggestions.filter((godown) =>
        godown.godownCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGodownCodeSuggestions(filteredSuggestions);

      const exactMatch = godownSuggestions.find((godown) =>
        godown.godownCode.toLowerCase() === value.toLowerCase()
      );
      if (exactMatch) {
        setGodownName(exactMatch.godownName);
      }
    } else {
      setFilteredGodownCodeSuggestions([]);
      setGodownName('');
    }
  };

  
  const selectGodown = (godown) => {
    setGodownCode(godown.godownCode);
    setGodownName(godown.godownName);
    setFilteredGodownCodeSuggestions([]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ledgerCode.trim()) {
      newErrors.ledgerCode = 'Ledger Code is required.';
    }
    if (!regionMasterId.trim()) {
      newErrors.regionMasterId = 'Region Master Id is required.';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveRegionMaster = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const region = { ledgerCode, ledgerName, regionMasterId, regionName, regionState, country, godownCode, godownName };

    console.log(region);

    createNewRegionMaster(region).then((response) => {
      console.log(response.data);
      navigate('/addedRegion');
    }).catch((error) => {
      console.error('Error creating region master:', error);
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    navigate('/list');
  };


  return (
    <div className='w-1/2 border h-[100vh]'>
      <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
        <h2 className='ml-[200px]'>Region Master</h2>
        <span className='cursor-pointer mt-[5px] mr-2'>
          <Link to={"/list"} ><IoClose /></Link>
        </span>
      </div>

      <div className='w-[550px] h-[40vh] border border-gray-500 ml-[750px]'>

        <form onSubmit={saveRegionMaster}>

          <div className='input-ldgr mt-3'>
            <label htmlFor="ledgerCode" className='text-sm mr-[73px] ml-2'>Ledger Code</label>
            : <input
                type="text"
                id='ledgerCode'
                name='ledgerCode'
                value={ledgerCode}
                onChange={(e) => setLedgerCode(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => { ledgerCodeRef.current = input; inputRefs.current.ledgerCode = input; }}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
              {errors.ledgerCode && <p className='text-red-500 text-xs ml-2'>{errors.ledgerCode}</p>}
          </div>

          <div className='input-ldgr'>
            <label htmlFor="ledgerName" className='text-sm mr-[70px] ml-2'>Ledger Name</label>
            : <input
                type="text"
                id='ledgerName'
                name='ledgerName'
                value={ledgerName}
                onChange={(e) => setLedgerName(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.ledgerName = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          <div className='input-ldgr'>
            <label htmlFor="regionMasterId" className='text-sm mr-12 ml-2'>Region Master ID</label>
            : <input
                type="text"
                id='regionMasterId'
                name='regionMasterId'
                value={regionMasterId}
                onChange={(e) => setRegionMasterId(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.regionMasterId = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
              {errors.regionMasterId && <p className='text-red-500 text-xs ml-2'>{errors.regionMasterId}</p>}
          </div>

          <div className='input-ldgr'>
            <label htmlFor="regionName" className='text-sm mr-[71px] ml-2'>Region Name</label>
            : <input
                type="text"
                id='regionName'
                name='regionName'
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.regionName = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          <div className='input-ldgr'>
            <label htmlFor="regionState" className='text-sm mr-[76px] ml-2'>Region State</label>
            : <input
                type="text"
                id='regionState'
                name='regionState'
                value={regionState}
                onChange={(e) => setRegionState(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.regionState = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          <div className='input-ldgr'>
            <label htmlFor="country" className='text-sm mr-[106px] ml-2'>Country</label>
            : <input
                type="text"
                id='country'
                name='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.country = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          <div className='input-ldgr'>
            <label htmlFor="godownCode" className='text-sm mr-[66px] ml-2'>Godown Code</label>
            : <input
                type="text"
                id='godownCode'
                name='godownCode'
                value={godownCode}
                onChange={(e) => { handleGodownCodeInputChange(e); setGodownCode(e.target.value) }}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.godownCode = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />

              {filteredGodownCodeSuggestions.length > 0 && (
                <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '40px', left: '1028px' }}>
                  <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                    <p>List Of Godown Codes</p>
                  </div>
                  <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                    {filteredGodownCodeSuggestions.map((godown, index) => (
                      <li key={index} tabIndex={0} onClick={() => selectGodown(godown)} onKeyDown={(e) => e.key === 'Enter' && selectGodown(godown)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                        {godown.godownCode.toUpperCase()} - {godown.godownName.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

          </div>

          <div className='input-ldgr'>
            <label htmlFor="godownName" className='text-sm mr-[64px] ml-2'>Godown Name</label>
            : <input
                type="text"
                id='godownName'
                name='godownName'
                value={godownName}
                onChange={(e) => { setGodownName(e.target.value) }}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.godownName = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
              
          </div>

          <div className='mt-[280px]'>
            <button
              type='submit'
              ref={(button) => { acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }}
              className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
              id='accptButton'
            >A: Accept</button>
          </div>

        </form>

      </div>

      <div className='mt-[250px] ml-[495px]'>
        <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800' >Q: Quit</Link>
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
                  onClick={handleModalConfirm}
                  ref={yesQuitButtonRef}
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
  );
};

export default RegionMaster;
