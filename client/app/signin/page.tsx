import SignInFormComponent from "./components/SignInFormComponent";
import Image from 'next/image'
import illustration from './assets/signInIllustration.svg'
// import SuccessComponent from "./components/SuccessComponent";
import achievement from './assets/achievement.svg'


export default function SignupPage() {

    return (
        <div className='h-screen mt-100 pt-100 bg-white flex'>
            <div className="bg-blue-100 w-1/2 rounded-10xl flex items-center justify-center">
                <Image src={illustration} alt='sign up'/>
            </div>
            <SignInFormComponent/>
            {/* <SuccessComponent/> */}
        </div>
    ) 
}
