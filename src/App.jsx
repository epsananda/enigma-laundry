import AppRoutes from './Route/AppRoutes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"

const App = () => {
  return (
    <>
        <ToastContainer />
        <AppRoutes />
    </>
  );
};

export default App;
