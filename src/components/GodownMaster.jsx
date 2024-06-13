import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewGodownMaster } from '../services/MasterService';

const GodownMaster = () => {

  const [godownCode, setGodownCode] = useState('');
  const [godownName, setGodownName] = useState('');

  const [errors, setErrors] = useState({});

  const [showModal, setShowModal] = useState(false);


  const inputRefs = useRef({
    godownCode: null,
    godownName: null
  });

  const godownCodeRef = useRef(null);
  const acceptButtonRef = useRef(null);

  const navigator = useNavigate();

  useEffect(() => {
    // Focus on the first input element after the component mounts
    if(godownCodeRef.current){
      godownCodeRef.current.focus();
    }

    // Add event listener for Ctrl + Q and Esc to go back
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
        saveGodownMaster(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleCtrlA);


    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleCtrlA);
    };

  }, [navigator]);


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



  const validateForm = () => {
    const newErrors = {};

    if(!godownCode.trim()){
      newErrors.godownCode = 'Godown Code is required!.';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }


  function saveGodownMaster(e){
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    const godown = {godownCode, godownName};

    console.log(godown);

    createNewGodownMaster(godown).then((response) =>{
      console.log(response.data);

      navigator('/addedGodown');
    }).catch((error) =>{
      console.error('Error creating godown master:', error);
    })
  };


  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    navigator('/list');
  };



  return (
    <div className='w-1/2 border h-[100vh]'>
      <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
        <h2 className='ml-[200px]'>Godown Master</h2>
        <span className='cursor-pointer mt-[5px] mr-2'>
          <Link to={"/list"}><IoClose /></Link>
        </span>
      </div>

      <div className='w-[550px] h-[15vh] border border-gray-500 ml-[750px]'>

        <form >

          <div className='input-ldgr mt-3'>
            <label htmlFor="godownCode" className='text-sm mr-[73px] ml-2'>Godown Code</label>
            : <input
                type="text"
                id='godownCode'
                name='godownCode'
                value={godownCode}
               onChange={(e) => setGodownCode(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => {godownCodeRef.current = input; inputRefs.current.godownCode = input; }}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />


              {errors.godownCode && <p className='text-red-500 text-xs ml-2'>{errors.godownCode}</p>}
              
          </div>

          <div className='input-ldgr'>
            <label htmlFor="goodownName" className='text-sm mr-[70px] ml-2'>Godown Name</label>
            : <input
                type="text"
                id='godownName'
                name='godownName'
                value={godownName}
                onChange={(e) => setGodownName(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.godownName = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          

          <div className='mt-[445px]'>
            <button
              type='submit'
              ref={(button) => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button;}}
              className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
              id='accptButton'
              onClick={saveGodownMaster}
            >A: Accept</button>
          </div>

        </form>

      </div>

      <div className='mt-[430px] ml-[495px]'>
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
                  onClick={handleModalConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes, Quit
                </button>
                <button
                  type="button"
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

export default GodownMaster