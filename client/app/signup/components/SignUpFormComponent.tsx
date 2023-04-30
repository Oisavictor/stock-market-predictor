import Image from 'next/image'
import logo from '../../assets/logo.svg'

export default function SignUpFormComponent() {
  return (
    <section className='flex flex-col w-1/2' style={{padding: 100}}>
        <div className='mr-60'>
            <Image src={logo} alt='logo'/>
        </div>

        <p className='text-xl font-semibold mt-5'>Create an account</p>
        <p className='mb-5'>start your 30 day free trial</p>

        <form className='w-full'>
            <div className='flex w-full border-b-2 border-black'>
                <p className='p-5'>Name</p>
                <input placeholder='Enter full name ' className='flex-1 p-5 focus:outline-none' required/>
            </div>
            <div className='flex w-full border-b-2 border-black'>
                <p className='p-5'>Email</p>
                <input placeholder='Enter your email here' className='flex-1 p-5 focus:outline-none' required/>
            </div>
            <div className='flex w-full border-b-2 border-black'>
                <p className='p-5'>Password</p>
                <input type='password' className='flex-1 p-5 focus:outline-none' required/>
            </div>
            <div className='flex mt-5'>
                <input type='checkbox'/>
                <p className='ml-5'>I accept the Terms of Service and have read the Privacy Notice</p>
            </div>
            <button className='w-full bg-blue-600 p-5 rounded-lg font-bold text-white mt-10'>Create account</button>
            <p className='text-center'>Have an account? <span className='text-red-500 font-bold'>sign in</span></p>
        </form>
    </section>
  )
}
