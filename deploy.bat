DEL /F /S /Q "c:\ilsc\*"
RMDIR "c:\ilsc\" /S /Q
call demeteorizer -o "c:\ilsc"
DEL /F /S /Q "c:\ilsbun\programs"
RMDIR "c:\ilsbun\programs" /S /Q
PAUSE
XCOPY /Q /S /E /H /R /Y "C:\ilsc\bundle\*" "C:\ilsbun"
XCOPY /Q /S /E /H /R /Y "C:\ilsbun\programs\web.browser" "C:\ilsbun\programs\server\"
XCOPY /Q /S /E /H /R /Y "c:\ilsbun\setting\*" "C:\ilsbun\programs\server\"
PAUSE
cd C:\ilsbun\programs\server
call npm install
PAUSE
call git add .
call git commit -m "Autodeploy"
PAUSE
call git push temp master -f
cd c:\ils
