import React from "react";
import style from './page.module.css'
import { RegularHeadText, RegularBoldText, RegularText } from "../components/TextComponents/Texts";

const PricingPayment = () => {
  const pro = 'pro Annual'
  const blue = "#0583f8"
  const black = ""
  return (
    <div className={style.pricing__Wrap}>
      <div className={style.pricing__subWrap}>
        <RegularHeadText color={ blue } name=" Enter your payment information to access our Pro Plan " />
        <RegularText  name = "Your first charge will be after your" />
        <RegularText  name=" FREE TRIAL " />
        <RegularText  name="end" />        <br />
        <RegularText  name="Billing information on your statement will show a charge @@SupportInvestVision.com 569-767-6780”" />
      </div>
      <div className={style.Pruchase__SummaryWrap}>
        <RegularBoldText color="#00000" name="Purchase summary" />
        <RegularText name={` ` +  `purchase` + ` ` + pro} />

      </div>
    </div>
  );
};

export default PricingPayment;
