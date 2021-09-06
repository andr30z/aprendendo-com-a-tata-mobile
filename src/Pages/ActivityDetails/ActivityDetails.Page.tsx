import React from "react";
import { ComparationBetweenObjects } from "../../Activities";
import { ComparationBetweenObjectsActivityItem } from "../../Activities/Interfaces";
import YellowRight from "../../Illustrations/cloud-yellow-right.svg";
import WhiteRight from "../../Illustrations/cloud-white-right.svg";
import WhiteLeft from "../../Illustrations/cloud-white-left.svg";
import YellowLeft from "../../Illustrations/cloud-yellow-left.svg";
import BlueLeft from "../../Illustrations/cloud-blue-left.svg";
import BlueRight from "../../Illustrations/cloud-blue-right.svg";
import RedRight from "../../Illustrations/cloud-red-right.svg";
import RedLeft from "../../Illustrations/cloud-red-left.svg";

const comparationStages: ComparationBetweenObjectsActivityItem[][] = [
  [
    {
      comparationBondValue: "6",
      id: "1",
      receiver: false,
      image: RedLeft,
      borderColorOnSuccessDrag: "#ccdfff",
    },
    {
      comparationBondValue: "5",
      id: "2",
      receiver: false,
      image: YellowRight,
      borderColorOnSuccessDrag: "#f79f7c",
    },
    {
      comparationBondValue: "4",
      id: "3",
      receiver: false,
      image: BlueLeft,
      borderColorOnSuccessDrag: "#ffee80",
    },
    {
      comparationBondValue: "3",
      id: "4",
      receiver: true,
      imageText: "Azul",
      borderColorOnSuccessDrag: "#eecbff",
    },
    {
      comparationBondValue: "1",
      id: "6",
      receiver: true,
      imageText: "Vermelho",
      borderColorOnSuccessDrag:'#6cad0e'
    },
    {
      comparationBondValue: "2",
      id: "5",
      receiver: true,
      imageText: "Amarelo",
      borderColorOnSuccessDrag:'#282e54'
    },
  ],
  [
    { comparationBondValue: "6", id: "1", receiver: false, image: WhiteRight, borderColorOnSuccessDrag:'#01786f' },
    { comparationBondValue: "5", id: "2", receiver: false, image: RedRight, borderColorOnSuccessDrag:'#ffe4e1' },
    { comparationBondValue: "4", id: "3", receiver: false, image: BlueRight, borderColorOnSuccessDrag:'#bd3939' },
    {
      comparationBondValue: "3",
      id: "4",
      receiver: true,
      imageText: "Azul",
      borderColorOnSuccessDrag:'#f622e3'
    },
    {
      comparationBondValue: "2",
      id: "5",
      receiver: true,
      imageText: "Vermelho",
      borderColorOnSuccessDrag:'#b1afe7'
    },
    {
      comparationBondValue: "1",
      id: "6",
      receiver: true,
      imageText: "Branco",
      borderColorOnSuccessDrag:'#bbffcc'
    },
  ],
];
const ActivityDetails = () => {
  return (
    <ComparationBetweenObjects
      activityUtterance="LIGUE AS NUVENS DE ACORDO COM AS CORES"
      comparationStages={comparationStages}
    />
  );
};

export default ActivityDetails;
