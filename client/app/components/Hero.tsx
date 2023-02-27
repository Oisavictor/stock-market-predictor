import Image from 'next/image'
import businesscrisis from '../assets/businesscrisis.svg'

export default function Hero() {
  return (
    <div className='flex flex-row justify-between px-10 h-screen'>
      <div className='w-1/2 flex justify-center flex-col'>
        <h1 className='text-black text-8xl font-bold'>A smart tool for <span className='text-blue-600'>stock market</span> analysis</h1>
        <p className='font-light text-xl mt-5'>Predict the market movements for smarter investing</p>
        <div className='flex mt-10'>
          <button className='border-2 border-blue-600 flex justify-center items-center px-10 py-2 mr-3 rounded-md font-bold'>View all features</button>
          <button className='flex justify-center items-center px-10 py-2 rounded-md bg-blue-600 text-white font-bold'>Sign up</button>
        </div>
      </div>
      <div className='w-1/2 flex flex-row-reverse'>
        <Image src={businesscrisis} alt='logo'/>
      </div>
    </div>
  )
}
