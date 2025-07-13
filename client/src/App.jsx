import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./frontend/public/Home";
import LandlordDashboard from "./frontend/landlord-components/LandlordDashboard";
import TenantDashboard from "./frontend/tenant-components/TenantDashboard";
import { TrendingProperties } from "./frontend/public/TrendingProperties";
import { NavBar } from "./frontend/navigation/NavBar";
import TenantDeposit from "./frontend/tenant-components/TenantDeposit";
import Withdraw from "./frontend/public/Withdraw";
import Registeration from "./frontend/pages/Registeration";
import PropertiesForm from "./frontend/landlord-components/PropertiesForm";
import { ToastContainer } from "react-toastify";
import { LandlordProperties } from "./frontend/landlord-components/LandlordProperties";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoConnectWallet } from "./auth/autoConnectWalletThunk";
import Footer from "./frontend/public/Footer";
export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(autoConnectWallet());
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
      <div className="nav">
        <NavBar/>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="landlord-dashboard" element={<LandlordDashboard />}/>

        <Route path="tenant-dashboar" element={<TenantDashboard />}>
          <Route path="deposit" element={<TenantDeposit />} />
          <Route path="withdraw" element={<Withdraw/> } />
        </Route>
        <Route path="register" element={<Registeration />} />
        <Route path="forms" element={<PropertiesForm />} />
        <Route path="trending-properties" element={<TrendingProperties />} />
        <Route path="landlord-properties" element={<LandlordProperties/>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      </main>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  )
}
