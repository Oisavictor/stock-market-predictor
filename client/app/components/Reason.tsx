import Image from 'next/image'
import logo from '../assets/logo.svg'
import ReasonCard from './ReasonCard'
import profits from '../assets/profits.svg'
import security from '../assets/security.svg'
import clock from '../assets/clock.svg'
import hammer from '../assets/hammer.svg'


export default function Reason() {

  const message1 = 'We offer our client increased profit, by helping our customers or investors identify profitable opportunities and make more informed decisions.'
  const message2 = 'By accurately predicting stock market movements and identifying potential risks, our app can help investors reduce their overall risk exposure.'
  const message3 = 'We provide timely and accurate stock market predictions, that can save investors time and effort spent researching and analysing markets.'
  const message4 = 'We offer our client the most advanced algorithms and analysis tools currently in the market that would help analyse all Markets'


  return (
    <section>
        <div className='flex items-center justify-center'>
            <p className='text-4xl font-bold mr-4 text-black'>why use</p>
            <div >
                <Image src={logo} alt='logo'/>
            </div>
        </div>
        <div className='flex p-10 justify-evenly'>
          <ReasonCard icon={profits} message={message1} reason={'Increased profit'} color={'bg-blue-300'} margin={'mt-0'}/>
          <ReasonCard icon={security} message={message2} reason={'Reduced risk'} color={'bg-pink-200'} margin={'mt-20'}/>
          <ReasonCard icon={clock} message={message3} reason={'Time savings'} color={'bg-green-300'} margin={'mt-0'}/>
          <ReasonCard icon={hammer} message={message4} reason={'Advanced Analysis Tool'} color={'bg-gray-100'} margin={'mt-20'}/>
        </div>
        
    </section>
  )
}
