import React, { useEffect, useRef, useState } from 'react'
import { listOfGodowns } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';


const GodownFilter = () => {


  const [godownCode, setGodownCode] = useState('');

  const [godown, setGodown] = useState([]);

  const [filteredGodowns, setFilteredGodowns] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() =>{
    inputRef.current.focus();

    listOfGodowns().then((response) =>{
      console.log(response.data);
      setGodown(response.data);
      setFilteredGodowns(response.data);
    }).catch(error=>{
      console.error(error);
    })
  }, []);

  useEffect(() =>{
    filterGodowns();

  }, [godownCode]);

  

  useEffect(() => {

    const handleKeyDown = (e) => {
      if(e.key === 'ArrowDown'){
        setSelectedIndex(prevIndex => (prevIndex + 1) % (filteredGodowns.length + 2));
      }else if(e.key === 'ArrowUp'){
        setSelectedIndex(prevIndex => (prevIndex -1 + (filteredGodowns.length + 2)) % (filteredGodowns.length + 2));
      }else if(e.key === 'Enter'){
        if(selectedIndex === 0){
          navigate('/godown')
          e.preventDefault();
        }else if(selectedIndex === 1){
          navigate('/display');
        }else if(filteredGodowns[selectedIndex - 2]){
          navigate(`/displayGodown/${filteredGodowns[selectedIndex - 2].godownCode}`);
        }
      }
    };


    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [filteredGodowns, selectedIndex, navigate]);

  const filterGodowns = () =>{
    if(godownCode === ""){
      setFilteredGodowns(godown);
    }else{
      const filtered = godown.filter(god => god.godownCode.toLowerCase().includes(godownCode.toLowerCase()));
      setFilteredGodowns(filtered);
    }
    setSelectedIndex(filteredGodowns.length > 0 ? 2 : 0);
  };

  return (
    <div className='flex'>
      <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'></div>

      <div className='w-[45%] h-[100vh] bg-[#EEEEEE] flex flex-col items-center justify-start'>
        <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
          <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Godown Display</p>
          <input type="text" id='executiveCode' name='executiveCode' value={godownCode} onChange={(e) => setGodownCode(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
        </div>

        <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
          <h2 className='p-1 bg-[#2a67b1] text-white text-center text-[14px]'>List of Godown</h2>
          <table>
              <thead>
                  <tr>
                      <th></th>
                  </tr>
              </thead>
              <div className='border border-b-gray-500 w-[347px]'>
                  <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 0 ? 'bg-[#FEB941]' : ''}`} to={"/godown"}><p className='ml-[285px] text-[14px]'>Create</p></Link>
                  <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 1 ? 'bg-[#FEB941]' : ''}`} to={"/display"}><p className='ml-[287px] text-[14px] '>Back</p></Link>
              </div>
              <tbody>
                  {filteredGodowns.map((god, index) => (
                      <tr key={god.godownCode} className={selectedIndex === index + 2 ? 'bg-[#FEB941]' : ''}>
                            <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={`/displayGodown/${god.godownCode}`}>
                              <td className='flex justify-center items-center capitalize'>{god.godownCode}</td>
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

export default GodownFilter