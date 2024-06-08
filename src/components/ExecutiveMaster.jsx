import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewExecutiveMaster } from '../services/MasterService';
import '../assets/css/font.css'


const ExecutiveMaster = () => {


    const [executiveCode, setExecutiveCode] = useState('');
    const [executiveMaster, setExecutiveMaster] = useState('');
    const [dateOfJoin, setDateOfJoin] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [status, setStatus] = useState('');

    const [errors, setErrors] = useState({});


    const inputRefs = useRef({
        executiveCode: null,
        executiveMaster: null,
        dateOfJoin: null,
        mobileNo: null,
        emailId: null,
        status: null,
        acceptButton: null
    });


    const executiveCodeRef = useRef(null);
    const acceptButtonRef = useRef(null);


    const navigator = useNavigate();


    useEffect(() =>{
        // Focus on the first input element after the component mounts
        if(executiveCodeRef.current){
            executiveCodeRef.current.focus();
        }

        // Add event listener for Ctrl + B to go back
        const handleCtrlB = (event) => {
            if(event.ctrlKey && event.key === 'b'){
                event.preventDefault();
                navigator('/list')
            }
        };

        document.addEventListener('keydown', handleCtrlB);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleCtrlB);
        };
        
    }, [navigator]);


    const handleKeyDown = (event) => {
        const {keyCode, target} = event;

        if(keyCode === 13){   //Enter Key
            event.preventDefault();    //prevent form submission
            const currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            if(currentInputIndex === Object.keys(inputRefs.current).length - 2){      //check if it is the last input field
                acceptButtonRef.current.focus();   //focus on the accept button
            }else{
                const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
                nextInputRef.focus();
            }
        }else if(keyCode === 27){   //Escape Key
            
            let currentInputIndex = Object.keys(inputRefs.current).findIndex( (key) => key === target.id );

            let prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;

            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];

            prevInputRef.focus();

        }
    };



    const validateForm = () => {
        const newErrors = {};
        if(!executiveCode.trim()){
            newErrors.executiveCode = 'Executive Code is required!.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    function saveExecutiveMaster(e){
        e.preventDefault();


        if(!validateForm()){
            return;
        }

        const executive = {executiveCode, executiveMaster, dateOfJoin, mobileNo, emailId, status};

        console.log(executive);


        createNewExecutiveMaster(executive).then((response) => {
            console.log(response.data);
            navigator('/addedExecutive')
        }).catch((error) => {
            console.error('Error creating executive master:', error);
        })
    }



  return (
    <div className='w-1/2 border h-[100vh]'>

        <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Executive Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
                <Link to={"/list"}><IoClose /></Link>
            </span>
        </div>

        <div className='w-[550px] h-[30vh] border border-gray-500 ml-[750px] '>


            <form>
                

                <div className='input-ldgr  mr-4 mt-3 ' >
                    <label htmlFor="executiveCode" className='text-sm mr-[30px] ml-2'>Executive Code</label>
                    : <input type="text" id='executiveCode' name='executiveCode' value={executiveCode} onChange={(e) => setExecutiveCode(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => {executiveCodeRef.current = input; inputRefs.current.executiveCode = input; }} className='w-[300px] ml-[6px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ' autoComplete='off'  /> <br />
                    

                    {errors.executiveCode  && <p className='text-red-500 text-xs ml-2'>{errors.executiveCode}</p>}
                </div>

                <div className='input-ldgr  mr-4 mt-1 ' >
                    <label htmlFor="executiveMaster" className='text-sm mr-[21px] ml-2' >Executive Master</label>
                    : <input type="text" id='executiveMaster' name='executiveMaster' value={executiveMaster} onChange={(e) => setExecutiveMaster(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.executiveMaster = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'   />
                    
                </div>


                <div className='input-ldgr    '  >
                    <label htmlFor="dateOfJoin" className='text-sm mr-[54px] ml-2'>Date of Join</label>
                    : <input type="text" id='dateOfJoin' name='dateOfJoin' value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.dateOfJoin = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="mobileNo" className='text-sm mr-[64px] ml-2'>Mobile No</label>
                    : <input type="text" id='mobileNo' name='mobileNo' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.mobileNo = input}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>


                <div className='input-ldgr    '  >
                    <label htmlFor="emailId" className='text-sm mr-[77px] ml-2'>Email ID</label>
                    : <input type="text" id='emailId' name='emailId' value={emailId} onChange={(e) => setEmailId(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.emailId = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                
                <div className='input-ldgr    '  >
                    <label htmlFor="status" className='text-sm mr-[89px] ml-2'>Status</label>
                    : <input type="text" id='status' name='status'  value={status} onChange={(e) => setStatus(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.status = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>
                

                <div className='mt-[350px] '>
                    <button type='submit' ref={(button) => {acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onClick={saveExecutiveMaster}   >A: Accept</button>
                </div>


            </form>
            
        </div>

        <div className='mt-[335px] ml-[495px]'>

            

            <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>B: Back</Link>

        </div>



    </div>
  )
}

export default ExecutiveMaster