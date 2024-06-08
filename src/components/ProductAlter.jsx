import React, { useEffect, useRef, useState } from 'react'
import { listOfProducts } from '../services/MasterService';
import { Link } from 'react-router-dom';

const ProductAlter = () => {


  const [productCode, setProductCode] = useState('');


  const [product, setProduct] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const inputRef = useRef(null);


  useEffect(() => {

    inputRef.current.focus();

    listOfProducts().then((response) =>{
      setProduct(response.data);
      setFilteredProducts(response.data);
    }).catch(error =>{
      console.error(error);
    })

  }, []);


  useEffect(() =>{
    filterProduct();
  }, [productCode]);


  const filterProduct = () =>{
    if(productCode === ""){
      setFilteredProducts(product);
    }else{
      const filtered = product.filter(prod => prod.productCode.toLowerCase().includes(productCode.toLowerCase()));
      setFilteredProducts(filtered);
    }
  }



  return (
    <div className='flex'>
      <div className='w-[45%] h-[100vh] bg-[#DDDDDD]'></div>

      <div className='w-[45%] h-[100vh] bg-[#EEEEEE] flex flex-col items-center justify-start'>
        <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
          <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Product Alter</p>
          <input type="text" id='productCode' name='productCode' value={productCode} onChange={(e) => setProductCode(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
        </div>

        <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
          <h2 className='p-1 bg-[#2a67b1] text-white text-center text-[14px]'>List of Product</h2>
          <table>
              <thead>
                  <tr>
                      <th></th>
                  </tr>
              </thead>
              <div className='border border-b-gray-500 w-[347px]'>
                  <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={"/product"}><p className='ml-[285px] text-[14px]'>Create</p></Link>
                  <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={"/alter"}><p className='ml-[287px] text-[14px] '>Back</p></Link>
              </div>
              <tbody>
                  {filteredProducts.map(prod => (
                      <tr key={prod.productCode}>
                            <Link className='block text-center text-[14px] focus:bg-[#FEB941] outline-none' to={`/alterProductMaster/${prod.productCode}`}>
                              <td className='flex justify-center items-center capitalize'>{prod.productCode}</td>
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

export default ProductAlter