'use client'

export default function NewsletterSignUpBox() {
  return (
    <div className="flex">
        <input type='email' className="bg-blue-100 flex-1 rounded-l-lg p-2" placeholder="Enter your email address here"/>
        <button className="bg-blue-500 text-base p-2 rounded-r-lg text-white font-bold hover:bg-blue-400">subscribe</button>
    </div>
  )
}
