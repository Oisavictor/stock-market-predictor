import Image from 'next/image'
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className='py-6 px-6 bg-white flex flex-row justify-between'>
      <Image src={logo} alt='logo'/>
      <ul className='text-black flex flex-row justify-evenly mt-3 ml-20 flex-1'>
        <li>About</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Contact</li>
      </ul>
      <div className='flex flex-row justify-between'> 
        <button className='text-black border-2 border-blue-600 w-30 px-6 mr-10 rounded-lg' >Log in</button>
        <button className='bg-blue-600 w-30 px-6 rounded-lg'>sign up</button>
      </div>
    </header>
  )
}
