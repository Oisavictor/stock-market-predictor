import ClientsContainer from "./components/ClientsContainer";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NewsLetter from "./components/NewsLetter";
import Reason from "./components/Reason";

export default function Home() {
  return (
    <main  className='bg-white'>
      <Hero/>
      <Reason/>
      <ClientsContainer/>
      <NewsLetter/>
      <Footer/>
    </main>
  )
}