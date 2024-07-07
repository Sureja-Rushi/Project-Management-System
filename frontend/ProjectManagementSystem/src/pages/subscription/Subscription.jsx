import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const monthlyPlan = [
  "Add unlimited projects",
  "Access to live Chat",
  "Add unlimited team members",
  "Advance reporting",
  "Priority Support",
  "Customize Support",
  "Intigration Support",
  "Advance Security",
  "Training and resources",
  "Access Control",
  "Custom workflow",
];

const annualPlan = [
  "Add unlimited projects",
  "Access to live Chat",
  "Add unlimited team members",
  "Advance reporting",
  "Priority Support",
  "Everything which monthly plan",
];

const freePlan = [
  "Add only 3 projects",
  "Basic Task management",
  "Project Collaboration",
  "Basic reporting",
  "Email Notification",
  "Basic Access control",
];

const Subscription = () => {
  return (
    <div className="px-10">
      <h1 className="text-5xl font-semibold py-5 pb-5 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <SubscriptionCard
          data={{
            planName: "Free",
            fetures: freePlan,
            planType: "FREE",
            price: 0,
            buttonName: true ? "Current Plan" : "Get Started",
          }}
        />
        <SubscriptionCard data={{
            planName: "Montly Paid Plan",
            fetures: monthlyPlan,
            planType: "MONTHLY",
            price: 799,
            buttonName: true ? "Current Plan" : "Get Started",
          }} />
        <SubscriptionCard data={{
            planName: "Annual Paid Plan",
            fetures: annualPlan,
            planType: "ANNUALLY",
            price: 6711,
            buttonName: true ? "Current Plan" : "Get Started",
          }} />
      </div>
    </div>
  );
};

export default Subscription;
