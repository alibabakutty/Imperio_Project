import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DisplayLedgerMaster = () => {
  
  const { ledgerCode } = useParams();

  const navigate = useNavigate();

  const [ledger, setLedger] = useState({
    ledgerCode: "",
    ledgerName: ""
  });

  const inputRefs = useRef({
    ledgerCode: null,
    ledgerName: null,
    backButton: null
  });


 
  const backButtonRef = useRef(null);
  const yesQuitButtonRef = useRef();
  const cancelModalConfirmRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const pulseCursor = (input) => {
    const value = input.value;
    if(value){
      input.value = '';
      setTimeout(() => {
        input.value = value.charAt(0).toUpperCase() + value.slice(1);
        input.setSelectionRange(0, 0);
      }, 0);
    }
  };

  const handleNavigation = () => {
    navigate('/ledgerFilter');
  }

  const onInputChange = (e) => {
    const {name, value} = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setLedger({ ...ledger, [name]: capitalizedValue });
  };



  useEffect(() => {

    if(inputRefs.current.ledgerCode){
      inputRefs.current.ledgerCode.focus();
      pulseCursor(inputRefs.current.ledgerCode);
    }
    
    loadLedger();

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
        backButtonRef.current.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleCtrlA);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleCtrlA);
    };

  }, [ledgerCode]);


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


  const handleKeyDown = (event) => {
    const { keyCode, target } = event;
    const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);

    if (keyCode === 13) { // Enter key
      event.preventDefault();

      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
        backButtonRef.current.focus();
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
        pulseCursor(nextInputRef);
      }
    } else if (keyCode === 27) { // Escape key
      event.preventDefault();
      setShowModal(true);
    } else if (keyCode === 8 && target.id !== 'ledgerCode') { // Backspace key
      const isEmptyOrZero = target.value.trim() === '' || (target.value === '0');
      if (isEmptyOrZero) {
        event.preventDefault();
        const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
        pulseCursor(prevInputRef)
      } else if (target.selectionStart === 0 && target.selectionEnd === 0) {
        event.preventDefault();
        const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
        pulseCursor(prevInputRef)
      }
    }
  };

  const loadLedger = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/ledgerMasterApi/displayLedger/${ledgerCode}`);
      setLedger(result.data);
    } catch (error) {
      console.error("Error fetching the godown data", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);

    if(inputRefs.current.ledgerCode){
      inputRefs.current.ledgerCode.focus();
      pulseCursor(inputRefs.current.ledgerCode);
    }
  };

  const handleModalConfirm = () => {
    navigate('/ledgerAlter');
  };

  return (
    <div>
      <div className='flex'>
        <div className=' h-[100vh] border border-gray-500'>

        </div>

        <div className='w-1/2 border h-[100vh]'>
          <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Ledger Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
              <Link to={"/ledgerFilter"}><IoClose /></Link>
            </span>
          </div>

          <div className='w-[550px] h-[10vh] border border-gray-500 ml-[750px]'>
            <form>
              {['ledgerCode', 'ledgerName'].map((field) => (
                <div key={field} className='input-ldgr flex items-center mt-1'>
                  <label htmlFor={field} className='text-sm ml-2 mr-2 w-[140px]'>{field.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase())}</label>
                  <span className='mr-2'>:</span>
                  <input type="text" id={field} name={field} value={ledger[field]} onChange={onInputChange} onKeyDown={handleKeyDown} ref={input => { inputRefs.current[field] = input; }} className='w-[300px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                </div>
              ))}

            </form>
          </div>

        <div className='mt-[450px] ml-[900px]'>
          {/* <Link to={"/ledgerAlter"} id='backButton' ref={(input) => {backButtonRef.current = input; inputRefs.current.backButton = input; }} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Q:Quit</Link> */}
            <input type="button" id='backButton' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onKeyDown={(e) => {if(e.key === 'Backspace'){e.preventDefault(); if(inputRefs.current.ledgerName && inputRefs.current.ledgerName.focus){inputRefs.current.ledgerName.focus(); }}}} value={"Q: Quit"} ref={(button) => {backButtonRef.current = button; }} onClick={handleNavigation} />
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
  );
}

export default DisplayLedgerMaster;
