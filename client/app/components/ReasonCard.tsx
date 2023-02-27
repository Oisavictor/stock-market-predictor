import Image from 'next/image'
import profits from '../assets/profits.svg'

export default function ReasonCard() {
  return (
    <div className=''>
        <div>
          <Image src={profits} alt='logo'/>
        </div>
        <p>increased profits</p>
    </div>
  )
}
