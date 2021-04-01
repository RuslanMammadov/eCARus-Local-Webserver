# Start on windows

function endMe {
echo ""
echo "You pressed ctrl с. Now look me disappearing."
cmd "/C TASKKILL /IM node.exe /F"
exit 0
}

cd ..

cd backend
npm run-script start&
cd ..

cd frontend-smartphone
npm run start_on_windows&
cd ..

cd frontend-center-screen
npm run start_on_windows&
cd ..

trap endMe SIGINT
while :;do sleep 86400; done
