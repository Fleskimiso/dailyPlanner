import { useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import { useAppSelector } from './store/hooks'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store/store'
import Loading from './components/Loading';
import "./styles/index.css";

const HomePage = lazy(() => import("./routes/HomePage"));
const LoginPage = lazy(() => import("./routes/LoginPage"));
const SignupPage =  lazy(() => import("./routes/SignupPage"));
const CreatorPage =  lazy(() => import("./routes/CreatorPage"));

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          <Routes>
            <Route path="/" element={<Suspense fallback={<Loading/>}> <HomePage/> </Suspense>} />
            <Route path="/login" element={<Suspense fallback={<Loading/>}> <LoginPage/> </Suspense>}  />
            <Route path="/signup" element={<Suspense fallback={<Loading/>}> <SignupPage/> </Suspense>}  />
            <Route path='/plan' element={<Suspense fallback={<Loading/>}> <CreatorPage/> </Suspense>}  />
          </Routes>

        </div>
      </BrowserRouter>
    </Provider>

  )
}

export default App
