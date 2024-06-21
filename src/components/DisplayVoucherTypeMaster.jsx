import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DisplayVoucherTypeMaster = () => {

    const { voucherTypeName, voucherType } = useParams();
   

    const [voucher, setVoucher] = useState({
        voucherTypeName: "",
        voucherType: "",
        methodOfVoucherNumbering: "",
        alterAdditionalNumberingDetails: "",
        printingVoucherAfterSaving: "",
        nameOfClass: ""
    });

    const inputRefs = useRef({
        voucherTypeName: null,
        voucherType: null,
        methodOfVoucherNumbering: null,
        alterAdditionalNumberingDetails: null,
        printingVoucherAfterSaving: null,
        nameOfClass: null,
        backButton: null
    });

    const voucherTypeNameRef = useRef(null);
    const backButtonRef = useRef(null);
    const yesQuitButtonRef = useRef(null);
    const cancelModalConfirmRef = useRef(null);

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setVoucher(prevState => ({
            ...prevState, [name]: value
        }));
    };

    useEffect(() => {
        if(voucherTypeNameRef.current){
            voucherTypeNameRef.current.focus();
        };


        if (voucherTypeName) {
            loadVoucherTypeName();
        };

        if (voucherType) {
            loadVoucherType();
        };


        const handleKeyDown = (event) => {
            const { ctrlKey, key } = event;
            if ((ctrlKey && key === 'q') || key === 'Escape') {
              event.preventDefault();
              setShowModal(true);
            }
          };


          document.addEventListener('keydown', handleKeyDown);


          return() => {
            document.removeEventListener('keydown', handleKeyDown);
          }

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
        const {keyCode,target} = event;

        if(keyCode === 13){
            event.preventDefault();

            const currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            if(currentInputIndex === Object.keys(inputRefs.current).length - 2){
                backButtonRef.current.focus();
            }else{
                const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
                nextInputRef.focus();
            }
        }else if(keyCode === 27){
            setShowModal(true);
        }else if(keyCode === 8 && target.value === ''){
            event.preventDefault();

            const currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            if(currentInputIndex > 0){
                const prevInputRef = Object.values(inputRefs.current)[currentInputIndex - 1];
                prevInputRef.focus();
            }
        }
    };


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

    const handleModalClose = () => {
        setShowModal(false);
      };
    
      const handleModalConfirm = () => {
        navigate('/voucherTypeFilter');
      };


  return (
    <div>
        <div className='#FFF5E1 w-[90%] h-[95vh]'>
            <div className='text-[12px] flex justify-between bg-[#80C4E9]'>
                <p className='ml-1 mt-[1px]'>Voucher Type Display</p>
                <span>
                    <Link to={"/voucherTypeFilter"} ><IoClose /></Link>
                </span>
            </div>

            <div className='text-sm border border-slate-500'>
                <form action="">
                    <div className='w-[100%] h-[10vh] border border-b-slate-500'>
                        <label htmlFor="voucherTypeName" className='mr-5 mt-3 ml-1'>Name</label>
                        : <input type="text" id='voucherTypeName' name='voucherTypeName' value={voucher.voucherTypeName} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {voucherTypeNameRef.current = input; inputRefs.current.voucherTypeName = input; }} className='w-[300px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='flex text-sm h-[75vh]'>
                        <div className='general w-[45%] border border-r-slate-500'>
                            <p className='underline text-center'>General</p>

                            <div>
                                <label htmlFor="voucherType" className='mr-[130px] ml-1'>Select type of voucher</label>
                                : <input type="text" id='voucherType' name='voucherType' value={voucher.voucherType} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.voucherType = input} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div>
                                <label htmlFor="methodOfVoucherNumbering" className='mr-[77.5px] ml-1'>Method of Voucher Numbering</label>
                                : <input type="text" id='methodOfVoucherNumbering' name='methodOfVoucherNumbering' value={voucher.methodOfVoucherNumbering} onKeyDown={handleKeyDown} onChange={handleChange} ref={(input) => inputRefs.current.methodOfVoucherNumbering = input} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                            </div>

                            <div>
                                <label htmlFor="alterAdditionalNumberingDetails" className='mr-[36px] ml-1'>Set/Alter additional numbering details</label>
                                : <input type="text" id='alterAdditionalNumberingDetails' name='alterAdditionalNumberingDetails' value={voucher.alterAdditionalNumberingDetails} onKeyDown={handleKeyDown} onChange={handleChange} ref={(input) => inputRefs.current.alterAdditionalNumberingDetails = input} className='w-[100px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
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
                <Link to={"/voucherTypeFilter"} id='backButton' ref={(button) => backButtonRef.current = button} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800  ml-[600px]' >Q: Quit</Link>
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

export default DisplayVoucherTypeMaster