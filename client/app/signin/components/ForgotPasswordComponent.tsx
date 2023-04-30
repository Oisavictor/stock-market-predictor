'use client'
import { useState } from "react"

export default function ForgotPasswordComponent() {

    const [showResetForm, setShowResetForm] = useState<boolean>(false)

    const EmailInputForm =()=>{
        return(
            <form>
                <p className='text-xl font-semibold mt-5'>Forgot Password?</p>
                <p className='mb-20'>Enter your email and we will send reset instructions to your registered email</p>
    
                <div className='flex w-full border-b-2 border-black'>
                    <p className='p-5'>Email</p>
                    <input placeholder='Enter your email here' className='flex-1 p-5 focus:outline-none' required/>
                </div>
                <button className='w-full bg-blue-600 p-3 rounded-lg font-bold text-white mt-10' onClick={()=>{setShowResetForm(true)}}>Continue</button>
            </form>
        )
    }
    
    const ResetForm =()=>{
        return(
            <form>
                <p className='text-xl font-semibold mt-5 mb-10'>Reset Password</p>
    
                <div className='flex w-full border-b-2 border-black'>
                    <p className='p-5'>Code</p>
                    <input placeholder='Enter the code sent to your email' className='flex-1 p-5 focus:outline-none' required/>
                </div>
                <div className='flex w-full border-b-2 border-black'>
                    <p className='p-5'> New Password</p>
                    <input type='password' className='flex-1 p-5 focus:outline-none' required/>
                </div>
                <div className='flex w-full border-b-2 border-black'>
                    <p className='p-5'>Confirm Password</p>
                    <input type='password' className='flex-1 p-5 focus:outline-none' required/>
                </div>
                <button className='w-full bg-blue-600 p-3 rounded-lg font-bold text-white mt-10'>Continue</button>
            </form>
        )
    }

  return (
    <section className='flex flex-col w-1/2 justify-center' style={{padding: 100}}>
        {showResetForm? (<ResetForm/>):(<EmailInputForm/>)}
        
    </section>
  )
}


