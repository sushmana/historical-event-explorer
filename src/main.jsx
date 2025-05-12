import { StrictMode, Suspense }  from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store/reducerConfig.jsx';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
        <Suspense fallback={<div>Loading translations...</div>}>
          <App />
        </Suspense>
    </HashRouter>
    </Provider>
  </StrictMode>,
)
