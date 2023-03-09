import client from '../assets/client.png'

import Image from 'next/image'

export default function ClientCard() {
  return (
  <div className='mx-5 h-fit p-10 bg-emerald-100 min-w-[319px] max-w-[319px] rounded-xl flex flex-col justify-center, items-center drop-shadow-lg'>
    <Image src={client} alt="client image"/>
    <p className='font-bold'>Neil Armstrong</p>
    <p className='my-3 text-gray-400'>Entrepreneur & Investor</p>
    <p className='w-50 text-sm text-center'>“ InvestVision is the best platform out there that supports Newbie’s like me that just want to jump into the stock market ”</p>
  </div>
  )
}
