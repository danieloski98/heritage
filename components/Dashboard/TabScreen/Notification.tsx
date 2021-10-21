import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

export default function Notification() {
    return (
        <div className='w-screen lg:w-full h-screen pt-8 lg:pt-16 px-2 lg:px-10 overflow-auto'  >
            <div className='w-full items-center flex flex-row' >
                <div className='flex flex-col' >
                    <p className='font-Inter-Bold text-xl'>Notifications</p>
                    {/* <p style={{color:'#02142FA6'}} className='font-Inter-Regular text-xs'>Manage Your Heritage Xchange Profile Here</p> */}
                </div> 
                <div className='w-full flex flex-1' />
                <div style={{backgroundColor:'#FFF'}}  className='w-auto hidden lg:flex mr-2 relative cursor-pointer h-auto p-3 rounded-full' >
                    <IoIosNotificationsOutline style={{color:'#3B4FE6D5'}} className='w-7 h-6 -rotate-12 transform' />
                </div>
            </div>  
            <div className='w-full mt-10 pb-32 lg:pb-4 ' >
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your Transaction is processing. This might take a couple of minutes</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your transaction has been processed successfully</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your transaction failed. Tap Here To Contact Support to resolve this issue.</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your Transaction is processing. This might take a couple of minutes</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your transaction has been processed successfully</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
                <div className='w-full bg-heritagebutton pl-1 my-3 rounded' >
                    <div className='w-full bg-white px-6 py-8 rounded' >
                        <p className='text-sm font-Inter-Medium' >Your transaction failed. Tap Here To Contact Support to resolve this issue.</p>
                        <p className='text-xs font-Inter-Regular text-gray-300 mt-2' >7.30PM | June 21, 2021</p>
                    </div>
                </div>
            </div>
        </div>
    )
}