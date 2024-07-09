import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AlterVoucherTypeMaster = () => {

    const { voucherTypeName, voucherType } = useParams();
   

    const [voucher, setVoucher] = useState({
        voucherTypeName: "",
        voucherType: "",
        methodOfVoucherNumbering: "",
        alterAdditionalNumberingDetails: "",
        startingNumber: "",
        widthOfNumericalPart: '',
        prefillWithZero: "",
        restartNumberingApplicationForm: "",
        restartNumberingStartingNumber: "",
        restartNumberingPeriodicity: "",
        prefixDetailsApplicationForm: "",
        prefixDetailsParticulars: "",
        suffixDetailsApplicationForm: "",
        suffixDetailsParticulars: "",
        printingVoucherAfterSaving: "",
        nameOfClass: ""
    });

    

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

    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState('');
    const [filteredVoucherTypeSuggestions, setFilteredVoucherTypeSuggestions] = useState('');
    const [showVoucherNumberingOptions, setShowVoucherNumberingOptions] = useState(false);
    const [showPeriodicityOptions, setShowPeriodicityOptions] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showSubFormModal, setShowSubFormModal] = useState(false);

    
    const acceptButtonRef = useRef(null);
    const startingNumberRef = useRef(null);
    const optionsRef = useRef(null);
    const voucherNumberingOptionsRef = useRef(null);
    const subFormSaveButtonRef = useRef(null);
    const subFormCancelButtonRef = useRef(null);
    const yesQuitButtonRef = useRef(null);
    const cancelModalConfirmRef = useRef(null);

    const navigate = useNavigate();

    

    const pulseCursor = (input) => {
      const value = input.value;
      if(value){
        input.value = '';
        setTimeout(() => {
          input.value = value.charAt(0).toUpperCase() + value.slice(1);
          input.setSelectionRange(0, 0);  // Set cursor position at the beginning
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

      if(showSubFormModal){
        startingNumberRef.current.focus();
      }


        if (voucherTypeName) {
            loadVoucherTypeName();
        };
        
        if (voucherType) {
            loadVoucherType();
        };

        const fetchVoucherTypeSuggestions = async () => {
          try{
            const response = await axios.get('http://localhost:8080/voucherTypeApi/allVoucherTypes');
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

    }, [voucherTypeName, voucherType, showSubFormModal]);



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


      const handleBackspace = (event, target) => {
        if (target.selectionStart === 0 && target.selectionEnd === 0) {
          event.preventDefault();
      
          if (target.id === "printingVoucherAfterSaving") {
            if (
              inputRefs.current.alterAdditionalNumberingDetails &&
              inputRefs.current.alterAdditionalNumberingDetails.focus
            ) {
              inputRefs.current.alterAdditionalNumberingDetails.focus();
              pulseCursor(inputRefs.current.alterAdditionalNumberingDetails);
            }
          } else {
            const currentInputIndex = Object.keys(inputRefs.current).findIndex(
              (key) => key === target.id
            );
            const prevInputIndex =
              (currentInputIndex - 1 + Object.keys(inputRefs.current).length) %
              Object.keys(inputRefs.current).length;
            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
      
            if (prevInputRef && prevInputRef.focus) {
              prevInputRef.focus();
              pulseCursor(prevInputRef);
            }
          }
        }
      };


      const handleDelete = (event, target) => {
        
          event.preventDefault();
      
         setVoucher({ ...voucher, [target.name]: '' });
       
      };
      
      
      
      


      const handleKeyDown = (event) => {
        const { keyCode, target } = event;
      
        if (keyCode === 13) {
          // Handle Enter key press
          event.preventDefault();
          const currentInputIndex = Object.keys(inputRefs.current).findIndex(
            (key) => key === target.id
          );
      
          // Handle special cases for specific inputs
          if (target.id === "alterAdditionalNumberingDetails") {
            if (
              inputRefs.current.printingVoucherAfterSaving &&
              inputRefs.current.printingVoucherAfterSaving.focus
            ) {
              inputRefs.current.printingVoucherAfterSaving.focus();
              pulseCursor(inputRefs.current.printingVoucherAfterSaving);
            }
          } else if (target.id === "suffixDetailsParticulars") {
            if (
              subFormSaveButtonRef.current &&
              subFormSaveButtonRef.current.focus
            ) {
              subFormSaveButtonRef.current.focus();
            }
          } else if (target.id === "subFormSaveButton") {
            handleSubFormSave();
            if (
              inputRefs.current.printingVoucherAfterSaving &&
              inputRefs.current.printingVoucherAfterSaving.focus
            ) {
              inputRefs.current.printingVoucherAfterSaving.focus();
            }
          } else if (target.id === "nameOfClass") {
            if (acceptButtonRef.current && acceptButtonRef.current.focus) {
              acceptButtonRef.current.focus();
            }
          } else {
            // Move focus to the next input field
            const nextInputIndex = currentInputIndex + 1;
            if (nextInputIndex < Object.keys(inputRefs.current).length) {
              const nextInputRef = Object.values(inputRefs.current)[nextInputIndex];
              if (nextInputRef && nextInputRef.focus) {
                nextInputRef.focus();
                pulseCursor(nextInputRef);
              }
            } else {
              // If at the last input, focus on the accept button
              if (acceptButtonRef.current && acceptButtonRef.current.focus) {
                acceptButtonRef.current.focus();
              }
            }
          }
        } else if (keyCode === 27) {
          // Handle Escape key press
          setShowModal(true);
        } else if (keyCode === 8 && target.id !== "voucherTypeName") {
          // Handle Backspace key press
          handleBackspace(event, target);
        } else if (keyCode === 46) {
          // Handle Delete key press
          handleDelete(event, target);
        } else if (target.id === "alterAdditionalNumberingDetails") {
          // Handle specific behavior for alterAdditionalNumberingDetails input
          if (keyCode === 89 || keyCode === 121) {
            event.preventDefault();
            setVoucher({ ...voucher, alterAdditionalNumberingDetails: "no" });
            setShowSubFormModal(true);
          } else if (keyCode === 78 || keyCode === 110) {
            event.preventDefault();
            setVoucher({ ...voucher, alterAdditionalNumberingDetails: "no" });
            const nextInputRef = inputRefs.current.printingVoucherAfterSaving;
            if (nextInputRef && nextInputRef.focus) {
              nextInputRef.focus();
              pulseCursor(nextInputRef);
            }
          }
        } else if (target.id === "printingVoucherAfterSaving") {
          // Handle specific behavior for printingVoucherAfterSaving input
          if (keyCode === 89 || keyCode === 121) {
            event.preventDefault();
            setVoucher({ ...voucher, printingVoucherAfterSaving: "yes" });
          } else if (keyCode === 78 || keyCode === 110) {
            event.preventDefault();
            setVoucher({ ...voucher, printingVoucherAfterSaving: "no" });
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
            const result = await axios.get(`http://localhost:8080/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`);
            console.log(result.data);
            setVoucher(result.data);
        }catch(error){
            console.error('Error fetching voucher type name data:', error);
        }
    };

    const loadVoucherType = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/voucherTypeApi/displayVoucherType/${voucherType}`);
            console.log(result.data);
            setVoucher(result.data);

        }catch(error){
            console.error('Error fetching voucher type data:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
        navigate('/alteredVoucherTypeMaster');
    }



    const handleModalClose = () => {
        setShowModal(false);

        if(inputRefs.current.voucherTypeName){
          inputRefs.current.voucherTypeName.focus();
          pulseCursor(inputRefs.current.voucherTypeName);
        }
    };

    const handleModalConfirm = () => {
        navigate('/voucherTypeAlter');
    };


    const handleSubFormSave = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
        console.log('Response:', response.data); // Log response for debugging
        // Optionally handle success scenario (e.g., show confirmation)
      } catch (error) {
        console.error('Error updating data:', error);
        // Optionally handle error scenario (e.g., show error message)
        showSubFormModal(false);
      }
    };

    const handleSubFormCancel = () => {

      setVoucher({ ...voucher, startingNumber: voucher.startingNumber, widthOfNumericalPart: voucher.widthOfNumericalPart, prefillWithZero: voucher.widthOfNumericalPart, restartNumberingApplicationForm: voucher.restartNumberingApplicationForm, restartNumberingStartingNumber: voucher.restartNumberingStartingNumber, restartNumberingPeriodicity: voucher.restartNumberingPeriodicity, prefixDetailsApplicationForm: voucher.prefixDetailsApplicationForm, prefixDetailsParticulars: voucher.prefixDetailsParticulars, suffixDetailsApplicationForm: voucher.suffixDetailsApplicationForm, suffixDetailsParticulars: voucher.suffixDetailsParticulars, alterAdditionalNumberingDetails: voucher.alterAdditionalNumberingDetails, });
      
      setShowSubFormModal(false);
    };


    
      // Handle outside click to hide options
      useEffect(() => {
        const handleOutsideClick = (e) => {
          if(optionsRef.current && !optionsRef.current.contains(e.target)){
            setShowPeriodicityOptions(false);
          }
        };

        const handleVoucherNumberingOutsideClick = (e) => {
          if(voucherNumberingOptionsRef.current && !voucherNumberingOptionsRef.current.contains(e.target)){
            setShowVoucherNumberingOptions(false);
          }
        };


        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('click', handleVoucherNumberingOutsideClick);


        return() => {
          document.removeEventListener('click', handleOutsideClick);
          document.removeEventListener('click', handleVoucherNumberingOutsideClick);
        }
      }, []);


      // Handle input change
      const handleInputChange = (e) => {
        setVoucher({ ...voucher, restartNumberingPeriodicity: e.target.value });
        setShowPeriodicityOptions(true);  //show the periodicity options when input is changed
      };

      //Handle periodicity option click
      const handlePeriodicityClick = (periodicity) => {
        setVoucher({ ...voucher, restartNumberingPeriodicity: periodicity });
        setShowPeriodicityOptions(false); //Hide the periodicity options
      };

      const periodicityRenderOptions = () => {
        const periodicities = ["Daily", "Monthly", "Weekly", "Yearly"];
        return periodicities.map((periodicity) => (
          <p key={periodicity} tabIndex={0} onClick={() => handlePeriodicityClick(periodicity)} onKeyDown={(e) => {if(e.key === 'Enter'){handlePeriodicityClick(periodicity)} }} className='h-5 pl-1 text-sm focus:bg-yellow-200 focus:outline-none'>{periodicity}</p>
        ))
      };

      //Handle voucher numbering input change
      const handleVoucherNumberingInputChange = (e) => {
        setVoucher({ ...voucher, methodOfVoucherNumbering: e.target.value });
        setShowVoucherNumberingOptions(true);   //show voucher numbering options
      };

      //Handle periodicity option click for voucher numbering
      const handleVoucherNumberingClick = (methodsOfNumbering) =>{
        setVoucher({ ...voucher, methodOfVoucherNumbering: methodsOfNumbering });
        setShowVoucherNumberingOptions(false); //Hide the voucher numbering options
      };

      const voucherNumberRenderingOptions = () => {
        const methodsOfNumberingDatas = ["Automatic", "Manual"];
        return methodsOfNumberingDatas.map((methodOfNumbering) => (
          <p key={methodOfNumbering} tabIndex={0} onClick={() => handleVoucherNumberingClick(methodOfNumbering)} onKeyDown={(e) => {if(e.key === 'Enter'){handleVoucherNumberingClick(methodOfNumbering)} }} className='h-5 pl-2 text-sm focus:bg-yellow-200 focus:outline-none text-left'>{methodOfNumbering}</p>
        ))
      };

      //Function to format date input
      const formatDateInput = (value) => {
        const datePattern = /(\d{1,2})[./-](\d{1,2})[./-](\d{2})/;
        const match = value.match(datePattern);

        if(match){
          const day = match[1];
          const month = match[2];
          const year = match[3];

          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

          const formattedMonth = months[parseInt(month, 10) - 1 ];

          if(formattedMonth){
            return `${day}-${formattedMonth}-20${year}`;
          }
        }
        return value;
      };

      //Handle date input change
      const handleDateInputChange = (e) => {
        const {name, value} = e.target;

        //Format the input value using formatedateinput function
        const formattedValue = formatDateInput(value);

        //Update state based on the input field name
        switch(name) {
          case 'restartNumberingApplicationForm':
            setVoucher({ ...voucher, restartNumberingApplicationForm: formattedValue });
            break;
          case 'prefixDetailsApplicationForm':
            setVoucher({ ...voucher, prefixDetailsApplicationForm: formattedValue});
            break;
          case 'suffixDetailsApplicationForm':
            setVoucher({ ...voucher, suffixDetailsApplicationForm: formattedValue });
            break;
        }
      };
    



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
                                : <input type="text" id='methodOfVoucherNumbering' name='methodOfVoucherNumbering' value={voucher.methodOfVoucherNumbering} onKeyDown={handleKeyDown} onChange={(e) => {handleChange(e); handleVoucherNumberingInputChange(e); }} ref={(input) => {inputRefs.current.methodOfVoucherNumbering = input; }} className='w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                              {showVoucherNumberingOptions && (
                                <div ref={voucherNumberingOptionsRef} className='w-[15%] border text-center text-sm bg-[#CAF4FF] absolute top-[122px] left-[405px]'>
                                  <div className='bg-[#003285] px-5 text-white'>
                                    <p>Methods of Numbering</p>
                                  </div>
                                  {voucherNumberRenderingOptions()}
                                </div>
                              )}
                            
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
                                                            : <input type="text" id='startingNumber' name='startingNumber' value={voucher.startingNumber} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.startingNumber = input; startingNumberRef.current = input; }}  className='w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='ml-2'>
                                                            <label htmlFor="widthOfNumericalPart" className='mr-[11px]'>Width of Numerical Part</label>
                                                            : <input type="text" id='widthOfNumericalPart' name='widthOfNumericalPart' value={voucher.widthOfNumericalPart} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.widthOfNumericalPart = input; }}  className='w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='ml-2'>
                                                            <label htmlFor="prefillWithZero" className='mr-[64.5px]'>Prefil with Zero</label>
                                                            : <input type="text" id='prefillWithZero' name='prefillWithZero' value={voucher.prefillWithZero} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.prefillWithZero = input; }}  className='w-[80px] ml-2 mb-1 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                        </div>

                                                        <div className='flex justify-evenly text-center border border-gray-400 w-[99%] h-[83vh] ml-[5px]'>
                                                            <div className='w-[360px] border border-r-slate-400'>
                                                                <div className='border border-b-slate-400'>
                                                                    <p>Restart Numbering</p>
                                                                </div>

                                                                <div className='flex justify-evenly border border-b-gray-400'>
                                                                    <p>Applicable <br />Form</p>
                                                                    <p>Starting <br />Number</p>
                                                                    <p>Periodicity</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="restartNumberingApplicationForm"></label>
                                                                        <input type="text" id='restartNumberingApplicationForm' name='restartNumberingApplicationForm' onKeyDown={handleKeyDown} value={voucher.restartNumberingApplicationForm} onChange={(e) => {handleChange(e); handleDateInputChange(e); }} ref={(input) => {inputRefs.current.restartNumberingApplicationForm = input; }} className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="restartNumberingStartingNumber"></label>
                                                                        <input type="text" id='restartNumberingStartingNumber' name='restartNumberingStartingNumber' onKeyDown={handleKeyDown} value={voucher.restartNumberingStartingNumber} onChange={handleChange} ref={(input) => {inputRefs.current.restartNumberingStartingNumber = input; }} className='w-[70px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="restartNumberingPeriodicity"></label>
                                                                        <input type="text" id='restartNumberingPeriodicity' name='restartNumberingPeriodicity' onKeyDown={handleKeyDown} value={voucher.restartNumberingPeriodicity} onChange={(e) => {handleChange(e); handleInputChange(e); }} ref={(input) => {inputRefs.current.restartNumberingPeriodicity = input; }} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />

                                                                      {showPeriodicityOptions && (
                                                                        <div ref={optionsRef} className='w-[10%] border text-sm bg-[#CAF4FF] absolute top-[92px] left-[350px]'>
                                                                          <div className='bg-[#003285] px-5 text-white'>
                                                                            <p>Periodicity</p>
                                                                          </div>
                                                                          {periodicityRenderOptions()}
                                                                        </div>
                                                                      )}
                                                                        
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className='w-[360px] border border-r-slate-400'>

                                                                <div className='border border-b-slate-400'>
                                                                    <p>Prefix Details</p>
                                                                </div>

                                                                <div className='flex justify-evenly border border-b-gray-400'>
                                                                    <p>Application <br />Form</p>
                                                                    <p>Particulars</p>
                                                                    
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="prefixDetailsApplicationForm"></label>
                                                                        <input type="text" id='prefixDetailsApplicationForm' name='prefixDetailsApplicationForm' value={voucher.prefixDetailsApplicationForm} onChange={(e) => {handleChange(e); handleDateInputChange(e); }} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.prefixDetailsApplicationForm = input; }} className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="prefixDetailsParticulars"></label>
                                                                        <input type="text" id='prefixDetailsParticulars' name='prefixDetailsParticulars' value={voucher.prefixDetailsParticulars} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.prefixDetailsParticulars = input; }}  className='w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div>

                                                                <div className='w-[360px] border border-b-slate-400'>
                                                                    <p>Suffix Details</p>
                                                                </div>

                                                                <div className='flex justify-evenly border border-b-gray-400'>
                                                                    <p>Application <br />Form</p>
                                                                    <p>Particulars</p>
                                                                </div>

                                                                <div className='flex justify-evenly'>
                                                                    <div>
                                                                        <label htmlFor="suffixDetailsApplicationForm"></label>
                                                                        <input type="text" id='suffixDetailsApplicationForm' name='suffixDetailsApplicationForm' value={voucher.suffixDetailsApplicationForm} onChange={(e) => {handleChange(e); handleDateInputChange(e); }} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.suffixDetailsApplicationForm = input; }}  className='w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="suffixDetailsParticulars"></label>
                                                                        <input type="text" id='suffixDetailsParticulars' name='suffixDetailsParticulars' value={voucher.suffixDetailsParticulars} onChange={handleChange} onKeyDown={handleKeyDown} ref={(input) => {inputRefs.current.suffixDetailsParticulars = input; }} className='w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button type='submit' onClick={handleSubFormSave} ref={subFormSaveButtonRef}  className='text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[315px]'>Save</button>
                                                        <button type='button' onClick={handleSubFormCancel} ref={subFormCancelButtonRef}  className='text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[260px]'>Cancel</button>
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
                <div className='ml-[480px]'>
                    {/* <button type='submit' id='acceptButton' onClick={(e) => onSubmit(e)} ref={(button) => { acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' style={{position: 'absolute', top: '575px'}}>A: Accept</button> */}
                    <input type="button" id='acceptButton' onKeyDown={(e) => {if(e.key === 'Backspace'){e.preventDefault(); if(inputRefs.current.nameOfClass && inputRefs.current.nameOfClass.focus){inputRefs.current.nameOfClass.focus(); }}}} value={"A: Accept"} ref={(button) => {acceptButtonRef.current = button; }} onClick={(e) => onSubmit(e)} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' />

                    <Link to={"/voucherTypeAlter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 ml-[250px]' >Q: Quit</Link>
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