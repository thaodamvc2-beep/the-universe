@echo off
setlocal EnableExtensions
chcp 65001 >nul
 title THE UNIVERSE - CHAY THU
cd /d "%~dp0"

 echo.
 echo ================================================
 echo          THE UNIVERSE - CHAY THU
 echo ================================================
 echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [LOI] May chua cai Node.js.
  echo Hay cai Node.js ban LTS tu https://nodejs.org/ roi bam lai file nay.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [LOI] Khong tim thay npm. Hay cai lai Node.js LTS.
  pause
  exit /b 1
)

for /f "tokens=1 delims=v" %%V in ('node --version') do set NODEVER=%%V
 echo [1/5] Phien ban Node.js:
node --version
npm --version

if not exist "apps\web\.env.local" (
  if exist "apps\web\.env.example" (
    copy "apps\web\.env.example" "apps\web\.env.local" >nul
    echo Da tao apps\web\.env.local tu file mau.
  )
)

if not exist "node_modules" (
  echo.
  echo [2/5] Dang cai thu vien. Can ket noi Internet, co the mat vai phut...
) else (
  echo.
  echo [2/5] Kiem tra/cap nhat thu vien...
)
npm install
if errorlevel 1 goto install_error

echo.
echo [3/5] Chay bo kiem thu tu dong...
npm test
if errorlevel 1 goto test_error

echo.
echo [4/5] Kiem tra lint...
npm run lint
if errorlevel 1 goto lint_error

echo.
echo [5/5] Kiem tra TypeScript...
npm run typecheck
if errorlevel 1 goto type_error

echo.
echo Dang khoi dong website. Trinh duyet se mo tai http://localhost:3000
 echo Nhan Ctrl+C trong cua so nay de dung website.
 timeout /t 3 /nobreak >nul
start "" http://localhost:3000
npm run dev
 echo.
 echo Website da dung. Nhan phim bat ky de dong cua so.
 pause >nul
exit /b 0

:install_error
echo.
echo [LOI] Cai thu vien that bai. Kiem tra Internet hoac thu lai sau.
echo Neu thay EAI_AGAIN/DNS, may khong truy cap duoc npm registry.
pause
exit /b 1
:test_error
echo.
echo [LOI] Bo kiem thu tu dong co bai test that bai. Gui lai noi dung loi.
pause
exit /b 1
:lint_error
echo.
echo [LOI] Lint khong dat. Gui lai noi dung loi de sua.
pause
exit /b 1
:type_error
echo.
echo [LOI] TypeScript khong dat. Gui lai noi dung loi de sua.
pause
exit /b 1
