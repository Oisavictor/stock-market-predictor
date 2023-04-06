import React from "react";
import style from "./text.module.css";

export const RegularHeadText = (prop: { name: string; color: string }) => {
  return (
    <h2 style={{ color: prop.color }} className={style.RegularHeadText}>
      {prop.name}
    </h2>
  );
};
export const RegularBoldText = (prop: { name?: string; color?: string }) => {
  return (
    <span style={{ color: prop.color }} className={style.regularBoldText}>
      {prop.name}
    </span>
  );
};
export const RegularMediumText = (props: {
  name?: string;
  className?: string
}) => {
  return (
    <p
      style={{
        fontWeight: 700,
        fontSize: 24,
        lineHeight: "28px",
        letterSpacing: "-0.02em",
      }}
      className={props.className}
    >
      {props.name}
    </p>
  );
};
export const RegularText = (prop: { name?: string; className?: any }) => {
  return (
    <span
      style={{
        fontSize: 14,
        fontWeight: "500",
        lineHeight: "140%",
        fontStyle: "normal",
      }}
      className={prop.className}
    >
      {prop.name}
    </span>
  );
};

export const BlackLargeText = (prop: {
  name: string;
  className: string;
}) => {
  return (
    <h1
      style={{
        fontWeight: 700,
        fontSize: 56,
        letterSpacing: 0,
      }}
      className={prop.className}
    >
      {prop.name}{" "}
    </h1>
  );
};
