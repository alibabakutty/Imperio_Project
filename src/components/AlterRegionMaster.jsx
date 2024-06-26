import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AlterRegionMaster = () => {
  const { regionMasterId } = useParams();
  const navigate = useNavigate();

  const [region, setRegion] = useState({
    ledgerCode: "",
    ledgerName: "",
    regionMasterId: "",
    regionName: "",
    regionState: "",
    country: "",
    godownCode: "",
    godownName: ""
  });

  const [godownSuggestions, setGodownSuggestions] = useState([]);
  const [filteredGodownSuggestions, setFilteredGodownSuggestions] = useState([]);
  const [godownCode, setGodownCode] = useState('');
  const [godownName, setGodownName] = useState('');

  const inputRefs = useRef({});
  const acceptButtonRef = useRef(null);
  const yesQuitButtonRef = useRef(null);
  const cancelModalConfirmRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

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
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setRegion({ ...region, [name]: capitalizedValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/master/alterRegionMaster/${regionMasterId}`, region);
      navigate("/alteredRegion");
    } catch (error) {
      console.error('Error updating region:', error);
      // Implement error handling here
    }
  };

  const fetchGodownSuggestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/master/allGodown');
      setGodownSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching godown data:', error);
    }
  };

  const loadRegion = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/master/displayRegion/${regionMasterId}`);
      setRegion(result.data);
      setGodownCode(result.data.godownCode); // Set initial godownCode
      setGodownName(result.data.godownName); // Set initial godownName
    } catch (error) {
      console.error("Error fetching the region data", error);
    }
  };

  useEffect(() => {
    fetchGodownSuggestions();
    loadRegion();

    // Focus on ledgerCode input and pulse cursor
    if (inputRefs.current.ledgerCode) {
      inputRefs.current.ledgerCode.focus();
      pulseCursor(inputRefs.current.ledgerCode);
    }

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
        onSubmit(event);
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
    if (showModal) {
      yesQuitButtonRef.current.focus();
      const handleModalKeyDown = (event) => {
        if (event.key.toLowerCase() === 'y') {
          handleModalConfirm();
        } else if (event.key === 'n') {
          handleModalClose();
        } else if (event.key === 'ArrowLeft') {
          cancelModalConfirmRef.current.focus();
        } else if (event.key === 'ArrowRight') {
          yesQuitButtonRef.current.focus();
        }
      };

      document.addEventListener('keydown', handleModalKeyDown);

      return () => {
        document.removeEventListener('keydown', handleModalKeyDown);
      };
    }
  }, [showModal]);

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
      }
    } else if (keyCode === 27) { // Escape key
      event.preventDefault();
      setShowModal(true);
    } else if (keyCode === 8) { // Backspace key
      const isEmptyOrZero = target.value.trim() === '' || (target.value === '0');
      if (isEmptyOrZero) {
        event.preventDefault();
        const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
      } else if (target.selectionStart === 0 && target.selectionEnd === 0) {
        event.preventDefault();
        const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
      }
    }
  };

  const handleGodownInputChange = (e) => {
    const value = e.target.value;
    setGodownCode(value);

    if (value.trim() !== '') {
      const filteredSuggestions = godownSuggestions.filter((godown) =>
        godown.godownCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGodownSuggestions(filteredSuggestions);

      const exactMatch = godownSuggestions.find((godown) =>
        godown.godownCode.toLowerCase() === value.toLowerCase()
      );
      if (exactMatch) {
        setGodownName(exactMatch.godownName);
        setRegion({ ...region, godownName: exactMatch.godownName });
      } else {
        setGodownName('');
        setRegion({ ...region, godownName: '' });
      }
    } else {
      setFilteredGodownSuggestions([]);
      setGodownName(region.godownName);
      setRegion({ ...region, godownName: region.godownName });
    }
  };

  const selectGodown = (godown) => {
    setGodownCode(godown.godownCode);
    setGodownName(godown.godownName);
    setRegion({ ...region, godownCode: godown.godownCode, godownName: godown.godownName });
    setFilteredGodownSuggestions([]);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    navigate('/regionAlter');
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 h-[100vh] border border-bg-gray-500"></div>
        <div className="w-1/2 border border-bg-gray-500">
          <div className="w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0">
            <h2 className="ml-[200px]">Region Master</h2>
            <span className="cursor-pointer mt-[5px] mr-2">
              <Link to="/regionAlter">
                <IoClose />
              </Link>
            </span>
          </div>
          <div className="w-[550px] h-[36vh] border border-gray-500 ml-[80px]">
            <form onSubmit={onSubmit}>
              {['ledgerCode', 'ledgerName', 'regionMasterId', 'regionName', 'regionState', 'country', 'godownCode', 'godownName'].map((field) => (
                <div key={field} className="input-ldgr flex items-center mt-1">
                  <label htmlFor={field} className="text-sm ml-2 mr-2 w-[140px]">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <span className="mr-2">:</span>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={field === 'godownCode' ? godownCode : region[field]}
                    onChange={field === 'godownCode' ? handleGodownInputChange : onInputChange}
                    onFocus={(e) => { pulseCursor(e.target); }}
                    onKeyDown={handleKeyDown}
                    ref={input => inputRefs.current[field] = input}
                    className={`h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ${
                      ['godownCode', 'godownName'].includes(field) ? 'w-[150px]' : 'w-[300px]'
                    }`}
                    autoComplete="off"
                  />
                </div>
              ))}
              <div className='mt-[288px]'>
                <button
                  type='submit'
                  id='acceptButton'
                  ref={acceptButtonRef}
                  className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
                >
                  A: Accept
                </button>
              </div>
            </form>
          </div>
          <div className='mt-[295px] ml-[480px]'>
            <Link to={"/regionFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Q: Quit</Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Quit</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to quit without saving?</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  ref={yesQuitButtonRef}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleModalConfirm}
                >
                  Yes
                </button>
                <button
                  type="button"
                  ref={cancelModalConfirmRef}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleModalClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredGodownSuggestions.length > 0 && (
        <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '40px', left: '1028px' }}>
          <div className='text-center bg-[#003285] text-[13.5px] text-white'>
            <p>List Of Godown Codes</p>
          </div>
          <ul className='suggestions w-full h-[20vh] text-center mt-2'>
            {filteredGodownSuggestions.map((godown, index) => (
              <li key={index} tabIndex={0} onClick={() => selectGodown(godown)} onKeyDown={(e) => e.key === 'Enter' && selectGodown(godown)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                {godown.godownCode.toUpperCase()} - {godown.godownName.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlterRegionMaster;
