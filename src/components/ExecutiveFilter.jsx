import React, { useEffect, useRef, useState } from 'react';
import { listOfExecutives } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';

const ExecutiveFilter = () => {
    const [executiveCode, setExecutiveCode] = useState('');
    const [executive, setExecutive] = useState([]);
    const [filteredExecutives, setFilteredExecutives] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();

        listOfExecutives().then((response) => {
            setExecutive(response.data);
            setFilteredExecutives(response.data);
            setSelectedIndex(response.data.length > 0 ? 2 : 0);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        filterExecutives();
    }, [executiveCode]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setSelectedIndex(prevIndex => (prevIndex + 1) % (filteredExecutives.length + 2)); // +2 for create and back
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prevIndex => (prevIndex - 1 + (filteredExecutives.length + 2)) % (filteredExecutives.length + 2));
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate('/executive');
                    e.preventDefault();
                } else if (selectedIndex === 1) {
                    navigate('/display');
                } else if (filteredExecutives[selectedIndex - 2]) {
                    navigate(`/displayExecutive/${filteredExecutives[selectedIndex - 2].executiveCode}`);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredExecutives, selectedIndex, navigate]);

    const filterExecutives = () => {
        if (executiveCode === "") {
            setFilteredExecutives(executive);
        } else {
            const filtered = executive.filter(exe => exe.executiveCode.toLowerCase().includes(executiveCode.toLowerCase()));
            setFilteredExecutives(filtered);
        }
        setSelectedIndex(filteredExecutives.length > 0 ? 2 : 0); // Reset selected index to the first element in the filtered list
    };

    return (
        <>
    
    <div className='flex justify-evenly'>

        <div className='w-[90%] flex h-screen'>
            <div className='w-1/2 bg-white'>
                
            </div> 

            <div className='w-1/2 bg-slate-100 flex justify-center items-center flex-col'>

            <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
                    <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Executive Display</p>
                    <input 
                        type="text" 
                        id='executiveCode' 
                        name='executiveCode' 
                        value={executiveCode} 
                        onChange={(e) => setExecutiveCode(e.target.value)} 
                        ref={inputRef} 
                        className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' 
                        autoComplete='off' 
                    />
                </div>

                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className='p-1 bg-[#2a67b1] text-white text-left text-[13px]'>List of Executives</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <div className='border border-b-gray-500 w-[347px]'>
                            <Link className={`block text-center text-[13px] focus:bg-[#FEB941] outline-none ${selectedIndex === 0 ? 'bg-[#FEB941]' : ''}`} to={"/executive"}>
                                <p className='ml-[285px] text-[14px]'>Create</p>
                            </Link>
                            <Link className={`block text-center text-[13px] focus:bg-[#FEB941] outline-none ${selectedIndex === 1 ? 'bg-[#FEB941]' : ''}`} to={"/display"}>
                                <p className='ml-[287px] text-[14px]'>Back</p>
                            </Link>
                        </div>
                        <tbody>
                            {filteredExecutives.map((exe, index) => (
                                <tr key={exe.executiveCode} className={selectedIndex === index + 2 ? 'bg-[#FEB941]' : ''}>
                                    <td className='flex text-left text-[13px] capitalize pl-2'>
                                        <Link className='block' to={`/displayExecutive/${exe.executiveCode}`}>
                                            {exe.executiveCode}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
    
    </>
    );
}

export default ExecutiveFilter;
