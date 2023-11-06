import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"
dotenv.config();
const FRONTEND_PORT=process.env.FRONTEND_PORT;
//metti il dotenv config e cambia le porte 


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: true,
    strictPort: true,
    port: FRONTEND_PORT
  }
})
