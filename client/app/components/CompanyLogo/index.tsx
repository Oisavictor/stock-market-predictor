import React from 'react'
import { RegularHeadText } from '../TextComponents/Texts'
import style from './style.module.css'
 

export const Companylogo = () =>{
    return(
        <div className={style.logoWrap}>
            <RegularHeadText name='Invest' />
            <RegularHeadText name='Vision' />
            <sub>INC</sub>
        </div>
    )
}