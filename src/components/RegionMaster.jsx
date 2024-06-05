import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { createNewRegionMaster } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';

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
  
  const inputRefs = useRef({
    ledgerCode: null,
    ledgerName: null,
    regionMasterId: null,
    regionName: null,
    regionState: null,
    country: null,
    godownCode: null,
    godownName: null,
    acceptButton: null, // Added the accept button reference here
  });

  const ledgerCodeRef = useRef(null);
  const acceptButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Focus on the first input element after the component mounts
    if (ledgerCodeRef.current) {
      ledgerCodeRef.current.focus();
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
        acceptButtonRef.current.focus(); // Focus on the accept button
      } else {
        const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
        nextInputRef.focus();
      }
    } else if (keyCode === 27) { // Escape key
      if (target.id === 'acceptButton') {
        // If the escape key is pressed on the accept button, focus on godownName
        inputRefs.current.godownName.focus();
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

  const validateForm = () => {
    const newErrors = {};
    if(!ledgerCode.trim()){
      newErrors.ledgerCode = 'Ledger Code is required.';
    }
    if(!regionMasterId.trim()){
      newErrors.regionMasterId = 'Region Master Id is required.';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveRegionMaster = (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    const region = { ledgerCode, ledgerName, regionMasterId, regionName, regionState, country };

    console.log(region);

    createNewRegionMaster(region).then((response) => {
      console.log(response.data);
      navigate('/addedRegion');
    }).catch((error) => {
      console.error('Error creating region master:', error);
    });
  };

  return (
    <div className='w-1/2 border h-[100vh]'>
      <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
        <h2 className='ml-[200px]'>Region Master</h2>
        <span className='cursor-pointer mt-[5px] mr-2'>
          <Link to={"/list"}><IoClose /></Link>
        </span>
      </div>

      <div className='w-[550px] h-[35vh] border border-gray-500 ml-[750px]'>

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
              {errors.regionMasterId && <p className='text-red-500 text-xs ml-2'></p>}
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
                onChange={(e) => setGodownCode(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => inputRefs.current.godownCode = input}
                className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                autoComplete='off'
              />
          </div>

          <div className='input-ldgr'>
            <label htmlFor="godownName" className='text-sm mr-[64px] ml-2'>Godown Name</label>
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

          <div className='mt-[300px]'>
            <button
              type='submit'
              ref={(button) => { acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }}
              className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
              id='accptButton'
            >A: Accept</button>
          </div>

        </form>

      </div>

      <div className='mt-[300px] ml-[495px]'>
        <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>
      </div>
    </div>
  )
}

export default RegionMaster;
