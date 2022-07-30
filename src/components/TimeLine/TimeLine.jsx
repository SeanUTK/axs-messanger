import React from "react";
import Moment from "react-moment";

const TimeLine = ({ data }) => {
  const newDate = new Date().toDateString();
  const year = newDate.slice(11, 15);
  const month = newDate.slice(4, 7);
  const week = newDate.slice(0, 4);
  const day = newDate.slice(8, 10);

  const prevSeconds = data.createdAt.toDate();

  const prevD = prevSeconds.toDateString();
  const prevDate = prevSeconds.toJSON();
  const y = prevDate.slice(0, 4);
  const m = prevD.slice(4, 7);
  const w = prevD.slice(0, 3);
  const d = prevD.slice(8, 10);

  return (
    <>
      {year !== y ? (
        <Moment format="MM/DD/YYYY">{data.createdAt.toDate()}</Moment>
      ) : month !== m ? (
        <Moment format="MMM D">{data.createdAt.toDate()}</Moment>
      ) : day !== d ? (
        <Moment format="ddd">{data.createdAt.toDate()}</Moment>
      ) : (
        <Moment format="hh:mm A">{data.createdAt.toDate()}</Moment>
      )}
    </>
  );
};

export default TimeLine;
