# Menggunakan node image dari Docker Hub
FROM node:14

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Menginstal dependensi npm
RUN npm install

# Menyalin seluruh kode sumber proyek
COPY . .

# Menjalankan perintah untuk membangun proyek (jika diperlukan)
RUN npm run build

# Menetapkan port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["node", "app.js"]
