import HomePage from './pages/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import ServicesPage from './pages/ServicesPages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
