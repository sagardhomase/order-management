import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld'
import ListFuelOrderComponent from './components/ListFuelOrderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { OrderComponent } from './components/OrderComponent'

function App() {

  return (
    <>
      <BrowserRouter>
      <HeaderComponent/>
        <Routes>
          <Route path='/orders' element={<ListFuelOrderComponent/>}></Route>
          <Route path='/' element={<ListFuelOrderComponent/>}></Route>
          <Route path='/add-order' element={<OrderComponent />}></Route>
          <Route path='/edit-order/:id' element = { <OrderComponent /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
      
    </>
  )
}

export default App
