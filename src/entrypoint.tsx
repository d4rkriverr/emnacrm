// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState } from "react";
// import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
// import Authentication from "./modules/Authentication";
// import Workspace from "./modules/Workspaces";
// import { icons } from "./constants";


// const MainApp = () => {
//   const isAuthed = true;

//   const [menuItems, setMenuItems] = useState([
//     {
//       name: "HR",
//       active: false,
//       items: [
//         { name: "Overview", icon: icons.overview },
//         { name: "Employees", icon: icons.groups },
//         { name: "Expenses", icon: icons.expanses }
//       ]
//     },
//     {
//       name: "Workspace",
//       active: false,
//       items: [
//         { name: "Poland", icon: icons.country },
//         { name: "Romania", icon: icons.country },
//         { name: "Malta", icon: icons.country }
//       ]
//     },
//   ])

//   const onMenuChange = (i: number) => {
//     const obj = [...menuItems]
//     obj[i].active = !obj[i].active
//     setMenuItems(obj)
//   }

//   if (!isAuthed) {
//     return (
//       <>
//         <Route path="/login" Component={() => <Authentication />} />
//         <Route path="*" loader={() => Navigate({ to: "/login" })} Component={() => <></>} />
//       </>
//     )
//     return <>unauthenticate</>;
//   }

//   const onLoadAuth = () => {

//   }
//   const onLoadDefault = () => {

//   }
//   return (
//     <>
//       <Layout menuItems={menuItems} onMenuChange={onMenuChange}>
//         <Route path="/" Component={() => <Workspace />} />
//         <Route path="/login" Component={() => <Authentication />} />
//         <Route path="*" loader={() => Navigate({ to: "/" })} Component={() => <></>} />
//       </Layout>
//     </>
//   )
// }

// const Layout = ({ chidlren, menuItems, onMenuChange }: any) => {
//   return (
//     <div className={`flex w-screen h-screen`} >
//       {/* SIDE BAR */}
//       <div className="w-72 border-r-2 flex flex-col">
//         <div className="flex items-center justify-center p-3 h-16">
//           <button className="flex justify-between items-center p-2 w-full hover:outline outline-2 outline-blue-400 border rounded-md">
//             <span className="flex justify-between items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5">
//                 <path d="M18 21a8 8 0 0 0-16 0"></path>
//                 <circle cx="10" cy="8" r="5"></circle>
//                 <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
//               </svg>
//               <span className="text-sm">Hamza</span>
//             </span>
//           </button>
//         </div>
//         <div className="flex-1 flex flex-col gap-1 py-3 border-y-2 p-3">
//           <div data-collapsed="false" className="group flex flex-col">
//             <nav className="text-sm">
//               {["Overview", "Employees", "Expanses"].map((e) => {
//                 return (
//                   <a key={e} className="flex justify-between items-center hover:bg-gray-50 data-[state=true]:bg-gray-50 data-[state=true]:border-black p-2" href="#">
//                     <p>{e}</p>
//                   </a>
//                 )
//               })}
//             </nav>
//           </div>
//           {
//             menuItems.map((e: { active: boolean; name: string; items: { name: string; icon: never; }[]; }, i: string) => {
//               return (
//                 <div key={"group-" + i} data-collapsed="false" className="group flex flex-col">
//                   <div className="flex flex-col font-medium">
//                     <div
//                       data-opened={e.active}
//                       onClick={() => onMenuChange(i)}
//                       className="flex items-center select-none data-[opened=true]:border-b-2 data-[opened=true]:bg-gray-100 hover:bg-gray-100 cursor-pointer p-2">
//                       <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280">
//                         <path d="M9.9141 8.12803C12.4185 6.11437 16.0241 7.18759 16.45 10.5C16.9018 14.014 16 16.8 12.5 16.8C9.24997 16.8 9.34997 14 9.34997 14C9.34997 11 14.5 10.6 17.5 12.1C23 15.6 19 22 13 22C8.02941 22 3.99997 19.5 3.99997 12C3.99997 4.5 8.02941 2 13 2C16.5079 2 19.6715 3.80695 20.8348 7.42085" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
//                       </svg>
//                       <p className="flex-1 text-sm text-gray-500 mx-1 font-">{e.name}</p>
//                       <p data-active={!e.active} className="data-[active=true]:rotate-180 transform-gpu ">
//                         <svg width="13px" height="13px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
//                           <path d="M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
//                         </svg>
//                       </p>
//                     </div>
//                     <nav data-hidden={!e.active} className="text-sm data-[hidden=true]:hidden bg-gray-50">
//                       {e.items.map((x: { name: string; icon: never; }) => <MenuItem key={x.name} name={x.name} icon={x.icon} />)}
//                     </nav>
//                   </div>
//                 </div>
//               )
//             })
//           }
//         </div>
//         <div className="p-3">
//           <button className="flex justify-center items-center p-3 w-full bg-black border rounded-md">
//             <span className="text-white text-sm font-bold">logout</span>
//           </button>
//         </div>
//       </div>
//       <div className="flex-1">{chidlren}</div>
//     </div>
//   )
// }

// const MenuItem = ({ name, icon }: any) => {
//   return (
//     <a className="flex justify-between items-center gap-1 hover:bg-black hover:text-white hover:stroke-white stroke-black data-[state=true]:bg-gray-50 data-[state=true]:border-black p-2" href="#">
//       <div className="w-5 h-5">{icon}</div>
//       <p className="flex-1">{name}</p>
//     </a>
//   )
// }

// export default function App() {
//   return (
//     <Router>
//       <MainApp />
//     </Router>
//   )
// }
