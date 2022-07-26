import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.js'

// hoc
import { RequireAuth, ReverseAuth } from './components/hoc/Auth.js'

import Login from './pages/Login'
import Home from './pages/Home/index.jsx'
import TopNav from './components/TopNav/index.jsx'
import ViewQuestion from './pages/ViewQuestion/index.jsx'

function RouteComponent() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/login"
            element={
              <ReverseAuth>
                {' '}
                <Login />{' '}
              </ReverseAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <TopNav />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/question-set/:id" element={<ViewQuestion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteComponent
