import react from "react";
import style from "./page.module.css";
import {
  RegularHeadText,
  RegularText,
} from "../components/TextComponents/Texts";
import { Pricingcard } from "../components/PricingCard/PricingCard";

export default function Home() {
  return (
    <div>
      <div className={style.pricing__subWrap}>
        <RegularHeadText color="#0583f8" name="Choose a Plan" />
        <RegularText name="Select A plan to get started with investVision premium" />
      </div>
      <div className={style.pricingCard}>
        {
          pricingList.map((item)=> 
          <Pricingcard 
          key={item.id}
          pricingType={item.type}
          pricingDescription= {item.description}
          pricingPrice={item.price}
          pricingBillPeriod={item.billPeriod}
          pricingDuration= {item.duration}
          pricingExtra={item.extra}
          pricingSubscribeText={item.subscribeText}
          firstDescription ={item.fullDescription.first}
          secondDescription={item.fullDescription.second}
          thirdDescription={item.fullDescription.third}
          fourthDescription={item.fullDescription.fourth}
          fifthDescription={item.fullDescription.fifth }
          />)
        }
      </div>
    </div>
  );
}
 const pricingList = [
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
    billPeriod: "/month",
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
    billPeriod: "/month",
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
