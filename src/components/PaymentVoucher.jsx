import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const PaymentVoucher = () => {
  return (
    <div className='flex'>
        <div className='#FFF5E1 w-[90%] h-[95vh]' >
            <div className='text-[12px] flex justify-between bg-[#80C4E9]'>
                <p>Accounting Voucher Creation</p>
                <span className='cursor-pointer mt-[5px] mr-2'>
                    <Link to={"/list"} ><IoClose /></Link>
                </span>
            </div>

            <div>
                <div className='flex justify-between items-center text-sm'>
                    <p className='px-16 bg-[#003285] text-white'>Payment</p>
                    <p>No <span className='mr-5'>.</span> 2</p>
                    <div>
                        <p>1-Apr-24</p>
                        <p>Saturday</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="ledgerAccounts" className='mr-5'>Account</label>
                    : <input type="text" id='ledgerAccounts' name='ledgerAccounts' value="Cash" className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                </div>
                <div>
                    <label htmlFor="currentBalance" className='mr-2 text-gray-500'>Current balance</label>
                    : <input type="text" id='currentBalance' name='currentBalance' className='w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                </div>

                <div className='flex justify-between border '>
                    <p>Particulars</p>
                    <p>Amount</p>
                </div>
                
            </div>


            <div className='mt-[400px]'>
                <label htmlFor="narrationForPayment" className='mr-3'>Narration</label>
                : <input type="text" id='narrationForPayment' name='narrationForPayment' className='w-[500px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none'  />

                <label htmlFor="tallyUserName" className='text-blue-800 ml-[200px]'>Tally User Name</label>
                : <input type="text" id='tallyUserName' name='tallyUserName' className='w-[300px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
            </div>
        </div>

        <div className='w-[10%] h-[100vh] border border-sky-500'>
            <p></p>
        </div>
    </div>
  )
}

export default PaymentVoucher