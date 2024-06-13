import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

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

  const distributorCodeRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() => {
    if (distributorCodeRef.current) {
      distributorCodeRef.current.focus();
    }
    loadDistributor();


    const handleCtrlB = (event) => {
      if(event.ctrlKey && event.key === 'b'){
        event.preventDefault();
        if(backButtonRef.current){
          backButtonRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleCtrlB);

    return () => {
      document.removeEventListener('keydown', handleCtrlB);
    }
  }, []);

  const handleKeyDown = (event) => {
    const { keyCode, target } = event;

    if (keyCode === 13) { // Enter key
      event.preventDefault(); // Prevent form submission
      const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
      );
      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) { // Check if it's the last input field
        backButtonRef.current.focus(); // Focus on the back button
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
      }
    } else if (keyCode === 27) { // Escape key
      if (target.id === 'backButton') {
        // If the escape key is pressed on the back button, focus on contactMobileNo
        inputRefs.current.contactMobileNo.focus();
      } else {
        let currentInputIndex = Object.keys(inputRefs.current).findIndex(
          (key) => key === target.id
        );
        let prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
      }
    }
  };

  const loadDistributor = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/master/displayDistributor/${distributorCode}`);
      setDistributor(result.data);
    } catch (error) {
      console.error("Error fetching the distributor data", error);
    }
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
                    onKeyDown={handleKeyDown}
                    ref={input => {
                      if (index === 0) distributorCodeRef.current = input;
                      inputRefs.current[field.id] = input;
                    }}
                    className='w-[300px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
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
              B: Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayDistributorMaster;
