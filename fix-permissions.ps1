# Fix permissions and rebuild script
$projectPath = "d:\project\Antigravity_work_Space\herfa_native"

Write-Host "=== Stopping all Node/Gradle processes ===" -ForegroundColor Green
taskkill /F /IM node.exe 2>$null
taskkill /F /IM java.exe 2>$null
taskkill /F /IM gradle.exe 2>$null
Start-Sleep -Seconds 2

Write-Host "=== Clearing caches ===" -ForegroundColor Green
Remove-Item -Recurse -Force "$projectPath\.expo" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$projectPath\android\app\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$projectPath\android\.gradle" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$projectPath\.gradle" -ErrorAction SilentlyContinue

Write-Host "=== Resetting npm cache ===" -ForegroundColor Green
npm cache clean --force

Write-Host "=== Running npm install ===" -ForegroundColor Green
cd $projectPath
npm install

Write-Host "=== Cleaning Gradle ===" -ForegroundColor Green
cd "$projectPath\android"
.\gradlew clean

Write-Host "=== Done! ===" -ForegroundColor Green
Write-Host "Next step: Run 'npm run android' in the project directory" -ForegroundColor Cyan
