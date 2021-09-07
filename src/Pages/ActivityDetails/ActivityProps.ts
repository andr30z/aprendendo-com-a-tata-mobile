import {
  ShapesAndColorsInterface,
  ShapesAndColorsActivityStage,
} from "../../Activities/Interfaces";
import BlueLeft from "../../Illustrations/cloud-blue-left.svg";
import BlueRight from "../../Illustrations/cloud-blue-right.svg";
import RedLeft from "../../Illustrations/cloud-red-left.svg";
import RedRight from "../../Illustrations/cloud-red-right.svg";
import WhiteRight from "../../Illustrations/cloud-white-right.svg";
import YellowRight from "../../Illustrations/cloud-yellow-right.svg";
import YellowLeft from "../../Illustrations/cloud-yellow-left.svg";

const comparationStages = [
  [
    {
      comparationBondValue: "6",
      _id: "1",
      receiver: false,
      image: RedLeft,
      borderColorOnSuccessDrag: "#ccdfff",
    },
    {
      comparationBondValue: "5",
      _id: "2",
      receiver: false,
      image: YellowRight,
      borderColorOnSuccessDrag: "#f79f7c",
    },
    {
      comparationBondValue: "4",
      _id: "3",
      receiver: false,
      image: BlueLeft,
      borderColorOnSuccessDrag: "#ffee80",
    },
    {
      comparationBondValue: "3",
      _id: "4",
      receiver: true,
      imageText: "Azul",
      borderColorOnSuccessDrag: "#eecbff",
    },
    {
      comparationBondValue: "1",
      _id: "6",
      receiver: true,
      imageText: "Vermelho",
      borderColorOnSuccessDrag: "#6cad0e",
    },
    {
      comparationBondValue: "2",
      _id: "5",
      receiver: true,
      imageText: "Amarelo",
      borderColorOnSuccessDrag: "#282e54",
    },
  ],
  [
    {
      comparationBondValue: "6",
      _id: "1",
      receiver: false,
      image: WhiteRight,
      borderColorOnSuccessDrag: "#01786f",
    },
    {
      comparationBondValue: "5",
      _id: "2",
      receiver: false,
      image: RedRight,
      borderColorOnSuccessDrag: "#ffe4e1",
    },
    {
      comparationBondValue: "4",
      _id: "3",
      receiver: false,
      image: BlueRight,
      borderColorOnSuccessDrag: "#bd3939",
    },
    {
      comparationBondValue: "3",
      _id: "4",
      receiver: true,
      imageText: "Azul",
      borderColorOnSuccessDrag: "#f622e3",
    },
    {
      comparationBondValue: "2",
      _id: "5",
      receiver: true,
      imageText: "Vermelho",
      borderColorOnSuccessDrag: "#b1afe7",
    },
    {
      comparationBondValue: "1",
      _id: "6",
      receiver: true,
      imageText: "Branco",
      borderColorOnSuccessDrag: "#bbffcc",
    },
  ],
];
export const activityComparation = {
  _id: "asdasd",
  activityUtterance: "LIGUE AS NUVENS DE ACORDO COM AS CORES",
  stages: comparationStages,
};

const stageShapesAndColors: ShapesAndColorsActivityStage[] = [
  {
    columns: [
      [
        {
          _id: "ABC123",
          initialImage: RedRight,
          isHeadImage: true,
          isItemReceiver: false,
        },
        {
          _id: "ABC1234",
          initialImage: BlueLeft,
          imageAfterColoring: RedLeft,
          isHeadImage: false,
          isItemReceiver: false,
        },
        {
          _id: "ABC1235",
          initialImage: BlueLeft,
          imageAfterColoring: RedLeft,
          isHeadImage: false,
          isItemReceiver: true,
        },
        {
          _id: "ABC1236",
          initialImage: BlueLeft,
          imageAfterColoring: RedLeft,
          isHeadImage: false,
          isItemReceiver: true,
        },
      ],
      [
        {
          _id: "ABC1237",
          initialImage: YellowRight,
          isHeadImage: true,
          isItemReceiver: false,
        },
        {
          _id: "ABC1238",
          initialImage: WhiteRight,
          imageAfterColoring: YellowLeft,
          isHeadImage: false,
          isItemReceiver: false,
        },
        {
          _id: "ABC1239",
          initialImage: WhiteRight,
          imageAfterColoring: YellowLeft,
          isHeadImage: false,
          isItemReceiver: true,
        },
        {
          _id: "ABC12310",
          initialImage: WhiteRight,
          imageAfterColoring: YellowLeft,
          isHeadImage: true,
          isItemReceiver: false,
        },
      ],
    ],
  },
];

export const shapesAndColors: ShapesAndColorsInterface = {
  _id: "abc123",
  activityUtterance: "ARRASTE AS FIGURAS EM DESTAQUE PARA PINTAR",
  type: "S&C",
  stages: stageShapesAndColors,
};