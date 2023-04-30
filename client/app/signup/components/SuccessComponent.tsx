import Image from 'next/image'
import checkIcon from '../assets/signupcheckmark.svg'

export default function SuccessComponent() {
  return (
    <div className='w-1/2 flex flex-col items-center justify-center ' style={{padding:150}}>
        <p className='text-left w-full font-bold mb-5 text-xl'>Account created successfully </p>
        <p className='text-left w-full text-sm mb-10'>Kindly check your email to confirm your registration, <br/>by either 
            clicking on the confirmation link or entering<br/> the confirmation 
            code in the verification page </p>

        <Image src={checkIcon} alt="success"/>
        <button className='w-full bg-blue-600 p-5 rounded-lg font-bold text-white mt-10'>Continue</button>
    </div>
  )
}
