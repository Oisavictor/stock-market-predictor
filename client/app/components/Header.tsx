import Image from 'next/image'
import logo from '../assets/logo.svg'
import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-6 px-6 bg-white flex flex-row justify-between sticky w-full z-10'>
      <div className='mr-60'>
        <Image src={logo} alt='logo'/>
      </div>
      
      <ul className='text-black flex flex-row justify-evenly mt-3 ml-20 flex-1'>
        <li className='hover:text-blue-600 cursor-pointer font-bold'>About</li>
        <li className='hover:text-blue-600 cursor-pointer font-bold'>Features</li>
        <li className='hover:text-blue-600 cursor-pointer font-bold'>Pricing</li>
        <li className='hover:text-blue-600 cursor-pointer font-bold'>Contact</li>
      </ul>
      <div className='flex flex-row justify-between'> 
        <Link href="/signin"><button className='text-black border-2 border-blue-600 w-30 px-6 mr-10 rounded-lg font-bold py-3' >Log in</button></Link>
        <Link href="/signup"><button className='bg-blue-600 w-30 px-6 rounded-lg font-bold text-white py-3'>sign up</button></Link>
      </div>
    </header>
  )
}