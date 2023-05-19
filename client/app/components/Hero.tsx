import Image from 'next/image'
import businesscrisis from '../assets/businesscrisis.svg'
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='flex flex-row justify-between px-10 h-screen'>
      <div className='w-1/2 flex justify-center flex-col'>
        <h1 className='text-black text-6xl font-bold'>A smart tool for <span className='text-blue-600'>stock market</span> analysis</h1>
        <p className='font-light text-xl mt-5'>Predict the market movements for smarter investing</p>
        <div className='flex mt-10'>
          <button className='border-2 border-blue-600 flex justify-center items-center px-10 py-2 mr-3 rounded-md font-bold text-black'>View all features</button>
          <Link href="/signup"><button className='flex justify-center items-center px-10 py-2 rounded-md bg-blue-600 text-white font-bold py-3'>Sign up</button></Link>
        </div>
      </div>
      <div className='w-1/2 flex flex-row-reverse'>
        <Image src={businesscrisis} alt='logo'/>
      </div>
    </section>
  )
}
