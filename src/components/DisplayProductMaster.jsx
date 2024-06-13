import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

const DisplayProductMaster = () => {
  const { productCode } = useParams();

  const [product, setProduct] = useState({
    productCode: "",
    productDescription: "",
    productCategory: "",
    productUom: "",
    productGroup: "",
    standardCost: "",
    sellingPrice: "",
    discount: ""
  });

  const inputRefs = useRef({
    productCode: null,
    productDescription: null,
    productUom: null,
    productCategory: null,
    productGroup: null,
    standardCost: null,
    sellingPrice: null,
    discount: null,
    backButton: null
  });

  const productCodeRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() => {
    if (productCodeRef.current) {
      productCodeRef.current.focus();
    }
    
    loadProduct();


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
        // If the escape key is pressed on the back button, focus on the sellingPrice
        inputRefs.current.discount.focus();
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

  const loadProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/master/displayProduct/${productCode}`);
      setProduct(result.data);
    } catch (error) {
      console.error("Error fetching the product data", error);
    }
  };

  return (
    <div>
      <div className='flex'>
        <div className='w-1/2 h-[100vh] border border-bg-gray-500'></div>

        <div className='w-1/2 border border-bg-gray-500'>
          <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Product Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
              <IoClose />
            </span>
          </div>

          <div className='w-[550px] h-[34vh] border border-gray-500 ml-[80px]'>
            <form>
              <div className='input-ldgr mt-3'>
                <label htmlFor="productCode" className='text-sm ml-2 mr-[59px]'>Product Code</label>
                : <input type="text" id='productCode' name='productCode' value={product.productCode} onKeyDown={handleKeyDown} ref={(input) => { productCodeRef.current = input; inputRefs.current.productCode = input; }} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' readOnly /> <br />
              </div>

              <div className='input-ldgr mt-1'>
                <label htmlFor="productDescription" className='text-sm mr-[22px] ml-2'>Product Description</label>
                : <input type="text" id='productDescription' name='productDescription' value={product.productDescription} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productDescription = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' readOnly />
              </div>

              <div className='input-ldgr'>
                <label htmlFor="productUom" className='text-sm mr-[60px] ml-2'>Product UOM</label>
                : <input type="text" id='productUom' name='productUom' value={product.productUom} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productUom = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' readOnly />
              </div>

              <div className='input-ldgr'>
                <label htmlFor="productCategory" className='text-sm mr-[36px] ml-2'>Product Category</label>
                : <input type="text" id='productCategory' name='productCategory' value={product.productCategory} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productCategory = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' readOnly />
              </div>

              <div className='input-ldgr'>
                <label htmlFor="productGroup" className='text-sm mr-[55px] ml-2'>Product Group</label>
                : <input type="text" id='productGroup' name='productGroup' value={product.productGroup} onChange={(e) => setProduct({ ...product, productGroup: e.target.value })} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.productGroup = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
              </div>

              <div className='input-ldgr'>
                <label htmlFor="standardCost" className='text-sm mr-[57px] ml-2'>Standard Cost</label>
                : <input type="text" id='standardCost' name='standardCost' value={product.standardCost} onChange={(e) => setProduct({ ...product, standardCost: e.target.value })} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.standardCost = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
              </div>

              <div className='input-ldgr'>
                <label htmlFor="sellingPrice" className='text-sm mr-[68px] ml-2'>Selling Price</label>
                : <input type="text" id='sellingPrice' name='sellingPrice' value={product.sellingPrice} onChange={(e) => setProduct({ ...product, sellingPrice: e.target.value })} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.sellingPrice = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
              </div>

                <div className='input-ldgr'>
                    <label htmlFor="discount" className='text-sm mr-[92.5px] ml-2'>Discount</label>
                    : <input type="text" id='discount' name='discount' value={product.discount} onChange={(e) => setDiscount(e.target.value)} onKeyDown={handleKeyDown} ref={(input) => inputRefs.current.discount = input} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                </div>

            </form>
          </div>

          <div className='mt-[305px] ml-[30px]'>
            <Link to={"/productFilter"} id='backButton' ref={(button) => { backButtonRef.current = button; inputRefs.current.backButton = button; }} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>B: Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProductMaster;
