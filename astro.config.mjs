import { defineConfig } from 'astro/config';

export default defineConfig({
    base: '/Mukaan',
    output: 'static',
    server: {
        port: 5173,
    }
});