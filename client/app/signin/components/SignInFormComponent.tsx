import Image from 'next/image'
import logo from '../../assets/logo.svg'

export default function SignInFormComponent() {
  return (
    <section className='flex flex-col w-1/2' style={{padding: 100}}>
        <div className='mr-60'>
            <Image src={logo} alt='logo'/>
        </div>

        <p className='text-xl font-semibold mt-5'>Welcome back</p>
        <p className='mb-5'>Welcome back, please enter your details</p>

        <form className='w-full'>
            <div className='flex w-full border-b-2 border-black'>
                <p className='p-5'>Email</p>
                <input placeholder='Enter your email here' className='flex-1 p-5 focus:outline-none' required/>
            </div>
            <div className='flex w-full border-b-2 border-black'>
                <p className='p-5'>Password</p>
                <input type='password' className='flex-1 p-5 focus:outline-none' required/>
            </div>
            <p className='text-end text-blue-600'>forgot password?</p>
            <button className='w-full bg-blue-600 p-5 rounded-lg font-bold text-white mt-10'>Login</button>
            <p className='text-center'>Don't have an account? <span className='text-red-500 font-bold'>sign up</span></p>
        </form>
    </section>
  )
}
