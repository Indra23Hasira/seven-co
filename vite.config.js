import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' membuat situs jalan di alamat GitHub Pages mana pun tanpa perlu mengubah nama repo.
export default defineConfig({
  plugins: [react()],
  base: './',
})
