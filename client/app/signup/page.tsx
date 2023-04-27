import SignUpFormComponent from "./components/SignUpFormComponent";
import Image from 'next/image'
import illustration from './assets/sigupIllustrations.svg'


export default function SignupPage() {
    return (
        <div className='h-screen mt-100 pt-100 bg-white flex'>
            <SignUpFormComponent/>
            <div className="bg-blue-100 w-1/2 rounded-10xl">
                <Image src={illustration} alt='sign up'/>
            </div>
        </div>
    ) 
}
 