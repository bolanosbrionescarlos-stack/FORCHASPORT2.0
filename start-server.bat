@echo off
title FORCHA SPORT - Servidor de Desarrollo
cd "C:\Users\Carlos Bolaños\Desktop\FORCHASPORT2.0"

echo 🔄 Limpiando procesos anteriores...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM cmd.exe 2>nul
timeout /t 1 /nobreak >nul

echo 🧹 Limpiando caché de Next.js...
rm -rf .next
npm cache clean --force 2>nul

echo 📦 Instalando dependencias si es necesario...
npm install 2>nul

echo 🚀 Iniciando servidor de desarrollo...
echo.
echo.
npm run dev

pause