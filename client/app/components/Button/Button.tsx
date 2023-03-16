import React from 'react'
import style from './button.module.css'

export const BlueButton = (props: {name:string}) => {
    return(
        <button className={style.blueButton}>{props.name}</button>
    )
} 