import Image from 'next/image'
import NewsletterSignUpBox from './NewsletterSignUpBox'
import mailman from '../assets/mailman.svg'

export default function NewsLetter() {
  return (
    <section className='p-10 flex items-center justify-between'>
        <div>
            <p className='font-bold text-5xl text-blue-500 text-center mb-5'>Newsletter signup</p>
            <p className='mb-5'>Subscribe to our newsletter to receive the latest updates and exclusive offers every week. No spam </p>
            <NewsletterSignUpBox/>
        </div>
        <div>
            <Image src={mailman} alt='mailman'/>
        </div>
    </section>
  )
}
