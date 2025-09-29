import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Listings from './pages/Listings.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import AdminDemo from './pages/AdminDemo.jsx'

export default function App(){
  return (
    <>
      <header className="container" style={{display:'flex',alignItems:'center',gap:16, padding:'16px 0'}}>
        <Link to="/" style={{fontWeight:700}}>BUSCA IMÓVEIS 013</Link>
        <div style={{flex:1}}></div>
        <Link to="/admin-demo" className="badge">Admin Demo</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<Listings />} />
        <Route path="/imovel/:code" element={<PropertyDetails />} />
        <Route path="/admin-demo" element={<AdminDemo />} />
      </Routes>
      <footer className="container">
        <div style={{opacity:.9}}>
          Busca Imóveis 013 — conectando pessoas a imóveis no DDD 13 (Baixada Santista). 
          <br/>Divulgamos anúncios; não intermediamos negociações.
        </div>
      </footer>
    </>
  )
}