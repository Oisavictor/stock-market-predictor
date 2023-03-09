import Image from 'next/image'


export default function ReasonCard(props:{reason:string, icon:string, message:string, color:string, margin:string}) {
  return (
    <div className={`${props.color} p-10 w-60 rounded-xl ${props.margin} h-fit`}>
        <div>
          <Image src={props.icon} alt='logo'/>
        </div>
        <p className='font-bold mb-3'>{props.reason}</p>
        <p className={`w-full text-sm`}>{props.message}</p>
    </div>
  )
}
