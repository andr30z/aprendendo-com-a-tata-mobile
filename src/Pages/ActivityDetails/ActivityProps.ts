// import {
//   ShapesAndColorsInterface,
//   ShapesAndColorsActivityStage,
//   ImagesByLettersActivityStageInterface,
//   CompleteWordsByImagesAndLettersActivityStageInterface,
//   LearningCharacteristicsOfThingsActivityStageInterface,
//   StorytellingInterface,
// } from "../../Activities/Interfaces";
// import BlueLeft from "../../Illustrations/cloud-blue-left.svg";
// import BlueRight from "../../Illustrations/cloud-blue-right.svg";
// import RedLeft from "../../Illustrations/cloud-red-left.svg";
// import RedRight from "../../Illustrations/cloud-red-right.svg";
// import WhiteRight from "../../Illustrations/cloud-white-right.svg";
// import YellowRight from "../../Illustrations/cloud-yellow-right.svg";
// import YellowLeft from "../../Illustrations/cloud-yellow-left.svg";
// import { NumberSequenceActivityStageInterface } from "../../Activities/Interfaces/Numbers";
// import { NumberOperationsActivityStageInterface } from "../../Activities/Interfaces/Numbers/NumberOperations";

// const comparationStages = [
//   [
//     {
//       comparationBondValue: "6",
//       _id: "1",
//       receiver: false,
//       image: RedLeft,
//       borderColorOnSuccessDrag: "#ccdfff",
//     },
//     {
//       comparationBondValue: "5",
//       _id: "2",
//       receiver: false,
//       image: YellowRight,
//       borderColorOnSuccessDrag: "#f79f7c",
//     },
//     {
//       comparationBondValue: "4",
//       _id: "3",
//       receiver: false,
//       image: BlueLeft,
//       borderColorOnSuccessDrag: "#ffee80",
//     },
//     {
//       comparationBondValue: "3",
//       _id: "4",
//       receiver: true,
//       imageText: "Azul",
//       borderColorOnSuccessDrag: "#eecbff",
//     },
//     {
//       comparationBondValue: "1",
//       _id: "6",
//       receiver: true,
//       imageText: "Vermelho",
//       borderColorOnSuccessDrag: "#6cad0e",
//     },
//     {
//       comparationBondValue: "2",
//       _id: "5",
//       receiver: true,
//       imageText: "Amarelo",
//       borderColorOnSuccessDrag: "#282e54",
//     },
//   ],
//   [
//     {
//       comparationBondValue: "6",
//       _id: "1",
//       receiver: false,
//       image: WhiteRight,
//       borderColorOnSuccessDrag: "#01786f",
//     },
//     {
//       comparationBondValue: "5",
//       _id: "2",
//       receiver: false,
//       image: RedRight,
//       borderColorOnSuccessDrag: "#ffe4e1",
//     },
//     {
//       comparationBondValue: "4",
//       _id: "3",
//       receiver: false,
//       image: BlueRight,
//       borderColorOnSuccessDrag: "#bd3939",
//     },
//     {
//       comparationBondValue: "3",
//       _id: "4",
//       receiver: true,
//       imageText: "Azul",
//       borderColorOnSuccessDrag: "#f622e3",
//     },
//     {
//       comparationBondValue: "2",
//       _id: "5",
//       receiver: true,
//       imageText: "Vermelho",
//       borderColorOnSuccessDrag: "#b1afe7",
//     },
//     {
//       comparationBondValue: "1",
//       _id: "6",
//       receiver: true,
//       imageText: "Branco",
//       borderColorOnSuccessDrag: "#bbffcc",
//     },
//   ],
// ];
// export const activityComparation = {
//   _id: "asdasd",
//   activityUtterance: "LIGUE AS NUVENS DE ACORDO COM AS CORES",
//   stages: comparationStages,
// };

// const stageShapesAndColors: ShapesAndColorsActivityStage[] = [
//   {
//     columns: [
//       [
//         {
//           _id: "ABC123",
//           initialImage: RedRight,
//           isHeadImage: true,
//           isItemReceiver: false,
//         },
//         {
//           _id: "ABC1234",
//           initialImage: BlueLeft,
//           imageAfterColoring: RedLeft,
//           isHeadImage: false,
//           isItemReceiver: false,
//         },
//         {
//           _id: "ABC1235",
//           initialImage: BlueLeft,
//           imageAfterColoring: RedLeft,
//           isHeadImage: false,
//           isItemReceiver: true,
//         },
//         {
//           _id: "ABC1236",
//           initialImage: BlueLeft,
//           imageAfterColoring: RedLeft,
//           isHeadImage: false,
//           isItemReceiver: true,
//         },
//       ],
//       [
//         {
//           _id: "ABC1237",
//           initialImage: YellowRight,
//           isHeadImage: true,
//           isItemReceiver: false,
//         },
//         {
//           _id: "ABC1238",
//           initialImage: WhiteRight,
//           imageAfterColoring: YellowLeft,
//           isHeadImage: false,
//           isItemReceiver: false,
//         },
//         {
//           _id: "ABC1239",
//           initialImage: WhiteRight,
//           imageAfterColoring: YellowLeft,
//           isHeadImage: false,
//           isItemReceiver: true,
//         },
//         {
//           _id: "ABC12310",
//           initialImage: WhiteRight,
//           imageAfterColoring: YellowLeft,
//           isHeadImage: true,
//           isItemReceiver: false,
//         },
//       ],
//     ],
//   },
// ];

// export const shapesAndColors: ShapesAndColorsInterface = {
//   _id: "abc123",
//   activityUtterance: "ARRASTE AS FIGURAS EM DESTAQUE PARA PINTAR",
//   type: "S&C",
//   stages: stageShapesAndColors,
// };

// export const numberSequenceProps: NumberSequenceActivityStageInterface = {
//   _id: "abc1234",
//   activityUtterance: "COMPLETE A SEQUENCIA NÚMERICA",
//   type: "NS",
//   stages: [{ sequence: [1, 2, "", 4, 5, "", 7, "", 9, ""] }],
// };

// export const learningLettersWithImages: ImagesByLettersActivityStageInterface =
//   {
//     _id: "123123123",
//     activityUtterance:
//       "SELECIONE AS IMAGENS QUE COMEÇAM COM A LETRA EM DESTAQUE",
//     stages: [
//       {
//         pressingLettersActivity: [
//           {
//             _id: "ASDASD",
//             initialLetter: "A",
//             images: [
//               {
//                 _id: "1",
//                 image: YellowLeft,
//                 imageStartWithInitialLetter: false,
//               },
//               {
//                 _id: "2",
//                 image: BlueLeft,
//                 imageStartWithInitialLetter: false,
//               },
//               {
//                 _id: "3",
//                 image: RedLeft,
//                 imageStartWithInitialLetter: true,
//               },
//               {
//                 _id: "4",
//                 image: WhiteRight,
//                 imageStartWithInitialLetter: true,
//               },
//               {
//                 _id: "5",
//                 image: YellowRight,
//                 imageStartWithInitialLetter: true,
//               },
//             ],
//           },
//           {
//             _id: "ASDASD4444",
//             initialLetter: "B",
//             images: [
//               {
//                 _id: "1",
//                 image: WhiteRight,
//                 imageStartWithInitialLetter: false,
//               },
//               {
//                 _id: "2",
//                 image: RedRight,
//                 imageStartWithInitialLetter: true,
//               },
//               {
//                 _id: "3",
//                 image: RedLeft,
//                 imageStartWithInitialLetter: false,
//               },
//               {
//                 _id: "4",
//                 image: BlueRight,
//                 imageStartWithInitialLetter: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     type: "LLI",
//   };

// export const learningLettersCompleteWords: CompleteWordsByImagesAndLettersActivityStageInterface =
//   {
//     _id: "abc",
//     activityUtterance: "ARRASTE A LETRA EM DESTAQUE PARA COMPLETAR AS PALAVRAS",
//     type: "LLCW",
//     stages: [
//       {
//         _id: "asdasd",
//         wordsToComplete: [
//           {
//             _id: "123",
//             image: RedLeft,
//             optionLetters: ["A", "B", "C"],
//             keyLetter: "A",
//             wordToComplete: "*NDRE",
//           },
//           {
//             _id: "1234",
//             image: YellowLeft,
//             optionLetters: ["A", "R", "C"],
//             keyLetter: "R",
//             wordToComplete: "AND*E",
//           },
//           {
//             _id: "12389",
//             image: YellowRight,
//             optionLetters: ["Y", "O", "E"],
//             keyLetter: "O",
//             wordToComplete: "ARV*RE",
//           },
//           {
//             _id: "123555",
//             image: RedLeft,
//             optionLetters: ["Ã", "B", "C"],
//             keyLetter: "Ã",
//             wordToComplete: "AVI*O",
//           },
//           {
//             _id: "12344",
//             image: YellowLeft,
//             optionLetters: ["A", "H", "C"],
//             keyLetter: "H",
//             wordToComplete: "OL*O",
//           },
//         ],
//       },
//     ],
//   };

// export const learningLettersDragCompleteWords: CompleteWordsByImagesAndLettersActivityStageInterface =
//   {
//     _id: "abc",
//     activityUtterance: "ARRASTE A LETRA EM DESTAQUE PARA COMPLETAR AS PALAVRAS",
//     type: "LLDCW",
//     stages: [
//       {
//         _id: "asdasd",
//         wordsToComplete: [
//           {
//             _id: "123",
//             image: RedLeft,
//             optionLetters: [
//               "A",
//               "R",
//               "C",
//               "D",
//               "E",
//               "G",
//               "F",
//               "L",
//               "P",
//               "M",
//               "N",
//             ],
//             finishedWord: "ANDRE",
//             wordToComplete: "*ND*E",
//           },
//           {
//             _id: "1234",
//             image: YellowRight,
//             optionLetters: [
//               "A",
//               "B",
//               "I",
//               "D",
//               "E",
//               "G",
//               "F",
//               "L",
//               "P",
//               "M",
//               "N",
//               "R",
//               "H",
//             ],
//             finishedWord: "ABOBRINHA",
//             wordToComplete: "*BOB*IN**",
//           },
//           {
//             _id: "1235",
//             image: BlueLeft,
//             optionLetters: [
//               "A",
//               "R",
//               "C",
//               "D",
//               "E",
//               "G",
//               "F",
//               "L",
//               "P",
//               "M",
//               "N",
//             ],
//             finishedWord: "ANDRE",
//             wordToComplete: "AND**",
//           },
//         ],
//       },
//     ],
//   };

// export const learningCharacteristicsOfThingsProps: LearningCharacteristicsOfThingsActivityStageInterface =
//   {
//     _id: "abc",
//     activityUtterance: "PRESSIONE AS IMAGENS QUE TIVEREM X CARACTERISTICA",
//     type: "LCOT",
//     stages: [
//       {
//         _id: "asdasd",
//         characteristicsItems: [
//           {
//             _id: "asdasdasdasdasdasd",
//             image: BlueLeft,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "1",
//             image: WhiteRight,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "2",
//             image: YellowRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "3",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "4",
//             image: BlueLeft,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "5",
//             image: BlueRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "6",
//             image: YellowLeft,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "7",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "8",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "9",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "10",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "11",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "12",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "13",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "14",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "15",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "16",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//           {
//             _id: "17",
//             image: RedLeft,
//             imageIsCharacteristic: true,
//           },
//           {
//             _id: "18",
//             image: WhiteRight,
//             imageIsCharacteristic: false,
//           },
//         ],
//       },
//     ],
//   };

// export const numberOperations: NumberOperationsActivityStageInterface = {
//   _id: "abc",
//   activityUtterance: "Resolva as operações matemáticas",
//   type: "NO",
//   stages: [
//     {
//       _id: "asdasd",
//       operations: [
//         {
//           _id: "123123",
//           inputs: [
//             { _id: "12321", image: RedLeft, operation: "+" },
//             { _id: "2", image: BlueRight, operation: "+" },
//             { _id: "3", image: YellowLeft, operation: "+" },
//             { _id: "5", image: YellowRight, operation: "+" },
//             { _id: "4", image: RedRight },
//           ],
//           result: 5,
//         },
//         {
//           _id: "12312358798769068790687067",
//           inputs: [
//             { _id: "12321", image: YellowLeft, operation: "+" },
//             { _id: "423lk232", image: BlueRight, operation: "+" },
//             { _id: "3xzcvzcxv", image: RedRight, operation: "+" },
//             { _id: "5xzcv", image: WhiteRight, operation: "x" },
//             { _id: "4zasf2345234", image: BlueRight },
//           ],
//           result: 3,
//         },
//       ],
//     },
//     {
//       _id: "1",
//       operations: [
//         {
//           _id: "4566",
//           inputs: [
//             { _id: "4155151", image: YellowRight, operation: "-" },
//             { _id: "2131232", image: BlueRight, operation: "-" },
//             { _id: "44674769869000fvzvvx", image: RedRight },
//             { _id: "3asdasd34235", image: YellowLeft, operation: "-" },
//             { _id: "13124325234566486749", image: RedLeft, operation: "-" },
//           ],
//           result: 0,
//         },
//         {
//           _id: "0189346736748712",
//           inputs: [
//             { _id: "12312sdfadf", image: YellowRight, operation: "+" },
//             {
//               _id: "adf12342315143645387694",
//               image: BlueRight,
//               operation: "+",
//             },
//             { _id: "adxczczxc", image: RedRight },
//             {
//               _id: "3asdasd34235//1/e123123",
//               image: YellowLeft,
//               operation: "+",
//             },
//             {
//               _id: "13124325234566486749=-091-02398-123",
//               image: RedLeft,
//               operation: "+",
//             },
//           ],
//           result: 5,
//         },
//       ],
//     },
//   ],
// };

// export const storytellingProps: StorytellingInterface = {
//   _id: "abc",
//   activityUtterance: "Resolva as operações matemáticas",
//   type: "NO",
//   story: {
//     questions: [
//       {
//         _id: "123123",
//         options: [
//           {
//             _id: "123123123ADASD",
//             isCorrect: true,
//             answer:
//               "Nulla aliquet lacus id mauris gravida, nec sollicitudin lacus fermentum. Fusce at ligula dapibus, eleifend est sed, elementum quam. Integer consequat tempor nunc et tempus. Praesent accumsan non sem at facilisis. Pellentesque sit amet sapien eget augue pretium lacinia. Ut sed arcu consectetur, ultricies tellus vitae, ornare nulla. Donec sit amet ullamcorper sapien. Sed accumsan scelerisque mattis. Curabitur in erat tellus. Sed tempus elit odio, in euismod purus pretium sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel malesuada ipsum. Vivamus porta nibh nec enim vehicula, eu vestibulum magna ultricies. Praesent at hendrerit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubi",
//           },
//           {
//             _id: "sdfxcbxbvxc3456437373",
//             isCorrect: false,
//             answer:
//               "Nulla aliquet lacus id mauris gravida, nec sollicitudin lacus fermentum. Fusce at ligula dapibus, eleifend est sed, elementum quam. Integer consequat tempor nunc et tempus. Praesent accumsan non sem at facilisis. Pellentesque sit amet sapien eget augue pretium lacinia. Ut sed arcu consectetur, ultricies tellus vitae, ornare nulla. Donec sit amet ullamcorper sapien. Sed accumsan scelerisque mattis. Curabitur in erat tellus. Sed tempus elit odio, in euismod purus pretium sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel malesuada ipsum. Vivamus porta nibh nec enim vehicula, eu vestibulum magna ultricies. Praesent at hendrerit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubi",
//           },
//         ],
//         question:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem ligula, ornare non dapibus id, semper ac neque. Ut eget luctus velit?",
//       },
//       {
//         _id: "9999999",
//         options: [
//           {
//             _id: "995344",
//             isCorrect: true,
//             answer:
//               "Donec tellus justo, interdum vitae neque non, imperdiet volutpat lorem. Morbi id sem pretium, rutrum diam vitae, dictum eros. Etiam elementum viverra erat id efficitur. Nam egestas, lacus eu placerat facilisis, purus velit euismod lectus, vel varius justo elit sit amet dui. Pellentesque tincidunt sem lacus, vitae porttitor augue efficitur id.",
//           },
//           {
//             _id: "sdfx121323545709870cbxbvxc356565656456437373",
//             isCorrect: false,
//             answer:
//               "Phasellus rutrum mollis lectus lobortis mattis. Aliquam vitae convallis ipsum. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//           },
//         ],
//         question:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem ligula, ornare non dapibus id, semper ac neque. Ut eget luctus velit?",
//       },
//     ],
//     storyPages: [
//       {
//         paragraphs: [
//           {
//             image: RedLeft,
//             imagePosition: "top",
//             text: "       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem ligula, ornare non dapibus id, semper ac neque. Ut eget luctus velit. Morbi pellentesque justo eget felis commodo facilisis. Ut eu eros ultricies, suscipit augue a, molestie ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ut purus et nulla elementum pretium. Phasellus accumsan diam nec dapibus tempor. Donec volutpat ornare felis sed semper. Sed mollis commodo dolor, id mattis metus mattis ac. Duis pharetra erat turpis, non scelerisque erat ullamcorper at. In in purus dictum, imperdiet odio vitae, condimentum justo. Vestibulum aliquam, leo eu dignissim aliquet, lorem felis euismod mauris, quis rhoncus neque dui eget mi. Curabitur vestibulum, nisi a pulvinar finibus, risus mauris faucibus nisi, ut sodales sem turpis non tortor. Praesent interdum sit amet nunc eget laoreet. In hac habitasse platea dictumst.",
//             title: "AAA1",
//           },
//           {
//             text: "       Nulla aliquet lacus id mauris gravida, nec sollicitudin lacus fermentum. Fusce at ligula dapibus, eleifend est sed, elementum quam. Integer consequat tempor nunc et tempus. Praesent accumsan non sem at facilisis. Pellentesque sit amet sapien eget augue pretium lacinia. Ut sed arcu consectetur, ultricies tellus vitae, ornare nulla. Donec sit amet ullamcorper sapien. Sed accumsan scelerisque mattis. Curabitur in erat tellus. Sed tempus elit odio, in euismod purus pretium sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel malesuada ipsum. Vivamus porta nibh nec enim vehicula, eu vestibulum magna ultricies. Praesent at hendrerit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
//           },
//           { text: "AAAAAAAAAAAAAAAA", title: "AAA1" },
//           { text: "AAAAAAAAAAAAAAAA", title: "AAA1" },
//           { text: "AAAAAAAAAAAAAAAA", title: "AAA1" },
//         ],
//       },
//       {
//         paragraphs: [
//           {
//             image: RedLeft,
//             imagePosition: "left",
//             text: "       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem ligula, ornare non dapibus id, semper ac neque. Ut eget luctus velit. Morbi pellentesque justo eget felis commodo facilisis. Ut eu eros ultricies, suscipit augue a, molestie ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ut purus et nulla elementum pretium. Phasellus accumsan diam nec dapibus tempor. Donec volutpat ornare felis sed semper. Sed mollis commodo dolor, id mattis metus mattis ac. Duis pharetra erat turpis, non scelerisque erat ullamcorper at. In in purus dictum, imperdiet odio vitae, condimentum justo. Vestibulum aliquam, leo eu dignissim aliquet, lorem felis euismod mauris, quis rhoncus neque dui eget mi. Curabitur vestibulum, nisi a pulvinar finibus, risus mauris faucibus nisi, ut sodales sem turpis non tortor. Praesent interdum sit amet nunc eget laoreet. In hac habitasse platea dictumst.",
//             title: "AAA2",
//           },
//           {
//             text: "       Nulla aliquet lacus id mauris gravida, nec sollicitudin lacus fermentum. Fusce at ligula dapibus, eleifend est sed, elementum quam. Integer consequat tempor nunc et tempus. Praesent accumsan non sem at facilisis. Pellentesque sit amet sapien eget augue pretium lacinia. Ut sed arcu consectetur, ultricies tellus vitae, ornare nulla. Donec sit amet ullamcorper sapien. Sed accumsan scelerisque mattis. Curabitur in erat tellus. Sed tempus elit odio, in euismod purus pretium sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel malesuada ipsum. Vivamus porta nibh nec enim vehicula, eu vestibulum magna ultricies. Praesent at hendrerit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
//           },
//           { text: "AAAAAAAAAAAAAAAA", title: "AAA1" },
//           { text: "AAAAAAAAAAAAAAAA", title: "AAA1" },
//           {
//             text: "       Nulla aliquet lacus id mauris gravida, nec sollicitudin lacus fermentum. Fusce at ligula dapibus, eleifend est sed, elementum quam. Integer consequat tempor nunc et tempus. Praesent accumsan non sem at facilisis. Pellentesque sit amet sapien eget augue pretium lacinia. Ut sed arcu consectetur, ultricies tellus vitae, ornare nulla. Donec sit amet ullamcorper sapien. Sed accumsan scelerisque mattis. Curabitur in erat tellus. Sed tempus elit odio, in euismod purus pretium sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel malesuada ipsum. Vivamus porta nibh nec enim vehicula, eu vestibulum magna ultricies. Praesent at hendrerit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
//           },
//         ],
//       },
//       { paragraphs: [{ text: "AAAAAAAAAAAAAAAA", title: "AAA1" }] },
//       { paragraphs: [{ text: "AAAAAAAAAAAAAAAA", title: "AAA1" }] },
//       { paragraphs: [{ text: "AAAAAAAAAAAAAAAA", title: "AAA1" }] },
//     ],
//     title: "Lorem Ipsum",
//   },
// };
