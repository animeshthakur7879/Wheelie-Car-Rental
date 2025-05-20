import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server : {
    proxy : {
      '/api' : {
        changeOrigin : true , 
        target : 'http://localhost:8080' , 
        secure : false
      }
    }
  }
})