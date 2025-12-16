@echo off
echo ========================================
echo Laina Bags - Build Fix Script
echo ========================================
echo.

echo Step 1: Cleaning build cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✓ Removed .next folder
) else (
    echo ✓ .next folder already clean
)

echo.
echo Step 2: Cleaning node_modules...
if exist "node_modules" (
    rmdir /s /q "node_modules"
    echo ✓ Removed node_modules folder
) else (
    echo ✓ node_modules already clean
)

echo.
echo Step 3: Removing package-lock.json...
if exist "package-lock.json" (
    del package-lock.json
    echo ✓ Removed package-lock.json
) else (
    echo ✓ package-lock.json already removed
)

echo.
echo Step 4: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed successfully

echo.
echo Step 5: Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ✗ Build failed
    pause
    exit /b 1
)
echo ✓ Build completed successfully!

echo.
echo ========================================
echo Build successful! Ready for deployment.
echo ========================================
pause
