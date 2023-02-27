import Image from 'next/image'
import logo from '../assets/logo.svg'
import ReasonCard from './ReasonCard'

export default function Reason() {
  return (
    <div>
        <div className='flex items-center justify-center'>
            <p className='text-4xl font-bold mr-4 mt--20'>why use</p>
            <div >
                <Image src={logo} alt='logo'/>
            </div>
        </div>
        <div>
          <ReasonCard/>
        </div>
        
    </div>
  )
}
