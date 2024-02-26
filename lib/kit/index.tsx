import "./kit.css";
export * from "./Types";
// export { default as FormTextInput } from "./FormTextInput";
export * from "./Selector";
export * from "./MultiSelector";
export { default as ToggleOptions } from "./ToggleOptions";

// export const keys = {
//   search: "SearchInput",
//   text: "TextInput",
//   toggle: "ToggleButton",
//   selector: "Selector",
//   date: "DateInput",
//   filter: "FilterButton",
//   options: "Options",
//   group: "Group",
//   scanner: "ScannerIcon",
//   popupSelector: "PopupSelector",
//   link: "LinkLabel",
// };

// export const FieldsSample = [
//   {
//     className: "row-center round-s gap-m bg-throne py-s px-m self-start items-center",
//     children: [
//       {
//         id: "name",
//         type: "search",
//         title: "Name",
//         value: "",
//         storageKey: "items-query",
//         containerClass: "query-input",
//       },
//       {
//         id: "toggle",
//         type: "toggle",
//         title: "toggleTest",
//         value: false,
//         storageKey: "items-toggle",
//       },
//       {
//         id: "age",
//         type: "popupSelector",
//         title: "Age",
//         value: 1,
//         storageKey: "q-age",
//         // options: [
//         //   { id: "big", title: "اكبر" },
//         //   { id: "small", title: "اصغر" },
//         // ],
//         getData: async () => {
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           return [
//             { id: 1, title: "دينار" },
//             { id: 2, title: "دولار" },
//             { id: 3, title: "يورو" },
//           ];
//         },
//       },
//       {
//         id: "currencyId-getData",
//         type: "options",
//         title: "العملة",
//         value: 1,
//         storageKey: "q-currencyId-getData",
//         getData: async () => {
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           return [
//             { id: 1, title: "دينار" },
//             { id: 2, title: "دولار" },
//             { id: 3, title: "يورو" },
//           ];
//         },
//       },
//       // {
//       //   id: "currencyId",
//       //   type: "options",
//       //   title: "العملة",
//       //   value: 1,
//       //   storageKey: "q-currencyId",
//       //   options: [
//       //     { id: 1, title: "دينار" },
//       //     { id: 2, title: "دولار" },
//       //   ],
//       // },
//       {
//         id: "sort",
//         type: "selector",
//         title: "Selector",
//         value: 1,
//         storageKey: "q-currencyId",
//         options: [
//           { id: 1, title: "التاريخ" },
//           { id: 2, title: "السعر" },
//         ],
//       },
//       {
//         id: "deleted",
//         type: "toggle",
//         title: "المحذوقة",
//         value: false,
//         storageKey: "is-query",
//       },
//       {
//         id: "from",
//         type: "date",
//         title: "التاريخ من",
//         storageKey: "q-from",
//       },
//     ],
//   },
// ];
