import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DisplayDistributorMaster = () => {
  const { distributorCode } = useParams();

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
    backButton: null
  });

  const backButtonRef = useRef(null);
  const yesQuitButtonRef = useRef(null);
  const cancelModalConfirmRef = useRef(null);

  const navigate =useNavigate();

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

    const handleChange = (e) => {
        const {name, value} = e.target;

        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setDistributor({ ...distributor, [name]: capitalizedValue });
    };

  

  useEffect(() => {
    
    if(inputRefs.current.distributorCode){
      inputRefs.current.distributorCode.focus();
      pulseCursor(inputRefs.current.distributorCode);
    };

    loadDistributor();


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
  }, []);



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
    const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
    );

    if (keyCode === 13) {
        event.preventDefault();
        
        if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
            backButtonRef.current.focus();
        } else {
            const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
            nextInputRef.focus();
            pulseCursor(nextInputRef);
        }
    } else if (keyCode === 27) {
        setShowModal(true);
    } else if (keyCode === 8 && target.id !== 'distributorCode') {
        event.preventDefault();


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

  const loadDistributor = async () => {
    try {
      const result = await axios.get(`http://localhost:9080/distributorMasterApi/displayDistributor/${distributorCode}`);
      setDistributor(result.data);
    } catch (error) {
      console.error("Error fetching the distributor data", error);
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
    navigate('/distributorFilter'); 
};


  return (
    <div>
      <div className='flex'>
        <div className='w-1/2 h-[100vh] border border-bg-gray-500'></div>
        <div className='w-1/2 border border-bg-gray-500'>
          <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Distributor Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
              <Link to={"/distributorFilter"}><IoClose /></Link>
            </span>
          </div>

          <div className='w-[550px] h-[45vh] border border-gray-500 ml-[80px] '>
            <form>
              {[
                { id: 'distributorCode', label: 'Distributor Code', value: distributor.distributorCode },
                { id: 'distributorCompanyName', label: 'Distributor Company Name', value: distributor.distributorCompanyName },
                { id: 'distributorOwnerName', label: 'Distributor Owner Name', value: distributor.distributorOwnerName },
                { id: 'mobileNo', label: 'Mobile No', value: distributor.mobileNo },
                { id: 'executiveCode', label: 'Executive Code', value: distributor.executiveCode },
                { id: 'executiveMaster', label: 'Executive Master', value: distributor.executiveMaster },
                { id: 'regionCode', label: 'Region Code', value: distributor.regionCode },
                { id: 'regionMaster', label: 'Region Master', value: distributor.regionMaster },
                { id: 'contactPersonName', label: 'Contact Person Name', value: distributor.contactPersonName },
                { id: 'contactMobileNo', label: 'Contact Mobile No', value: distributor.contactMobileNo },
              ].map((field, index) => (
                <div key={field.id} className='input-ldgr flex items-center mt-1'>
                  <label htmlFor={field.id} className='text-sm ml-2 w-[180px]'>{field.label}</label>
                  <span className='mr-2'>:</span>
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={field.value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={input => {
                      inputRefs.current[field.id] = input;
                      
                    }}
                    className='w-[300px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                    autoComplete='off'
                  />
                  
                </div>
              ))}
            </form>
          </div>

          <div className='mt-[245px] ml-[30px]'>
            <Link
              to={"/distributorFilter"}
              id='backButton'
              ref={button => {
                backButtonRef.current = button;
                inputRefs.current.backButton = button;
              }}
              className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'
            >
              Q: Quit
            </Link>
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
};

export default DisplayDistributorMaster;
