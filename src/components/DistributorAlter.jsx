import React, { useEffect, useRef, useState } from 'react'
import { listOfDistributors } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';

const DistributorFilter = () => {

  const [distributorCode, setDistributorCode] = useState('');


  const [distributor, setDistributor] = useState([]);


  const [filteredDistributors, setFilteredDistributors] = useState([]);

  const [selectedIndex,  setSelectedIndex] = useState(0);

  const inputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {

    inputRef.current.focus();

    listOfDistributors().then((response) =>{
      console.log(response.data);
      setDistributor(response.data);
      setFilteredDistributors(response.data);
    }).catch(error =>{
      console.error(error);
    })

  }, []);


  useEffect(() => {
    filterDistributors();
  }, [distributorCode]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
          setSelectedIndex(prevIndex => (prevIndex + 1) % (filteredDistributors.length + 2)); // +2 for create and back
      } else if (e.key === 'ArrowUp') {
          setSelectedIndex(prevIndex => (prevIndex - 1 + (filteredDistributors.length + 2)) % (filteredDistributors.length + 2));
      } else if (e.key === 'Enter') {
          if (selectedIndex === 0) {
              navigate('/distributor');
          } else if (selectedIndex === 1) {
              navigate('/alter');
          } else if (filteredDistributors[selectedIndex - 2]) {
              navigate(`/alterDistributorMaster/${filteredDistributors[selectedIndex - 2].distributorCode}`);
          }
      }
  };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredDistributors, selectedIndex, navigate]);


  const filterDistributors = () => {
    if(distributorCode === ""){
      setFilteredDistributors(distributor)
    }else{
      const filtered = distributor.filter(dis => dis.distributorCode.toLowerCase().includes(distributorCode.toLowerCase()));
      setFilteredDistributors(filtered);
    }
    setSelectedIndex(filteredDistributors.length > 0 ? 2 : 0);   //Reset selected index to the first element in the filtered list
  };

  return (
    <div className='flex'>
      <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'></div>

      <div className='w-[45%] h-[100vh] bg-[#EEEEEE] flex flex-col items-center justify-start'>
        <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
          <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Distributor Alter</p>
          <input type="text" id='executiveCode' name='executiveCode' value={distributorCode} onChange={(e) => setDistributorCode(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
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
                  <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 0 ? 'bg-[#FEB941]' : ''}`} to={"/distributor"}><p className='ml-[285px] text-[14px]'>Create</p></Link>
                  <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 1 ? 'bg-[#FEB941]' : ''}`} to={"/alter"}><p className='ml-[287px] text-[14px] '>Back</p></Link>
              </div>
              <tbody>
                  {filteredDistributors.map((dis, index) => (
                    <tr key={dis.distributorCode} className={selectedIndex === index + 2 ? 'bg-[#FEB941]' : ''}>
                      <td className='flex justify-center items-center capitalize'>
                          <Link className='block' to={`/alterDistributorMaster/${dis.distributorCode}`}>
                            {dis.distributorCode}
                          </Link>
                      </td>
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

export default DistributorFilter