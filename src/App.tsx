// // import type { JSX } from 'react/jsx-runtime';
// import { Routes, Route } from 'react-router-dom'
// import Layout from './layout/Layout';
// import GaragePage from './pages/garage/GaragePage';
// import WinnersPage from './pages/winners/WinnersPage';
// // import AppRouter from './routes/AppRouter';

// // function App(): JSX.Element {
// //   return <AppRouter />;
// // }

// export function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<GaragePage />} />
//         <Route path="winners" element={<WinnersPage />} />
//       </Route>
//     </Routes>
//   )
// }

import Navigation from './components/Navigation'
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <Navigation />
      <AppRouter />
    </>
  )
}

export default App;


