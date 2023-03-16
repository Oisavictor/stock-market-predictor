import react from 'react'
import style from './page.module.css'
import { BlueHeadText, RegularText } from '../components/TextComponents/Texts'
import { Pricingcard } from '../components/PricingCard/PricingCard'

export default function Home() {
  return (
   <div>
    <div className={style.pricing__subWrap}>
      <BlueHeadText name='Choose a Plan' />
      <RegularText name ='Select A plan to get started with investVision premium' />
    </div>
    <Pricingcard />
   </div>
  )
}