@ECHO OFF


cd device-sdk
start FCardProtocolAPI.exe

cd ..

cd src
@set PATH=node;%PATH%
@set PATH=php;%PATH%
start node console.js