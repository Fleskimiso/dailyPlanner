import { useState } from 'react'
import Navbar from './components/Navbar'
import { useAppSelector } from './store/hooks'

function App() {
  const user = useAppSelector(state => state.user)

  return (
    <div className="container-fluid">
      <Navbar />
      <div className=''>
          <div>
            {user.username}
          </div>
      </div>
    </div>
  )
}

export default App
