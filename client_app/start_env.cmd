echo off
cls



start /D "C:\Users\rbaine\Google Drive\dev\projects\agile\server_app" mongod --dbpath "C:\Source_Code\MongoDB\data"

start /D "C:\Users\rbaine\Google Drive\dev\projects\agile\server_app" node app.js /WAIT

