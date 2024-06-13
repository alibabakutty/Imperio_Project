import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

const DisplayRegionMaster = () => {
    const { regionMasterId } = useParams();

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

    const inputRefs = useRef({
        ledgerCode: null,
        ledgerName: null,
        regionMasterId: null,
        regionName: null,
        regionState: null,
        country: null,
        godownCode: null,
        godownName: null,
        backButton: null
    });

    const ledgerCodeRef = useRef(null);
    const backButtonRef = useRef(null);

    useEffect(() => {
        if (ledgerCodeRef.current) {
            ledgerCodeRef.current.focus();
        }
        loadRegion();

        const handleCtrlB = (event) => {
            if (event.ctrlKey && event.key === 'b') {
                event.preventDefault();
                if (backButtonRef.current) {
                    backButtonRef.current.click();
                }
            }
        };

        document.addEventListener('keydown', handleCtrlB);
        return () => {
            document.removeEventListener('keydown', handleCtrlB);
        };
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
                // If the escape key is pressed on the back button, focus on godownName
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

    const loadRegion = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/master/displayRegion/${regionMasterId}`);
            setRegion(result.data);
        } catch (error) {
            console.error("Error fetching the region data", error);
        }
    };

    return (
        <div>
            <div className='flex'>
                <div className='w-1/2 h-[100vh] border border-bg-gray-500'></div>
                <div className='w-1/2 border border-bg-gray-500'>
                    <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0'>
                        <h2 className='ml-[200px]'>Region Master</h2>
                        <span className='cursor-pointer mt-[5px] mr-2'>
                            <IoClose />
                        </span>
                    </div>
                    <div className='w-[550px] h-[35vh] border border-gray-500 ml-[80px] '>
                        <form>
                            <div className='input-ldgr mt-3 '>
                                <label htmlFor="ledgerCode" className='text-sm mr-[73px] ml-2'>Ledger Code</label>
                                : <input type="text" id='ledgerCode' name='ledgerCode' value={region.ledgerCode} onKeyDown={handleKeyDown} ref={(input) => { ledgerCodeRef.current = input; inputRefs.current.ledgerCode = input; }} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ' autoComplete='off' />
                            </div>
                            <div className='input-ldgr '>
                                <label htmlFor="ledgerName" className='text-sm mr-[70px] ml-2'>Ledger Name</label>
                                : <input type="text" id='ledgerName' name='ledgerName' value={region.ledgerName} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.ledgerName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ' autoComplete='off' />
                            </div>
                            <div className='input-ldgr '>
                                <label htmlFor="regionMasterId" className='text-sm ml-2 mr-[49px]'>Region Master ID</label>
                                : <input type="text" id='regionMasterId' name='regionMasterId' value={region.regionMasterId} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionMasterId = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' /> <br />
                            </div>
                            <div className='input-ldgr '>
                                <label htmlFor="regionName" className='text-sm mr-[71px] ml-2'>Region Name</label>
                                : <input type="text" id='regionName' name='regionName' value={region.regionName} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='input-ldgr'>
                                <label htmlFor="RegionState" className='text-sm mr-[76px] ml-2'>Region State</label>
                                : <input type="text" id='regionState' name='regionState' value={region.regionState} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.regionState = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='input-ldgr'>
                                <label htmlFor="country" className='text-sm mr-[106px] ml-2'>Country</label>
                                : <input type="text" id='country' name='country' value={region.country} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.country = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='input-ldgr'>
                                <label htmlFor="godownCode" className='text-sm mr-[66.5px] ml-2'>Godown Code</label>
                                : <input type="text" id='godownCode' name='godownCode' value={region.godownCode} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.godownCode = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='input-ldgr'>
                                <label htmlFor="godownName" className='text-sm mr-[65px] ml-2'>Godown Name</label>
                                : <input type="text" id='godownName' name='godownName' value={region.godownName} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.godownName = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                            </div>
                        </form>
                    </div>
                    <div className='mt-[300px] ml-[30px]'>
                        <Link to={"/regionFilter"} id='backButton' ref={(button) => { backButtonRef.current = button; inputRefs.current.backButton = button }} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>B: Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayRegionMaster;
