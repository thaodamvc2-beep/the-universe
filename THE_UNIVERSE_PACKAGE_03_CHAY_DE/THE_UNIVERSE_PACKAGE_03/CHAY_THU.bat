@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title THE UNIVERSE - MO WEBSITE
cls
echo ================================================
echo              THE UNIVERSE
echo ================================================
echo.
echo Dang chuan bi mo website. Ban khong can go lenh gi ca.
echo.
where node >nul 2>nul
if errorlevel 1 goto no_node
where npm >nul 2>nul
if errorlevel 1 goto no_npm

echo May da co Node.js. Dang cai cac thanh phan can thiet...
echo Buoc nay can Internet va co the mat vai phut.
echo.
call npm install
if errorlevel 1 goto install_failed

echo.
echo Da chuan bi xong. Dang mo website...
start "THE UNIVERSE - MAY CHU" cmd /k "cd /d "%~dp0" && npm run dev"
echo.
echo Cho website khoi dong trong giay lat...
timeout /t 8 /nobreak >nul
start "" "http://localhost:3000"
echo.
echo Neu trinh duyet chua tu mo, hay mo Chrome va vao dia chi:
echo http://localhost:3000
echo.
echo Khong dong cua so den co chu THE UNIVERSE - MAY CHU.
echo Muon dung website, dong cua so may chu do.
pause
exit /b 0

:no_node
echo Khong tim thay Node.js tren may.
echo Ban noi da cai Node.js, co the Windows chua nhan duong dan cai dat.
echo Hay chup anh man hinh nay gui lai cho toi.
pause
exit /b 1

:no_npm
echo Khong tim thay npm. Hay chup anh man hinh nay gui lai cho toi.
pause
exit /b 1

:install_failed
echo.
echo CHUA CAI DUOC CAC THANH PHAN CAN THIET.
echo Loi nay thuong do ket noi Internet den may chu tai thu vien.
echo Ban chup anh man hinh nay gui lai cho toi, khong can tu sua.
pause
exit /b 1
