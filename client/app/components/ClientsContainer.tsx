import ClientCard from "./ClientCard";
import './clientcard.css'

export default function ClientsContainer() {
  return (
    <section className="p-10">
        <p className="text-4xl font-bold text-center mb-5">Our Clients</p>
        <div className="flex justify-evenly overflow-auto w-full clientcard-container">
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
        </div>
    </section>
  )
}
