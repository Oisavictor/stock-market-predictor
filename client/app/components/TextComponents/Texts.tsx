import React from "react";
import style from "./text.module.css";

export const BlueHeadText = (prop: { name: string }) => {
  return <h2 className={style.blueHeadText}>{prop.name}</h2>;
};
export const RegularText = (prop: { name: string | undefined }) => {
  return <span className={style.regularText}>{prop.name}</span>;
};
export const RegularBoldText = (prop: { name: string | undefined }) => {
  return <span className={style.regularBoldText}>{prop.name}</span>;
};
export const BlackMediumText = (prop: { name: string }) => {
  return <p className={style.blackMediumText}>{prop.name}</p>;
};
export const BlackLargeText = (prop: { name: any, sup: any}) => {
  return (
    <p className={style.blackLargeText}>
      {prop.name}{" "}
      <sup>
        <RegularText name={prop.sup} />
      </sup>
    </p>
  );
};
