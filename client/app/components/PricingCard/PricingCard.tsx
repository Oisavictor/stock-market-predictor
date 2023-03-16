import React from "react";
import style from "./pricingcard.module.css";
import {
  BlackLargeText,
  BlackMediumText,
  RegularBoldText,
  RegularText,
} from "../TextComponents/Texts";
import { BlueButton } from "../Button/Button";

export const Pricingcard = () => {
  return (
    <div className={style.pricingCard}>
      {pricingList.map((item) => (
        <div
          className={
            item.type === "Pro" ? style.pricing__subCard2 : style.pricing__subCard
          }
          key={item.id}
        >
          <div className={style.pricingType__wrap}>
            <BlackMediumText name={item.type} />
            <RegularText name={item.description} />
          </div>
          <div className={style.pricingType__wrap2}>
            <BlackLargeText name={"$" + item.price} sup={item.billPeriod} />
            <RegularText name={item.duration} />
          </div>
          <div className={style.pricingType__wrap3}>
            <RegularBoldText name={item.extra} />
            <ul>
              <li>
                <RegularText name={item.fullDescription.first} />
              </li>
              <li>
                <RegularText name={item.fullDescription.second} />
              </li>
              <li>
                <RegularText name={item.fullDescription.third} />
              </li>
              <li>
                <RegularText name={item.fullDescription.fourth} />
              </li>
              <li>
                <RegularText name={item.fullDescription.fifth} />
              </li>
            </ul>
          </div>
          <div className={style.pricingButton__wrap}>
            <BlueButton name={item.subscribeText} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const pricingList = [
  {
    id: "Personal",
    type: "Personal",
    description:
      "Offers basic stock market predictions and analytics. Includes daily notifications on stock market trends.",
    price: "0",
    duration: "Free for 60 days",
    fullDescription: {
      first: "Access to Portfolio Tracking, analysis and monitoring",
      second: "Real-time stock predicition data",
      third: "Access to monthly reports on markets trends",
      fourth: "Alerts for selected stock Price movements",
    },
    subscribeText: "Continue for free",
  },
  {
    id: "Pro",
    type: "Pro",
    description:
      "Offers basic stock market predictions and analytics. Includes daily notifications on stock market trends.",
    price: "10",
    billPeriod: "/monthly",
    duration: "Billed bi-Annually",
    extra: "Everything in Personal plus",
    fullDescription: {
      first: "Access to historical data and analysis tools",
      second: "Access to a larger number of stock tickers",
      third: "Expert guidance on stock selection and trade execution",
      fourth: "Access to educational resources",
    },
    subscribeText: "Subscribe Now",
  },
  {
    id: "Business",
    type: "Business",
    description:
      "Access to exclusive stock market experience, with real-time stock alerts. Chat with a team of experienced financial professionals",
    price: "25",
    billPeriod: "/monthly",
    duration: "Billed Annually",
    extra: "Everything in pro plus",
    fullDescription: {
      first: "Trade all stock in real time on the stock market",
      second: "Access to our Automated trading Bot",
      third: "Copy professional trading Pattern for greater profit ",
      fourth: "Chat with Advance users and Experts",
      fifth: "Access to priority customer support",
    },
    subscribeText: "Subscribe Now",
  },
];
