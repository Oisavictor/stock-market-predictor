import Image from 'next/image'
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className='py-6 px-6 bg-white flex flex-row justify-between fixed w-full'>
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
        <button className='text-black border-2 border-blue-600 w-30 px-6 mr-10 rounded-lg font-bold' >Log in</button>
        <button className='bg-blue-600 w-30 px-6 rounded-lg font-bold text-white'>sign up</button>
      </div>
    </header>
  )
}