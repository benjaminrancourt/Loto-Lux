@ECHO OFF &SETLOCAL

ROBOCOPY .\server\src .\coverage\server\src index.html *.ts.html /S /NFL /NDL /NJH /NJS /NC /NS /NP /MOV
ROBOCOPY .\..\server\src .\coverage\server\src index.html *.ts.html /S /NFL /NDL /NJH /NJS /NC /NS /NP /MOV
ROBOCOPY .\client\app .\coverage\client\app index.html *.ts.html /S /NFL /NDL /NJH /NJS /NC /NS /NP /MOV
ROBOCOPY .\..\client\app .\coverage\client\app index.html *.ts.html /S /NFL /NDL /NJH /NJS /NC /NS /NP /MOV

Set "OldString_1= ../../"
Set "NewString_1= "

Set "OldString_2=(../../"
Set "NewString_2=("

Set "OldString_3="../../"
Set "NewString_3=""

Set "OldString_4=>../../"
Set "NewString_4=>"

cd /d ./coverage
for /R %%x in (*.html) do call:process "%%~x"
goto:eof

:process 
set "inFile=%~p1%~n1%~x1"
set "inFileRen=%~n1%~x1"
set "outFile=%~p1%~n1_correct%~x1"
(for /f "skip=2 delims=" %%a in ('find /n /v "" "%~1"') do (  
    set "ln=%%a"
    Setlocal enableDelayedExpansion  
    set "ln=!ln:*]=!"  
    if defined ln (
        set "ln=!ln:%OldString_1%=%NewString_1%!"
        set "ln=!ln:%OldString_2%=%NewString_2%!"
        set "ln=!ln:%OldString_3%=%NewString_3%!"
        set "ln=!ln:%OldString_4%=%NewString_4%!"
    )
    echo(!ln!  
    endlocal  
))>"%outFile%"
del %inFile%
ren %outFile% %inFileRen%
exit /b