DEL /F /S /Q "c:\ilsc\*"
call demeteorizer -o "c:\ilsc"
DEL /F /S /Q "c:\ilsbun\programs"
PAUSE
XCOPY /Q /S /E /H /R /Y "C:\ilsc\bundle\programs" "C:\ilsbun"
XCOPY /Q /S /E /H /R /Y "C:\ilsbun\programs\web.browser" "C:\ilsbun\programs\server"
XCOPY /Q /S /E /H /R /Y "c:\ilsbun\setting\*" "C:\ilsbun\programs\server"
PAUSE
cd C:\ilsbun\programs\server
call npm install
PAUSE
call git add .
call git commit -m "Autodeploy"
PAUSE
call git push temp master -f
cd c:\ils
