import { HelmetProvider } from "react-helmet-async"
import AppNavigation from "./navigation/Navigation"
import { Provider } from 'react-redux'
import store from "./redux/store"
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <>
      <Provider store={store}>
        <HelmetProvider>
          <AuthProvider>
            <AppNavigation />
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </Provider>
    </>
  )
}

export default App