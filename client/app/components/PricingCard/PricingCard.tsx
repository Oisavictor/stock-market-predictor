import React from "react";
import style from "./pricingcard.module.css";
import {
  BlackLargeText,
  RegularMediumText,
  RegularBoldText,
  RegularText,
} from "../TextComponents/Texts";
import { BlueButton } from "../Button/Button";

export const Pricingcard = (props: {
  pricingType: string;
  pricingDescription: string;
  pricingPrice: string;
  pricingBillPeriod?: string;
  pricingDuration: string;
  pricingExtra?: string;
  pricingSubscribeText: string;
  firstDescription: string;
  secondDescription: string;
  thirdDescription: string;
  fourthDescription: string;
  fifthDescription?: string;
}) => {
  return (
    <div
      className={
        props.pricingType === "Pro"
          ? style.pricing__subCard2
          : style.pricing__subCard
      }
    >
      <div className={style.pricingType__wrap}>
        <RegularMediumText
          name={props.pricingType}
          className={style.pricingType}
        />
        <RegularText name={props.pricingDescription} />
      </div>
      <div className={style.pricingType__wrap2}>
        <div style={{ display: "flex" }}>
          <BlackLargeText
            name={"$" + props.pricingPrice}
            className={style.price}
          />
          <sup
            style={{
              position: "relative",
              top: "15px",
              left: "0",
              fontWeight: "500",
              fontSize: 14
            }}
          >
            {props.pricingBillPeriod}
          </sup>
        </div>
        <RegularText className={style.pricingDuration} name={props.pricingDuration} />
      </div>
      <div className={style.pricingType__wrap3}>
        <RegularBoldText name={props.pricingExtra} />
        <ul>
          <li>
            <RegularText name={props.firstDescription}
             />
          </li>
          <li>
            <RegularText name={props.secondDescription} />
          </li>
          <li>
            <RegularText name={props.thirdDescription} />
          </li>
          <li>
            <RegularText name={props.fourthDescription} />
          </li>
          <li>
            <RegularText name={props.fifthDescription} />
          </li>
        </ul>
      </div>
      <div className={style.pricingButton__wrap}>
        <BlueButton name={props.pricingSubscribeText} />
      </div>
    </div>
  );
};
