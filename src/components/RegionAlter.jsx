import React, { useEffect, useRef, useState } from 'react';
import { listOfRegions } from '../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';

const RegionFilter = () => {
    const [regionMasterId, setRegionMasterId] = useState('');
    const [region, setRegion] = useState([]);
    const [filteredRegions, setFilteredRegions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();

        listOfRegions()
            .then((response) => {
                setRegion(response.data);
                setFilteredRegions(response.data.slice(0, 15)); // Initially set filteredRegions to the first 15 regions
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        filterRegions();
    }, [regionMasterId]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setSelectedIndex(prevIndex => (prevIndex + 1) % (filteredRegions.length + 2)); // +2 for Create and Back
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prevIndex => (prevIndex - 1 + (filteredRegions.length + 2)) % (filteredRegions.length + 2)); // +2 for Create and Back
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate('/region');
                } else if (selectedIndex === 1) {
                    navigate('/alter');
                } else if (filteredRegions[selectedIndex - 2]) {
                    navigate(`/alterRegionMaster/${filteredRegions[selectedIndex - 2].regionMasterId}`);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredRegions, selectedIndex, navigate]);

    const filterRegions = () => {
        if (regionMasterId === "") {
            setFilteredRegions(region.slice(0, 15));   //Reset to show the first 15 regions
        } else {
            const filtered = region.filter(reg => reg.regionMasterId.toLowerCase().includes(regionMasterId.toLowerCase())).slice(0, 15);
            setFilteredRegions(filtered);
        }
        setSelectedIndex(filteredRegions.length > 0 ? 3 : 0); // Reset selected index to the first element in the filtered list
    };

    const handleDropdownChange = (e) => {
        const selectedRegionId = e.target.value;
        navigate(`/alterRegionMaster/${selectedRegionId}`);
    };

    return (
        <div className='flex'>
            <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'></div>

            <div className='w-[45%] h-[100vh] bg-[#EEEEEE] flex flex-col items-center justify-start'>
                <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
                    <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Region Alter</p>
                    <input type="text" id='regionMasterId' name='regionMasterId' value={regionMasterId} onChange={(e) => setRegionMasterId(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                </div>

                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className='p-1 bg-[#2a67b1] text-white text-center text-[14px]'>List of Region</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <div className='border border-b-gray-500 w-[347px]'>
                            <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 0 ? 'bg-[#FEB941]' : ''}`} to={"/region"}><p className='ml-[285px] text-[14px]'>Create</p></Link>
                            <Link className={`block text-center text-[14px] focus:bg-[#FEB941] outline-none ${selectedIndex === 1 ? 'bg-[#FEB941]' : ''}`} to={"/alter"}><p className='ml-[270px] text-[14px] px-[30px]'>Back</p></Link>
                        </div>
                        <tbody>
                            {filteredRegions.map((reg, index) => (
                                <tr key={reg.regionMasterId} className={selectedIndex === index + 2 ? 'bg-[#FEB941]' : ''}>
                                    <td className='block text-center text-[14px] focus:bg-[#FEB941] outline-none capitalize'>
                                        <Link to={`/alterRegionMaster/${reg.regionMasterId}`} className='block'>{reg.regionMasterId}</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {region.length > 15 && (
                        <div className='mt-2'>
                            <label htmlFor="regionDropdown" className="block text-center text-[14px] mb-1"></label>
                            <select id="regionDropdown" ref={dropdownRef} className={`w-full border border-gray-600 bg-white p-1 focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ${selectedIndex === 2 ? 'bg-[#FEB941]' : ''}`} onChange={handleDropdownChange}>
                                <option value="" className='block text-center text-[14px]'>Select Other Regions</option>
                                {region.slice(15).map(reg => (
                                    <option key={reg.regionMasterId} value={reg.regionMasterId} className='block text-center text-[14px]'>
                                        {reg.regionMasterId}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className='w-[10%] bg-[#DDDDDD] h-[100vh]'></div>
        </div>
    );
};

export default RegionFilter;
