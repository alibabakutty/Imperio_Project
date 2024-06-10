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


    const inputRefs = useRef({
        productCode: null,
        productDescription: null,
        productCategory: null,
        productUom: null,
        productGroup: null,
        standardCost: null,
        sellingPrice: null,
        acceptButton: null
    });


    const productCodeRef = useRef(null);
    const acceptButtonRef = useRef(null);

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
        if(productCodeRef.current){
            productCodeRef.current.focus();
        }
        
        loadProduct();
    }, [productCode]);


    const handleKeyDown = (event) => {
        const { keyCode, target } = event;
    
        if (keyCode === 13) {
          event.preventDefault();
          const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
          if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
            acceptButtonRef.current.focus();
          } else {
            const nextInputRef = Object.values(inputRefs.current)[currentInputIndex + 1];
            nextInputRef.focus();
          }
        } else if (keyCode === 27) {
          if (target.id === 'acceptButton') {
            inputRefs.current.sellingPrice.focus();
          } else {
            const currentInputIndex = Object.keys(inputRefs.current).findIndex((key) => key === target.id);
            const prevInputIndex = (currentInputIndex - 1 + Object.keys(inputRefs.current).length) % Object.keys(inputRefs.current).length;
            const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
            prevInputRef.focus();
          }
        }
      };

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
                            <Link to={"/productAlter"}><IoClose /></Link>
                        </span>
                    </div>

                    <div className='w-[550px] h-[32vh] border border-gray-500 ml-[80px]'>
                        <form onSubmit={onSubmit}>
                            {['productCode', 'productDescription', 'productCategory', 'productUom', 'productGroup', 'standardCost', 'sellingPrice'].map((field) => (
                                <div key={field} className='input-ldgr flex items-center mt-1'>
                                    <label htmlFor={field} className='text-sm ml-2 mr-2 w-[140px]'>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                                    <span className='mr-2'>:</span>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={product[field]}
                                        onChange={onInputChange}
                                        onKeyDown={handleKeyDown}
                                        ref={input => {
                                            if (field === 'productCode') productCodeRef.current = input;
                                            inputRefs.current[field] = input;
                                          }}
                                        className='w-[300px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'
                                    />
                                </div>
                            ))}

                            <div className='mt-[310px]'>
                                <button
                                    type='submit'
                                    id='acceptButton'
                                    ref={button => {
                                        acceptButtonRef.current = button;
                                        inputRefs.current.acceptButton = button;
                                    }}
                                    className='text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800'
                                >
                                    A: Accept
                                </button>
                            </div>
                        </form>
                    </div>



                    <div className='mt-[315px] ml-[480px]'>
                    <Link to={"/productFilter"} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
                </div>

                    

                </div>
                
            </div>
    </div>
  )
}

export default AlterProductMaster