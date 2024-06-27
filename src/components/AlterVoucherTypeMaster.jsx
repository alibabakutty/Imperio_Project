import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { VscLaw } from 'react-icons/vsc';
import { Link, useNavigate, useParams } from 'react-router-dom'

const AlterVoucherTypeMaster = () => {

    const { voucherTypeName, voucherType } = useParams();
   

    const [voucher, setVoucher] = useState({
        voucherTypeName: "",
        voucherType: "",
        methodOfVoucherNumbering: "",
        alterAdditionalNumberingDetails: "",
        startingNumber: "",
        widthOfNumericalPart: "",
        prefillWithZero: "",
        restartNumberingApplicationForm: "",
        restartNumberingStartingNumber: "",
        restartNumberingPeriodicity: "",
        showPeriodicityOptions: "",
        prefixDetailsApplicationForm: "",
        prefixDetailsParticulars: "",
        suffixDetailsApplicationForm: "",
        suffixDetailsParticulars: "",
        printingVoucherAfterSaving: "",
        nameOfClass: ""
    });

    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState('');
    const [filteredVoucherTypeSuggestions, setFilteredVoucherTypeSuggestions] = useState('');
    // const [showVoucherNumberingOptions, setShowVoucherNumberingOptions] = useState(false);

    const inputRefs = useRef({
        voucherTypeName: null,
        voucherType: null,
        methodOfVoucherNumbering: null,
        alterAdditionalNumberingDetails: null,
        startingNumber: null,
        widthOfNumericalPart: null,
        prefillWithZero: null,
        restartNumberingApplicationForm: null,
        restartNumberingStartingNumber: null,
        restartNumberingPeriodicity: null,
        prefixDetailsApplicationForm: null,
        prefixDetailsParticulars: null,
        suffixDetailsApplicationForm: null,
        suffixDetailsParticulars: null,
        printingVoucherAfterSaving: null,
        nameOfClass: null,
        acceptButton: null
    });

    
    const acceptButtonRef = useRef(null);
    const startingNumberRef = useRef(null);
    const optionsRef = useRef(null);
    // const voucherNumberingOptionsRef = useRef(null);
    // const subFormSaveButtonRef = useRef(null);
    // const subFormCancelButtonRef = useRef(null);
    const yesQuitButtonRef = useRef(null);
    const cancelModalConfirmRef = useRef(null);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showSubFormModal, setShowSubFormModal] = useState(false);

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
      const {name,value} = e.target;
      
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setVoucher({ ...voucher, [name]: capitalizedValue });
  };

    useEffect(() => {
        
      if(inputRefs.current.voucherTypeName){
        inputRefs.current.voucherTypeName.focus();
        pulseCursor(inputRefs.current.voucherTypeName);
      }


        if (voucherTypeName) {
            loadVoucherTypeName();
        };
        
        if (voucherType) {
            loadVoucherType();
        };

        const fetchVoucherTypeSuggestions = async () => {
          try{
            const response = await axios.get('http://localhost:8080/api/master/allVoucherTypes');
            setVoucherTypeSuggestions(response.data);
          }catch(error){
            console.error('Error fetching voucher type names:', error);
          }
        };

        fetchVoucherTypeSuggestions();


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

    }, [voucherTypeName, voucherType]);



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
            acceptButtonRef.current.focus();
          } else {
            const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
            nextInputRef.focus();
            pulseCursor(nextInputRef);
          }
        } else if (keyCode === 27) { // Escape key
          event.preventDefault();
          setShowModal(true);
        } else if (keyCode === 8) { // Backspace key
          const isEmptyOrZero = target.value.trim() === '' || target.value === '0';
          if (isEmptyOrZero) {
            event.preventDefault();
            const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
            prevInputRef.focus();
            pulseCursor(prevInputRef);
          } else if (target.selectionStart === 0 && target.selectionEnd === 0) {
            event.preventDefault();
            const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
            prevInputRef.focus();
            pulseCursor(prevInputRef);
          }
        } else if (target.id === 'alterAdditionalNumberingDetails') {
          if (keyCode === 89 || keyCode === 121) { // Y or y
            event.preventDefault();
            setVoucher(prevState => ({ ...prevState, alterAdditionalNumberingDetails: 'yes' }));
            setShowSubFormModal(true);
          } else if (keyCode === 78 || keyCode === 110) { // N or n
            event.preventDefault();
            setVoucher(prevState => ({ ...prevState, alterAdditionalNumberingDetails: 'no' }));
            inputRefs.current.printingVoucherAfterSaving?.focus();
          }
        } else if (target.id === 'printingVoucherAfterSaving') {
          if (keyCode === 89 || keyCode === 121) { // Y or y
            event.preventDefault();
            setVoucher(prevState => ({ ...prevState, printingVoucherAfterSaving: 'yes' }));
          } else if (keyCode === 78 || keyCode === 110) { // N or n
            event.preventDefault();
            setVoucher(prevState => ({ ...prevState, printingVoucherAfterSaving: 'no' }));
          }
        }
      };
      
      

      const handleVoucherTypeChange = (e) => {
        const value = e.target.value;

        setVoucher((prevState) => ({ ...prevState, voucherType: value }));

        if(value.trim() !== ''){
          const filteredSuggestions = voucherTypeSuggestions.filter((voucher) => voucher.voucherType.toLowerCase().includes(value.toLowerCase()));

          setFilteredVoucherTypeSuggestions(filteredSuggestions);

          const exactMatch = voucherTypeSuggestions.find((voucher) => voucher.voucherType.toLowerCase() === value.toLowerCase());

          if(exactMatch){
            setVoucher((prevState) => ({ ...prevState, voucherType: exactMatch.voucherType }));
          }
        }else{
          setFilteredVoucherTypeSuggestions([]);
          setVoucher((prevState) => ({ ...prevState, voucherType: '' }));
        }
      };

      const selectVoucherType = (voucher) => {
        setVoucher((prevState) => ({ ...prevState, voucherType: voucher.voucherType}));
        setFilteredVoucherTypeSuggestions([]);
      }


    const loadVoucherTypeName = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/master/displayVoucherTypeName/${voucherTypeName}`);
            console.log(result.data);
            setVoucher(result.data);
        }catch(error){
            console.error('Error fetching voucher type name data:', error);
        }
    };

    const loadVoucherType = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/master/displayVoucherType/${voucherType}`);
            console.log(result.data);
            setVoucher(result.data);

        }catch(error){
            console.error('Error fetching voucher type data:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/master/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
        navigate('/alteredVoucherTypeMaster');
    }



    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalConfirm = () => {
        navigate('/voucherTypeAlter');
    };


    const handleSubFormSave = () => {
      setShowSubFormModal(false);
    };

    const handleSubFormCancel = () => {
      setShowSubFormModal(false);
    }
    



  return (
    <div>
        <div className='#FFF5E1 w-[90%] h-[95vh]'>
            <div className='text-[12px] flex justify-between bg-[#80C4E9]'>
                <p className='ml-1 mt-[1px]'>Voucher Type Alter</p>
                <span>
                    <Link to={"/voucherTypeAlter"} ><IoClose /></Link>
                </span>
            </div>

            <div className='text-sm border border-slate-500'>
                <form>
                    <div className='w-[100%] h-[10vh] border border-b-slate-500'>
                        <label htmlFor="voucherTypeName" className='mr-5 mt-3 ml-1'>Name</label>
                        : <input type="text" id='voucherTypeName' name='voucherTypeName' value={voucher.voucherTypeName} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => { inputRefs.current.voucherTypeName = input; }} className='w-[300px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='flex text-sm h-[75vh]'>
                        <div className='general w-[45%] border border-r-slate-500'>
                            <p className='underline text-center'>General</p>

                            <div>
                                <label htmlFor="voucherType" className='mr-[130px] ml-1'>Select type of voucher</label>
                                : <input type="text" id='voucherType' name='voucherType' value={voucher.voucherType} onChange={(e) => {handleChange(e); handleVoucherTypeChange(e);}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.voucherType = input} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                              {filteredVoucherTypeSuggestions.length > 0 && (
                                <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{position: 'absolute', top: '18px', left: '956px' }}>
                                  <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                                    <p>List of Voucher Types</p>
                                  </div>

                                  <ul className='suggestions w-full h-[20vh] text-left mt-2'>
                                    {filteredVoucherTypeSuggestions.map((voucher,index) => (
                                      <li key={index} tabIndex={0} onClick={() => selectVoucherType(voucher)} onKeyDown={(e) => e.key === 'Enter' && selectVoucherType(voucher)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px] pl-2'>
                                        {voucher.voucherType}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            
                            </div>

                            <div>
                                <label htmlFor="methodOfVoucherNumbering" className='mr-[77.5px] ml-1'>Method of Voucher Numbering</label>
                                : <input type="text" id='methodOfVoucherNumbering' name='methodOfVoucherNumbering' value={voucher.methodOfVoucherNumbering} onKeyDown={handleKeyDown} onChange={handleChange} ref={(input) => inputRefs.current.methodOfVoucherNumbering = input} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div>
                                <label htmlFor="alterAdditionalNumberingDetails" className='mr-[36px] ml-1'>Set/Alter additional numbering details</label>
                                : <input type="text" id='alterAdditionalNumberingDetails' name='alterAdditionalNumberingDetails' value={voucher.alterAdditionalNumberingDetails} onKeyDown={handleKeyDown} onChange={handleChange} ref={(input) => inputRefs.current.alterAdditionalNumberingDetails = input} className='w-[100px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                                {showSubFormModal && (
                                    <div className='fixed z-10 inset-0 overflow-y-auto'>
                                        <div className='flex items-end justify-center'>

                                            <div className='fixed inset-0 transition-opacity' aria-hidden="true">
                                                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                                            </div>

                                            <span className='hidden sm:inline-block' aria-hidden="true">&#8203;</span>

                                            <form action="">


                                                <div className='inline-block bg-white transform'>
                                                    <div className='mt-2 w-[1100px] h-[93vh] '>
                                                        <div className='ml-2'>
                                                            <label htmlFor="startingNumber" className='mr-14'>Starting Number</label>
                                                            : <input type="text" id='startingNumber' name='startingNumber' value={voucher.startingNumber} onKeyDown={handleKeyDown}  className='w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='ml-2'>
                                                            <label htmlFor="widthOfNumericalPart" className='mr-[11px]'>Width of Numerical Part</label>
                                                            : <input type="text" id='widthOfNumericalPart' name='widthOfNumericalPart' value={voucher.widthOfNumericalPart} onKeyDown={handleKeyDown}  className='w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='ml-2'>
                                                            <label htmlFor="prefillWithZero" className='mr-[64.5px]'>Prefil with Zero</label>
                                                            : <input type="text" id='prefillWithZero' name='prefillWithZero' value={voucher.prefillWithZero} onKeyDown={handleKeyDown}  className='w-[80px] ml-2 mb-1 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='flex justify-evenly text-center border border-gray-400 w-[99%] h-[83vh] ml-[5px]'>
                                                            <div className='w-[360px] border border-r-slate-400'>
                                                                <div className='border border-b-slate-400'>
                                                                    <p>Restart Numbering</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <p className=''>Applicable Form</p>
                                                                    <p>Starting Number</p>
                                                                    <p>Periodicity</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="restartNumberingApplicationForm"></label>
                                                                        <input type="text" id='restartNumberingApplicationForm' name='restartNumberingApplicationForm' onKeyDown={handleKeyDown} value={voucher.restartNumberingApplicationForm} className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="restartNumberingStartingNumber"></label>
                                                                        <input type="text" id='restartNumberingStartingNumber' name='restartNumberingStartingNumber' onKeyDown={handleKeyDown} value={voucher.restartNumberingStartingNumber} className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="restartNumberingPeriodicity"></label>
                                                                        <input type="text" id='restartNumberingPeriodicity' name='restartNumberingPeriodicity' onKeyDown={handleKeyDown} value={voucher.restartNumberingPeriodicity} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                                                                        
                                                                        
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className='w-[360px] border border-r-slate-400'>

                                                                <div className='border border-b-slate-400'>
                                                                    <p>Prefix Details</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <p>Application Form</p>
                                                                    <p>Particulars</p>
                                                                    
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="prefixDetailsApplicationForm"></label>
                                                                        <input type="text" id='prefixDetailsApplicationForm' name='prefixDetailsApplicationForm' value={voucher.prefixDetailsApplicationForm} onKeyDown={handleKeyDown} className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="prefixDetailsParticulars"></label>
                                                                        <input type="text" id='prefixDetailsParticulars' name='prefixDetailsParticulars' value={voucher.prefixDetailsParticulars} onKeyDown={handleKeyDown}  className='w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div>

                                                                <div className='w-[360px] border border-b-slate-400'>
                                                                    <p>Suffix Details</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <p>Application Form</p>
                                                                    <p>Particulars</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="suffixDetailsApplicationForm"></label>
                                                                        <input type="text" id='suffixDetailsApplicationForm' name='suffixDetailsApplicationForm' value={voucher.suffixDetailsApplicationForm} onKeyDown={handleKeyDown}  className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="suffixDetailsParticulars"></label>
                                                                        <input type="text" id='suffixDetailsParticulars' name='suffixDetailsParticulars' value={voucher.suffixDetailsParticulars} onKeyDown={handleKeyDown} className='w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button type='submit' onClick={handleSubFormSave}  className='text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[315px]'>Save</button>
                                                        <button type='button' onClick={handleSubFormCancel}  className='text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[260px]'>Cancel</button>
                                                    </div>

                                                </div>

                                                


                                            </form>

                                        </div>

                                    </div>
                                )}
                                
                            </div>
                        </div>

                        <div className='printing w-[30%] border border-r-slate-500'>

                            <p className='underline text-center'>Printing</p>

                            <div>
                                <label htmlFor="printingVoucherAfterSaving" className='mr-2 ml-2'>Printing voucher after saving</label>
                                : <input type="text" id='printingVoucherAfterSaving' name='printingVoucherAfterSaving' value={voucher.printingVoucherAfterSaving} onKeyDown={handleKeyDown} onChange={handleChange} ref={(input) => inputRefs.current.printingVoucherAfterSaving = input} className='w-[100px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                        </div>

                        <div className='nameOfClass w-[20%]'>

                            <p className='underline text-center'>Name of Class</p>

                            <div className='text-center'>
                                <input type="text" id='nameOfClass' name='nameOfClass' value={voucher.nameOfClass} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.nameOfClass = input} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>
                        </div>
                    </div>

                    
                </form>
            </div>

            <div>
                <div className='ml-[300px]'>
                    <button type='submit' id='acceptButton' onClick={(e) => onSubmit(e)} ref={(button) => { acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' style={{position: 'absolute', top: '575px'}}>A: Accept</button>
                </div>

                <div className='ml-[850px] mt-[25px]'>
                    <Link to={"/voucherTypeAlter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800' >Q: Quit</Link>
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

export default AlterVoucherTypeMaster