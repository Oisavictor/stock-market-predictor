import Image from 'next/image'
import logo from '../assets/logo.svg'
import messanger from '../assets/social/messanger.svg'
import twitter from '../assets/social/twitter.svg'
import whatsapp from '../assets/social/whatsapp.svg'
import phone from '../assets/contact/phone.svg'
import email from '../assets/contact/email.svg'
import location from '../assets/contact/location.svg'

export default function Footer() {
  return (
    <section className='bg-gray-400 flex justify-evenly p-10'>
        <div>
            <div className='mb-5'><Image src={logo} alt='logo'/></div>
            <p className='mb-5 font-bold'>#2, Gown-Obasiki Road, Off Saint Peters Avenue, Port-Harcourt,  Nigeria</p>
            <p className='mb-5 font-bold'>Designed by InvestVision Inc 2023 🔒 All right reserved </p>
        </div>

        <div className='flex flex-col items-center justify-end'>
            <p className='font-bold'>Social Media</p>
            <div className='flex'>
                <Image src={messanger} alt='messanger icon' />
                <Image src={twitter} alt='twitter icon'/>
                <Image src={whatsapp} alt='whatsapp icon'/>
            </div>
        </div>

        <div>
            <p className='text-xl font-bold mb-5'>Quick links</p>
            <p>Home</p>
            <p>About Us</p>
            <p>FAQ</p>
            <p>Get Started</p>
            <p>Developers</p>
        </div>

        <div>
            <p className='text-xl font-bold mb-5'>About us</p>
            <p>Mission</p>
            <p>Vision</p>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Disclaimer</p>
        </div>

        <div>
            <p className='text-xl font-bold mb-5'>Contact Us</p>
            <div className='flex justify-start items-center'>
                <Image src={phone} alt='phone'/>
                <p className='ml-3'>(234) 803-222-1622</p>
            </div>
            <div className='flex justify-start items-center'>
                <Image src={email} alt='email'/>
                <p className='ml-3'>stockprediction23@gmail.com</p>
            </div>
            <div className='flex justify-start items-center'>
                <Image src={location} alt='location'/>
                <p className='ml-3'>2 Godwin Kakaki Road,Lagos</p>
            </div>
        </div>
    </section>
  )
}
