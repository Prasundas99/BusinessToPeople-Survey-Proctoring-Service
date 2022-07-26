import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.js'

import { RequireAuth, ReverseAuth } from './components/hoc/Auth.js'

import Layouts from './components/Layouts'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
// import AddUser from './pages/AddUser/index.jsx'
import QuestionSet from './pages/QuestionSet'
import ViewQuestionSet from './pages/ViewQuestionSet/index.jsx'
import SingleQuestionSet from './pages/SingleQuestionSet/index.jsx'
import AddQuestionSet from './pages/AddQuestionSet/index.jsx'
import SingleWorkerAnswers from './pages/SingleWorkerAnswers/index.jsx'

function RouteComponent() {
  return (
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
              <Layouts />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/add-user" element={<AddUser />} /> */}
          <Route path="/question-set" element={<QuestionSet />} />
          <Route path="/question-set/add" element={<AddQuestionSet />} />
          <Route path="/question-set/:id" element={<SingleQuestionSet />} />
          <Route path="/question-set/answer/:questionSetId/:workerId" element={<SingleWorkerAnswers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent
