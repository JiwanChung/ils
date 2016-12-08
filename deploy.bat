DEL /F /S /Q /A "c:\ilsc\*"
call demeteorizer -o "c:\ilsc"
PAUSE
DEL /F /S /Q /A "c:\ilsbun\programs"
robocopy "C:\ilsc\bundle\programs" "C:\ilsbun" /E /MOVE
robocopy "C:\ilsbun\programs\web.browser" "C:\ilsbun\programs\server" /E /MOVE
XCOPY /S /Q /A /R /H /Y "c:\ilsbun\setting\*" "C:\ilsbun\programs\server"
cd C:\ilsbun\programs\server
call npm install
PAUSE
git add .
git commit -m "Autodeploy"
PAUSE
call git push temp master -f
cd c:\ils
