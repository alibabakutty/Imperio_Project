import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { createNewProductMaster } from '../services/MasterService';
import '../assets/css/font.css';
import axios from 'axios';

const Productmaster = () => {
    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [uom, setUom] = useState('');
    const [productGroup, setProductGroup] = useState('');
    const [standardCost, setStandardCost] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [discount, setDiscount] = useState('');

    const [errors, setErrors] = useState({});

    const [unitsSuggestions, setUnitsSuggestions] = useState([]);
    const [filteredUnitsSuggestions, setFilteredUnitsSuggestions] = useState([]);
    const [showAllUnits, setShowAllUnits] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const inputRefs = useRef({
        productCode: null,
        productDescription: null,
        productCategory: null,
        uom: null,
        productGroup: null,
        standardCost: null,
        sellingPrice: null,
        discount: null
    });

    const productCodeRef = useRef(null);
    const acceptButtonRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Focus on the first input element after the component mounts
        if (productCodeRef.current) {
            productCodeRef.current.focus();
        }

        // fetch units suggestions
        const fetchUnitSuggestions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/master/allUnits');
                console.log(response.data);
                setUnitsSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching unit data:', error);
            }
        };

        fetchUnitSuggestions();

        // Add event listener for Ctrl + Q and Esc to go back
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
              saveProductMaster(event);
            }
          };

          document.addEventListener('keydown', handleKeyDown);
          document.addEventListener('keydown', handleCtrlA);
      

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', handleCtrlA);
          };
    }, [navigate]);


    useEffect(() => {

      if(showModal){
        const handleModalKeyDown = (event) => {
          if(event.key.toLowerCase() === 'y'){
            handleModalConfirm();
          }else if(event.key === 'n'){
            handleModalClose();
          }
        }
  
        document.addEventListener('keydown', handleModalKeyDown);
  
        return() => {
          document.removeEventListener('keydown', handleModalKeyDown);
        }
      };
  
  
    }, [showModal]);
    

    const handleKeyDown = (event) => {
        const { keyCode, target } = event;
    
        if (keyCode === 13) {
          event.preventDefault();
          const currentInputIndex = Object.keys(inputRefs.current).findIndex(
            (key) => key === target.id
          );
          if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
            acceptButtonRef.current.focus();
          } else {
            const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
            nextInputRef.focus();
          }
        } else if (keyCode === 27) {
          setShowModal(true);
        } else if (keyCode === 8 && target.value === '') {
          const currentInputIndex = Object.keys(inputRefs.current).findIndex(
            (key) => key === target.id
          );
          const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
          const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
          prevInputRef.focus();
        }
      };
    

    const handleUomChange = (e) => {
        const value = e.target.value;

        setUom(value);

        if (value.trim() !== '') {
            const filteredSuggestions = unitsSuggestions.filter((unit) => unit.uom.toLowerCase().includes(value.toLowerCase()));
            setFilteredUnitsSuggestions(filteredSuggestions);
        } else {
            setFilteredUnitsSuggestions([]);
        }
    };

    const selectUnit = (unit) => {
        setUom(unit.uom);
        setFilteredUnitsSuggestions([]);
        setShowAllUnits(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!productCode.trim()) {
            newErrors.productCode = 'Product Code is required!';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveProductMaster = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const product = { productCode, productDescription, productCategory, uom, productGroup, standardCost, sellingPrice, discount };

        console.log(product);

        createNewProductMaster(product).then((response) => {
            console.log(response.data);
            navigate('/addedProduct');
        }).catch((error) => {
            console.error('Error creating product master:', error);
        });
    };


    const handleModalClose = () => {
        setShowModal(false);
      };
    
      const handleModalConfirm = () => {
        navigate('/list');
      };

    return (
        <div className='w-1/2 border h-[100vh]'>
            <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
                <h2 className='ml-[200px]'>Product Master</h2>
                <span className='cursor-pointer mt-[5px] mr-2'>
                    <Link to={"/list"}><IoClose /></Link>
                </span>
            </div>

            <div className='w-[550px] h-[33vh] border border-gray-500 ml-[750px]'>
                <form>
                    <div className='input-ldgr mt-3'>
                        <label htmlFor="productCode" className='text-sm mr-[53.5px] ml-2'>Product Code</label>
                        : <input type="text" id='productCode' name='productCode' value={productCode} onChange={(e) => setProductCode(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => { productCodeRef.current = input; inputRefs.current.productCode = input; }} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                        {errors.productCode && <p className='text-red-500 text-xs ml-2'>{errors.productCode}</p>}
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="productDescription" className='text-sm mr-[9.5px] ml-2'>Product Descriptions</label>
                        : <input type="text" id='productDescription' name='productDescription' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productDescription = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="productCategory" className='text-sm mr-[30px] ml-2'>Product Category</label>
                        : <input type="text" id='productCategory' name='productCategory' value={productCategory} onChange={(e) => setProductCategory(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productCategory = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="uom" className='text-sm mr-[55px] ml-2'>Product UOM</label>
                        : <input type="text" id='uom' name='uom' value={uom} onChange={(e) => { setUom(e.target.value); handleUomChange(e); }} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.uom = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    {filteredUnitsSuggestions.length > 0 && (
                        <div className=''>
                            <div className='absolute top-[40px] left-[1030px] bg-[#CAF4FF] w-[20%] border border-gray-500'>
                                <div className='text-center bg-[#003285] text-[13.5px] text-white'>
                                    <p>List Of Uom</p>
                                </div>

                                <ul className='suggestions w-full text-center mt-2'>
                                    {filteredUnitsSuggestions.slice(0, 25).map((unit, index) => (
                                        <li key={index} tabIndex={0} onClick={() => selectUnit(unit)} onKeyDown={(e) => e.key === 'Enter' && selectUnit(unit)} className='suggestion-item focus:bg-[#FEB941] outline-none text-[13px]'>
                                            {unit.uom.toUpperCase()}
                                        </li>
                                    ))}
                                </ul>

                                {filteredUnitsSuggestions.length > 25 && (
                                    <div className='text-center'>
                                        <button type='button' onClick={() => setShowAllUnits(!showAllUnits)} className='text-sm text-blue-500 underline'>
                                            {showAllUnits ? 'Show Less' : 'Show More'}
                                        </button>
                                    </div>
                                )}
                                
                                {showAllUnits && (
                                    <select size='10' className='w-full mt-2' onChange={(e) => selectUnit({ uom: e.target.value })}>
                                        {filteredUnitsSuggestions.slice(25).map((unit, index) => (
                                            <option key={index} value={unit.uom}>
                                                {unit.uom.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    )}

                    <div className='input-ldgr'>
                        <label htmlFor="productGroup" className='text-sm mr-[48.5px] ml-2'>Product Group</label>
                        : <input type="text" id='productGroup' name='productGroup' value={productGroup} onChange={(e) => setProductGroup(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productGroup = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="standardCost" className='text-sm mr-[51px] ml-2'>Standard Cost</label>
                        : <input type="text" id='standardCost' name='standardCost' value={standardCost} onChange={(e) => setStandardCost(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.standardCost = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="sellingPrice" className='text-sm mr-[62px] ml-2'>Selling Price</label>
                        : <input type="text" id='sellingPrice' name='sellingPrice' value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.sellingPrice = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='input-ldgr'>
                        <label htmlFor="discount" className='text-sm mr-[87px] ml-2'>Discount</label>
                        : <input type="text" id='discount' name='discount' value={discount} onChange={(e) => setDiscount(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.discount = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                    </div>

                    <div className='mt-[302px]'>
                        <button type='submit' ref={(button) => { acceptButtonRef.current = button; inputRefs.current.acceptButton = button; }} className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onClick={saveProductMaster}>A: Accept</button>
                    </div>
                </form>
            </div>

            <div className='mt-[310px] ml-[495px]'>
                <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Q: Quit</Link>
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
                  onClick={handleModalConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes, Quit
                </button>
                <button
                  type="button"
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
    );
};

export default Productmaster;
