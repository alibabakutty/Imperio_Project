import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { createNewVoucherTypeMaster } from '../services/MasterService';

const VoucherTypeMaster = () => {

    const [voucherTypeName, setVoucherTypeName] = useState('');
    const [voucherType, setVoucherType] = useState('');
    const [methodOfVoucherNumbering, setMethodVoucherNumbering] = useState('automatic');
    const [alterAdditionalNumberingDetails, setAlterAdditionalNumberingDetails] = useState('no');
    const [printingVoucherAfterSaving, setPrintingVoucherAfterSaving] = useState('no');
    const [nameOfClass, setNameOfClass] = useState('');

    const [errors, setErrors] = useState({});
    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState('');
    const [filteredVoucherTypeSuggestions, setFilteredVoucherTypeSuggestions] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSubFormModal, setShowSubFormModal] = useState(false);

    const inputRefs = useRef({
        voucherTypeName: null,
        voucherType: null,
        methodOfVoucherNumbering: null,
        alterAdditionalNumberingDetails: null,
        printingVoucherAfterSaving: null,
        nameOfClass: null,
        acceptButton: null
    });

    const voucherTypeNameRef = useRef(null);
    const acceptButtonRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {

        if(voucherTypeNameRef.current){
            voucherTypeNameRef.current.focus();
        }

        const fetchVoucherTypeNameSuggestions = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/master/allVoucherTypes');
                setVoucherTypeSuggestions(response.data);
                console.log(response.data);
            }catch(error){
                console.error('Error fetching voucher type names:', error);
            }
        }

        fetchVoucherTypeNameSuggestions();


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
              saveVoucherTypeMaster(event);
            }
          };
      
          document.addEventListener('keydown', handleKeyDown);
          document.addEventListener('keydown', handleCtrlA);
      
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', handleCtrlA);
          };

    }, []);


    const handleKeyDown = (event) => {
        const { keyCode, target } = event;

        switch (keyCode) {
            case 13: // Enter key
                event.preventDefault();
                const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
                if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
                    acceptButtonRef.current.focus();
                } else {
                    const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
                    nextInputRef.focus();
                }
                break;
            case 27: // Escape key
                setShowModal(true);
                break;
            case 8: // Backspace key
                if (target.value === '') {
                    const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
                    const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
                    const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
                    prevInputRef.focus();
                }
                break;
            default:
                // For handling 'Y' or 'N' keys for alterAdditionalNumberingDetails
                if (target.id === 'alterAdditionalNumberingDetails') {
                    if (keyCode === 89 || keyCode === 121) { // Y or y
                        setAlterAdditionalNumberingDetails('yes');
                        setShowSubFormModal(true);
                    } else if (keyCode === 78 || keyCode === 110) { // N or n
                        setAlterAdditionalNumberingDetails('no');
                    }
                } else if (target.id === 'printingVoucherAfterSaving') { // For handling 'Y' or 'N' keys for printingVoucherAfterSaving
                    if (keyCode === 89 || keyCode === 121) { // Y or y
                        setPrintingVoucherAfterSaving('yes');
                    } else if (keyCode === 78 || keyCode === 110) { // N or n
                        setPrintingVoucherAfterSaving('no');
                    }
                }
                break;
        }
    };
    
    
    
    
    


    const handleVoucherTypeChange = (e) => {
        const value = e.target.value;

        setVoucherType(value);

        if(value.trim() !== ''){
            const filteredSuggestions = voucherTypeSuggestions.filter((voucher) => 
            voucher.voucherType.toLowerCase().includes(value.toLowerCase()));

            setFilteredVoucherTypeSuggestions(filteredSuggestions);

            const exactMatch = voucherTypeSuggestions.find((voucher) =>
            voucher.voucherType.toLowerCase() === value.toLowerCase());

            if(exactMatch){
                setVoucherType(exactMatch.voucherType);
            }
        }else{
            setFilteredVoucherTypeSuggestions([]);
            setVoucherType('');
        }
    };

    const selectVoucherType = (voucher) => {

        setVoucherType(voucher.voucherType);
        setFilteredVoucherTypeSuggestions([]);

    };


    const validateForm = () => {
        const newErrors = {};

        if(!voucherTypeName.trim()){
            newErrors.voucherTypeName = 'Voucher Type Name is required.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length ===0;
    };


    const saveVoucherTypeMaster = (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }


        const voucher = {voucherTypeName, voucherType, methodOfVoucherNumbering, alterAdditionalNumberingDetails, printingVoucherAfterSaving, nameOfClass };

        console.log(voucher);

        createNewVoucherTypeMaster(voucher).then((response) => {
            console.log(response.data);

            navigate('/addedVoucherType');


        }).catch((error) =>{
            console.error('Error creating voucher type:', error);
        })


    };

    const handleModalClose = () => {
        setShowModal(false);
      };
    
      const handleModalConfirm = () => {
        navigate('/list');
      };

      const handleSubFormSave = () => {
        setShowSubFormModal(false);
      };

      const handleSubFormCancel = () => {
        setShowSubFormModal(false);
        setAlterAdditionalNumberingDetails('no');
      };

    

  return (
    <div>
        <div className='#FFF5E1 w-[90%] h-[95vh]'>
            <div className='text-[12px] flex justify-between bg-[#80C4E9]'>
                <p className='ml-1 mt-[1px]'>Voucher Type Creation</p>
                <span className='cursor-pointer mt-[5px] mr-2'>
                    <Link to={"/list"} ><IoClose /></Link>
                </span>
            </div>

            <div className='text-sm border border-slate-500'>

                <form >

                    <div className='w-[100%] h-[10vh] border border-b-slate-500'>
                        <label htmlFor="voucherTypeName" className='mr-5 mt-3 ml-1'>Name</label>
                        : <input type="text" id='voucherTypeName' name='voucherTypeName' value={voucherTypeName} onChange={(e) => setVoucherTypeName(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => {voucherTypeNameRef.current = input; inputRefs.current.voucherTypeName = input; }} className='w-[300px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                        {errors.voucherTypeName && <p className='text-red-500 text-xs ml-2'>{errors.voucherTypeName}</p>}
                    </div>



                    <div className='flex text-sm h-[75vh]'>
                        <div className='general w-[45%] border border-r-slate-500'>

                            <p className='underline text-center'>General</p>

                            <div>
                                <label htmlFor="voucherType" className='mr-[130px] ml-1'>Select type of voucher</label>
                                : <input type="text" id='voucherType' name='voucherType' value={voucherType} onChange={(e) => {setVoucherType(e.target.value); handleVoucherTypeChange(e)}} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.voucherType = input} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                                {filteredVoucherTypeSuggestions.length > 0 && (
                                    <div className='bg-[#CAF4FF] w-[20%] h-[85vh] border border-gray-500' style={{ position: 'absolute', top: '18px', left: '956px' }}>
                                        <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                                            <p>List of Voucher Types</p>
                                        </div>

                                        <ul className='suggestions w-full h-[20vh] text-center mt-2'>
                                            {filteredVoucherTypeSuggestions.map((voucher, index) => (
                                                <li key={index} tabIndex={0} onClick={() => selectVoucherType(voucher)} onKeyDown={(e) => e.key === 'Enter' && selectVoucherType(voucher)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                                    {voucher.voucherType.toUpperCase()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="methodOfVoucherNumbering" className='mr-[77.5px] ml-1'>Method of Voucher Numbering</label>
                                : <input type="text" id='methodOfVoucherNumbering' name='methodOfVoucherNumbering' value={methodOfVoucherNumbering} onChange={(e) => setMethodVoucherNumbering(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.methodOfVoucherNumbering = input} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div>
                                <label htmlFor="alterAdditionalNumberingDetails" className='mr-[36px] ml-1'>Set/Alter additional numbering details</label>
                                : <input type="text" id='alterAdditionalNumberingDetails' name='alterAdditionalNumberingDetails' value={alterAdditionalNumberingDetails} onChange={(e) => setAlterAdditionalNumberingDetails(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.alterAdditionalNumberingDetails = input} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            
                                {showSubFormModal && (
                                    <div className='fixed z-10 inset-0 overflow-y-auto'>
                                        <div className='flex items-end justify-center'>

                                            <div className='fixed inset-0 transition-opacity' aria-hidden="true">
                                                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                                            </div>

                                            <span className='hidden sm:inline-block' aria-hidden="true">&#8203;</span>

                                            <div className='inline-block bg-white transform'>
                                                <div className='mt-2 w-[1100px] h-[98vh] '>
                                                    <div className='ml-5'>
                                                        <label htmlFor="startingNumber" className='mr-14'>Starting Number</label>
                                                        : <input type="text" id='startingNumber' name='startingNumber' className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                    </div>

                                                    <div className='ml-5'>
                                                        <label htmlFor="widthOfNumericalPart" className='mr-[11px]'>Width of Numerical Part</label>
                                                        : <input type="text" id='widthOfNumericalPart' name='widthOfNumericalPart' className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                    </div>

                                                    <div className='ml-5'>
                                                        <label htmlFor="prefillWithZero" className='mr-[64.5px]'>Prefil with Zero</label>
                                                        : <input type="text" id='prefillWithZero' name='prefillWithZero' className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                    </div>

                                                    <div className='flex justify-evenly text-center border border-gray-400 w-[99%] h-[88.5vh] ml-[5px]'>
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
                                                                    <input type="text" id='restartNumberingApplicationForm' name='restartNumberingApplicationForm' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="restartNumberingStartingNumber"></label>
                                                                    <input type="text" id='restartNumberingStartingNumber' name='restartNumberingStartingNumber' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="restartNumberingPeriodicity"></label>
                                                                    <input type="text" id='restartNumberingPeriodicity' name='restartNumberingPeriodicity' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
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
                                                                    <input type="text" id='prefixDetailsApplicationForm' name='prefixDetailsApplicationForm' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="prefixDetailsParticulars"></label>
                                                                    <input type="text" id='prefixDetailsParticulars' name='prefixDetailsParticulars' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
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
                                                                    <input type="text" id='suffixDetailsApplicationForm' name='suffixDetailsApplicationForm' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="suffixDetailsParticulars"></label>
                                                                    <input type="text" id='suffixDetailsParticulars' name='suffixDetailsParticulars' className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                )}
                            
                            </div>

                        </div>

                        <div className='printing w-[30%] border border-r-slate-500'>

                            <p className='underline text-center'>Printing</p>

                            <div>
                                <label htmlFor="printingVoucherAfterSaving" className='mr-2 ml-2'>Printing voucher after saving</label>
                                : <input type="text" id='printingVoucherAfterSaving' name='printingVoucherAfterSaving' value={printingVoucherAfterSaving} onChange={(e) => setPrintingVoucherAfterSaving(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.printingVoucherAfterSaving = input} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            
                        </div>

                        <div className='nameOfClass w-[20%]'>

                            <p className='underline text-center'>Name of Class</p>

                            <div className='text-center'>
                                <input type="text" id='nameOfClass' name='nameOfClass' value={nameOfClass} onChange={(e) => setNameOfClass(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.nameOfClass = input} className='w-[200px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                        </div>
                    </div>

                    

                </form>
                


            </div>

                    <div className=''>

                        <button type='submit' id='acceptButton' ref={(button) => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} onClick={(e) => saveVoucherTypeMaster(e)} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800 ml-[100px]'>A: Accept</button>

                        <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800  ml-[600px]' >Q: Quit</Link>
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

export default VoucherTypeMaster