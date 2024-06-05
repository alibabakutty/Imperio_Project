import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { createNewProductMaster } from '../services/MasterService';
import '../assets/css/font.css'

const Productmaster = () => {



    const [productCode, setProductCode] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productUom, setProductUom] = useState('');
    const [productGroup, setProductGroup] = useState('');
    const [standardCost, setStandardCost] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');

    const inputRef = useRef(null);

    const navigator = useNavigate();


    useEffect(() =>{
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, []);


    function saveProductMaster(e){

        e.preventDefault();

        const product = {productCode, productDescription, productCategory, productUom, productGroup, standardCost, sellingPrice};

        console.log(product);


        createNewProductMaster(product).then((response) => {

            console.log(response.data);

            navigator('/addedProduct');
        }).catch((error) => {
            console.error('Error creating product master:', error);
        })
    }



  return (
    <div className='w-1/2 border h-[100vh]'>

        <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0'>
            <h2 className='ml-[200px]'>Product Master</h2>
            <span className='cursor-pointer mt-[5px] mr-2'>
                <IoClose />
            </span>
        </div>

        <div className='w-[550px] h-[30vh] border border-gray-500 ml-[750px]  '>


            <form>
                

                <div className='input-ldgr mt-3   '  >
                    <label htmlFor="productCode" className='text-sm mr-[53.5px] ml-2'>Product Code</label>
                    : <input type="text" id='productCode' name='productCode' value={productCode} onChange={(e) => setProductCode(e.target.value)} ref={inputRef}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="productDescription" className='text-sm mr-[9.5px] ml-2'>Product Descriptions</label>
                    : <input type="text" id='productDescription' name='productDescription' value={productDescription} onChange={(e) => setProductDescription(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="productUom" className='text-sm mr-[55px] ml-2'>Product UOM</label>
                    : <input type="text" id='productUom' name='productUom' value={productUom} onChange={(e) => setProductUom(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="productCategory" className='text-sm mr-[30px] ml-2'>Product Category</label>
                    : <input type="text" id='productCategory' name='productCategory' value={productCategory} onChange={(e) => setProductCategory(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                

                <div className='input-ldgr    '  >
                    <label htmlFor="productGroup" className='text-sm mr-[48.5px] ml-2'>Product Group</label>
                    : <input type="text" id='productGroup' name='productGroup' value={productGroup} onChange={(e) => setProductGroup(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="standardCost" className='text-sm mr-[51px] ml-2'>Standard Cost</label>
                    : <input type="text" id='standardCost' name='standardCost' value={standardCost} onChange={(e) => setStandardCost(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='input-ldgr    '  >
                    <label htmlFor="sellingPrice" className='text-sm mr-[62px] ml-2'>Selling Price</label>
                    : <input type="text" id='sellingPrice' name='sellingPrice' value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                </div>

                <div className='mt-[380px] '>
                    <button type='submit' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800' onClick={saveProductMaster}   >A: Accept</button>
                </div>

            </form>
            
        </div>

        <div className='mt-[380px] ml-[495px]'>

            <Link to={"/list"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800'>Back</Link>

        </div>


    </div>
  )
}

export default Productmaster