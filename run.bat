@ECHO OFF


cd device-sdk
start FCardProtocolAPI.exe

cd ..

cd src
@set PATH=php;%PATH%
start php -S 127.0.0.1:8000

timeout /t 10
@set PATH=node;%PATH%
start node socket.js ws://localhost:5000/Websocket
