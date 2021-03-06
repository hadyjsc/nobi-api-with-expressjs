# NOBI Project

## Project
Adalah test teknis yang diberikan team NOBI saat proses recruitement, download project pada repository ini atau gunakan syntax `git clone https://github.com/hadyjsc/nobi-api-with-expressjs.git`. Project di buat menggunakan Javascript menggunakan framework expressjs dengan database Postgresql, ORM yang di gunakan adalah sequelize.

## Instalasi
Pastikan environment development sudah terinstall NodeJS dan NPM, dapat melihat pada [website official NodeJS](https://nodejs.org/en/) untuk download dan install. Setelah melakukan installasi NodeJS selanjutnya adalah melakukan installasi package pada project.

1. Clone porject `git clone https://github.com/hadyjsc/nobi-api-with-expressjs.git`
2. Install package `npm install` atau menggunakan library [pnpm](https://pnpm.io/) `pnpm install`
3. Setting database pada file .env dengan menyesuaikan username, password, host dan port yang ada pada local server.
4. Jika local development tidak menggunakan SSL dapat mengubah env `SSL` ke `false` dan `PROTOCOL` ke `http`.
5. Create database melalui command sequelize pada terminal dengan mengetikan `npx sequelize db:create`
6. Migrasi tabel ke database dengan mengetikan `npx sequelize db:migrate`
7. Insert data ke database (seed) dengan mengetikan `npx sequelize db:seed:all`
8. Lalu jalankan server pada terminal menggunakan perintah `node server.js` atau `nodemon server.js` atau cukup dengan `nodemon`

## API

Import file `NOBI Project.postman_collection.json` pada folder project ke postman, di dalam sudah termasuk contoh response yang berasal dari API.