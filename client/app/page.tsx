import ClientsContainer from "./components/ClientsContainer";
import Hero from "./components/Hero";
import Reason from "./components/Reason";

export default function Home() {
  return (
    <main  className='bg-white'>
      <Hero/>
      <Reason/>
      <ClientsContainer/>
    </main>
  )
}