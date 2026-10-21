@echo off
set PORT=3001
cd "C:\Users\Carlos Bolaños\Desktop\FORCHASPORT2.0"

:START
echo.
echo ==========================================
echo   FORCHA SPORT - Servidor de Desarrollo
echo ==========================================
echo.

:: Verificar si Node está disponible
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Node.js no está instalado o no está en el PATH
    echo Por favor instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

npm --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ npm no está disponible
    pause
    exit /b 1
)

echo ✅ Node.js: %NODE_VERSION%
echo ✅ npm: %npm_version%

:: Verificar si el puerto ya está en uso
echo.
echo 🔍 Verificando puertos disponibles...
curl -s http://localhost:%PORT% >nul 2>&1
if %errorLevel% equ 0 (
    echo ⚠️ El puerto %PORT% ya está en uso
    echo Intentando cambiar al puerto 3002...
    set PORT=3002
    goto START
)

echo 🌐 Iniciando servidor en http://localhost:%PORT%...
echo.

:: Iniciar el servidor y mantener la ventana abierta
set CHOICE_CMD=choice /C /T 5 /D n >nul
call npm run dev > server-output.log 2>&1
set EXIT_CODE=%ERRORLEVEL%

:: Verificar si el servidor comenzó exitosamente
timeout /t 3 /nobreak >nul
if not exist .next\standalone\page-data\api\hello\jssearch\0\manifest.json (
    echo.
    echo ⏳ Esperando a que el servidor inicie...
    echo.
    timeout /t 8 /nobreak >nul
)

:: Verificar si el servidor está corriendo probando el puerto
curl -s http://localhost:%PORT% >nul 2>&1
if %errorLevel% equ 0 (
    echo.
    echo ✅ ==========================================
    echo ✅ Servidor corriendo exitosamente!
    echo ✅ Accede a: http://localhost:%PORT%
    echo ✅ ==========================================
    echo.
    echo 📄 Ver registro de salida: server-output.log
    echo.
    choice /C Y /M "¿Deseas ver el registro del servidor?" >nul
    if errorlevel 1 type server-output.log
) else (
    echo.
    echo ❌ Error: El servidor no inició correctamente
    echo Revisa server-output.log para más detalles
    echo.
    choice /C Y /M "¿Deseas ver el registro del servidor?" >nul
    if errorlevel 1 type server-output.log
)

pause