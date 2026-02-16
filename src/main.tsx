import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/poppins/300.css'; // Light weight
import '@fontsource/poppins/400.css'; // Regular weight
import '@fontsource/poppins/500.css'; // Medium weight
import '@fontsource/poppins/700.css'; // Bold weight
import { App } from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
