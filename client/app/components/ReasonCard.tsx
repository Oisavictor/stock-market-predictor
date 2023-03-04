import Image from 'next/image'


export default function ReasonCard({reason, icon, message, color, margin}) {
  return (
    <div className={`${color} p-10 w-60 rounded-xl ${margin} h-fit`}>
        <div>
          <Image src={icon} alt='logo'/>
        </div>
        <p className='font-bold mb-3'>{reason}</p>
        <p className={`w-full text-sm`}>{message}</p>
    </div>
  )
}
