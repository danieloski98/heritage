import { Input, Link } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { motion } from 'framer-motion'; 
import * as yup from 'yup'
import { useFormik } from 'formik'; 
import Router from 'next/router'

export default function recovery() {


    const [modal, setShowModal] = React.useState(0) 
    const [loading, setLoading] = React.useState(false);

    const loginSchema = yup.object({
        code: yup.string().required('Required'), 
    }) 

    // formik
    const formik = useFormik({
        initialValues: {code: ''},
        validationSchema: loginSchema,
        onSubmit: () => {},
    }); 

    const submit = async () => {

            // if (!formik.dirty) { 
            //     setShowModal(3)
            //     const t1 = setTimeout(() => {  
            //         clearTimeout(t1);
            //         setShowModal(0)
            //     }, 1000); 
            //     setLoading(false);
            //   return;
            // }else if (!formik.isValid) { 
            //     setShowModal(3)
            //     const t1 = setTimeout(() => {  
            //         clearTimeout(t1);
            //         setShowModal(0)
            //     }, 1000); 
            //     setLoading(false);
            //   return;
            // }else {
            //     setLoading(true);
            //     const request = await fetch(`https://heritage-server.herokuapp.com/auth/verify`, {
            //         method: 'POST',
            //         headers: {
            //         'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(formik.values),
            //     }); 
        
            //     if (request.status === 200) {    
            //         // console.log(json) 
            //         setShowModal(1)
            //         const t1 = setTimeout(() => { 
            //             setShowModal(0)
            //             Router.push('/dashboard'); 
            //             clearTimeout(t1);
            //         }, 3000);  
            //     }else {
            //         setShowModal(2)
            //         const t1 = setTimeout(() => { 
            //             setShowModal(0) 
            //             clearTimeout(t1);
            //         }, 3000);  
            //         setLoading(false);
            //     } 
            // }
        }

    return (
        <div className=' w-full h-full flex flex-col flex-1' >
            <Head>
                <title>HX - Verify</title>
            </Head>
            {/* <div className='w-full h-auto bg-white' >
                <Navbar />
            </div> */}
            <div className='w-full h-screen flex flex-row bg-white' >
                <div className=' bg-heritagecolor w-full h-screen lg:flex text-white flex-col pt-20 px-10  hidden' >
                    <p className='font-Inter-ExtraBold text-3xl'>HX</p>
                    <p className='font-Inter-ExtraBold text-3xl mt-8' >Buy, Sell And Save <span style={{color: '#617DEA'}} >Crypto</span></p>
                    <p className='font-Inter-Regular text-xs my-3 '>Heritage Exchange offers you a seamless, simple and secure way to buy, sell and<br/> save cryptocurrency</p>
                    <img src='/assets/images/LoginBg.png' alt='login' style={{width: '446px'}} className=' h-auto  ' />
                </div>
                <div className='w-full h-full flex justify-center items-center ' >
                    <div className='bg-white w-full h-full flex justify-center flex-col py-24  py-14 px-6 lg:px-40 rounded-lg' >
                        <p className='font-Inter-ExtraBold text-2xl text-esdiac_text flex lg:hidden mb-8'>HX</p>
                        <p className='font-Inter-SemiBold text-xl text-esdiac_text' >Verify Email Address</p>
                        <p className='font-Inter-Regular my-2 text-xs text-esdiac_text' >Enter the code sent to your email address</p>
                        <div className='w-full flex flex-col py-4' > 
                            <div className='relative w-full flex flex-col py-4 ' > 
                                <p className='Inter-Medium text-xs' >Code</p>
                                <Input 
                                    name="code"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("code", true, true)
                                    }  
                                    size="lg" className=' mt-2 bg-gray_bg border-gray_bg text-primary '  bg="#F6F6F6" focusBorderColor='white' fontSize='sm' borderColor="#F6F6F6" color="#200E32"/>
                            
                                <div className="w-full h-auto pt-2">
                                    {formik.touched.code && formik.errors.code && (
                                        <motion.p
                                            initial={{ y: -100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-Inter-Regular text-errorRed"
                                        >
                                            {formik.errors.code}
                                        </motion.p>
                                    )}
                                </div>
                            </div>  
                        </div> 
                        <Link href='/dashboard'>
                            <button className='w-full h-12 text-white font-Inter-Bold text-xs mr-2 mt-4 bg-heritagebutton rounded-md' >Send Reset Link</button>
                        </Link> 
 
                    </div>
                </div> 
            </div>      
        </div> 
    )
}