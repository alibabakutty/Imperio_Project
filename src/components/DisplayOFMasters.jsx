import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const DisplayOFMasters = () => {

    const regionRef = useRef(null);
    const executiveRef = useRef(null);
    const distributorRef = useRef(null);
    const productRef = useRef(null);
    const godownRef = useRef(null);
    const voucherTypeRef = useRef(null);
    const backButtonRef = useRef(null);
    const ledgerRef = useRef(null);

    const links = [voucherTypeRef, ledgerRef, regionRef, executiveRef, distributorRef, productRef, godownRef,  backButtonRef];


    useEffect(() =>{
        if(voucherTypeRef.current){
            voucherTypeRef.current.focus();
        }

        const handleKeyDown = (event) => {
            const currentIndex = links.findIndex(link => link.current === document.activeElement);

            if(event.key === 'ArrowDown'){
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % links.length;
                links[nextIndex].current.focus();
            }else if(event.key === 'ArrowUp'){
                event.preventDefault();

                const prevIndex = (currentIndex - 1 + links.length) % links.length;
                links[prevIndex].current.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [links])
  return (
    <>
      <div className='flex justify-evenly'>
        <div className='w-[90%] flex h-screen'>
          <div className='w-1/2 bg-white'></div>

          <div className='w-1/2 bg-slate-100 flex justify-center items-center flex-col'>
          <div className='w-[300px] h-96 border border-blue-400 text-sm bg-[#def1fc]'>
            <h2 className=' text-white bg-[#2a67b1] px-20'>Display of Masters</h2>

            <ul>
              <li className='py-3 ml-20 text-[10px] text-[#2a67b1]'>
                <h2>DOMSS MASTER</h2>
              </li>

              <Link to={'/voucherTypeFilter'} ref={voucherTypeRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Voucher Type Master</li>
              </Link>

              <Link to={'/ledgerFilter'} ref={ledgerRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Ledger Master</li>
              </Link>

              <Link to={'/regionFilter'} ref={regionRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Region Master</li>
              </Link>

              <Link to={'/executiveFilter'} ref={executiveRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Executive Master</li>
              </Link>

              <Link to={'/distributorFilter'} ref={distributorRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Distributor Master</li>
              </Link>
              
              <Link to={'/productFilter'} ref={productRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Product Master</li>
              </Link>
              
              <Link to={'/godownFilter'} ref={godownRef} className='block outline-none focus:bg-yellow-500 mb-[0.5px]'>
                <li className='w-full pl-20'>Godown Master</li>
              </Link>

              
              
              
            </ul>
            

          </div>

          <div className='mt-[70px]'>
            <Link to="/" ref={backButtonRef} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800 '>Back</Link>
          </div>

          </div>
          

        </div>

      </div>
    
    </>
  )
}

export default DisplayOFMasters