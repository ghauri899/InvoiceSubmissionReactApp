import { ToastContainer } from 'react-toastify'
import './App.css'
import Navbar from './components/Navbar'
import InvoiceForm from './pages/InvoiceForm'

function App() {

  return (
    <div >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "white" }}
        style={{ width: "414px" }}
        closeButton={false}
      />
      <Navbar />
      <InvoiceForm />
    </div>
  )
}

export default App
