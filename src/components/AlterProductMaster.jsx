import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AlterProductMaster = () => {

  let navigate = useNavigate();

    const {productCode} = useParams();                  //Use productCode from URL parameters

    const [product, setProduct] = useState({
        productCode: "",
        productDescription: "",
        productCategory: "",
        productUom: "",
        productGroup: "",
        standardCost: "",
        sellingPrice: ""
      });


    const inputRef = useRef(null);

    const onInputChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    };


    const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/master/alterProductMaster/${productCode}`, product);
      navigate("/alteredProduct");
    } catch (error) {
      console.error("Error updating the product", error);
    }
  };

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
        
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/master/displayProduct/${productCode}`);
            setProduct(result.data);
        }catch(error){
            console.error("Error fetching the executive data",error);
        }
    }



  return (
    <div>
        <div className='flex'>
                <div className='w-1/2 h-[100vh] border border-bg-gray-500'>

                </div>

                <div className='w-1/2 border border-bg-gray-500'>

                    <div className='w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[80px] mt-10 border border-gray-500 border-b-0'>
                        <h2 className='ml-[200px]'>Product Master</h2>
                        <span className='cursor-pointer mt-[5px] mr-2'>
                            <IoClose />
                        </span>
                    </div>

                    <div className='w-[550px] h-[30vh] border border-gray-500 ml-[80px] '>
                        <form onSubmit={(e) => {onSubmit(e)}}>
                            <div className='input-ldgr mt-3'>
                                <label htmlFor="productCode" className='text-sm ml-2 mr-[59px]'>Product Code</label>
                                : <input type="text" id='productCode' name='productCode' value={product.productCode} onChange={onInputChange} ref={inputRef} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' /> <br />
                            </div>

                            <div className='input-ldgr mt-1'>
                                <label htmlFor="productDescription" className='text-sm mr-[15px] ml-2'>Product Descriptions</label>
                                : <input type="text" id='productDescription' name='productDescription' value={product.productDescription} onChange={onInputChange} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            <div className='input-ldgr'>
                                <label htmlFor="productUom" className='text-sm mr-[60px] ml-2'>Product UOM</label>
                                : <input type="text" id='productUom' name='productUom' value={product.productUom} onChange={onInputChange} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>
                            

                            <div className='input-ldgr'>
                                <label htmlFor="productCategory" className='text-sm mr-[36px] ml-2'>Product Category</label>
                                : <input type="text" id='productCategory' name='productCategory' value={product.productCategory} onChange={onInputChange} className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />
                            </div>

                            

                            <div className='input-ldgr    '  >
                                <label htmlFor="productGroup" className='text-sm mr-[53px] ml-2'>Product Group</label>
                                : <input type="text" id='productGroup' name='productGroup' value={product.productGroup} onChange={onInputChange}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                            </div>

                            <div className='input-ldgr    '  >
                                <label htmlFor="standardCost" className='text-sm mr-[55px] ml-2'>Standard Cost</label>
                                : <input type="text" id='standardCost' name='standardCost' value={product.standardCost} onChange={onInputChange}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                            </div>

                            <div className='input-ldgr    '  >
                                <label htmlFor="sellingPrice" className='text-sm mr-[66px] ml-2'>Selling Price</label>
                                : <input type="text" id='sellingPrice' name='sellingPrice' value={product.sellingPrice} onChange={onInputChange}  className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off'    />
                            </div>

                            <div className='mt-[332px]'>
                                <button type='submit' className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'   >A: Accept</button>
                            </div>

                             
                        </form>
                        
                    </div>

                    <div className='mt-[340px] ml-[480px]'>
                    <Link to={"/productFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
                </div>

                    

                </div>
                
            </div>
    </div>
  )
}

export default AlterProductMaster