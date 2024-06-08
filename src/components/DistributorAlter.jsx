import React, { useEffect, useRef, useState } from 'react'
import { listOfDistributors } from '../services/MasterService';
import { Link } from 'react-router-dom';

const DistributorAlter = () => {


  const [distributorCode, setDistributorCode] = useState('');


  const [distributor, setDistributor] = useState([]);


  const [filteredDistributors, setFilteredDistributors] = useState([]);

  const inputRef = useRef(null);


  useEffect(() => {

    inputRef.current.focus();

    listOfDistributors().then((response) =>{
      setDistributor(response.data);
      setFilteredDistributors(response.data);
    }).catch(error =>{
      console.error(error);
    })

  }, []);


  useEffect(() =>{
    filterDistributor();
  }, [distributorCode]);


  const filterDistributor = () => {
    if(distributorCode === ""){
      setFilteredDistributors(distributor);
    }else{
      const filtered = distributor.filter(dis => dis.distributorCode.toLowerCase().includes(distributorCode.toLowerCase()));
      setFilteredDistributors(filtered);
    }
  }


  return (
    <div className='flex'>
      <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'></div>

      <div className='w-[45%] h-[100vh] bg-[#EEEEEE] flex flex-col items-center justify-start'>
        <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
          <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Distributor Alter</p>
          <input type="text" id='executiveCode' name='executiveCode' value={distributorCode} onChange={(e) => setDistributorCode(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' />
        </div>

        <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
          <h2 className='p-1 bg-[#2a67b1] text-white text-center text-[14px]'>List of Distributor</h2>
          <table>
              <thead>
                  <tr>
                      <th></th>
                  </tr>
              </thead>
              <div className='border border-b-gray-500 w-[347px]'>
                  <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={"/distributor"}><p className='ml-[285px] text-[14px]'>Create</p></Link>
                  <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={"/alter"}><p className='ml-[287px] text-[14px] '>Back</p></Link>
              </div>
              <tbody>
                  {filteredDistributors.map(dis => (
                      <tr key={dis.distributorCode}>
                            <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={`/alterDistributorMaster/${dis.distributorCode}`}>
                              <td className='flex justify-center items-center capitalize'>{dis.distributorCode}</td>
                            </Link>
                      </tr>
                  ))}
              </tbody>
          </table>

            
        </div>

                
            </div>

      <div className='w-[10%] bg-[#DDDDDD] h-[100vh]'></div>
    </div>
  )
}

export default DistributorAlter