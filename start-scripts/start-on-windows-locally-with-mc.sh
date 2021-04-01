# Start on windows

function endMe {
echo ""
echo "You pressed ctrl с. Now look me disappearing."
cmd "/C TASKKILL /IM node.exe /F"
exit 0
}

set "REACT_APP_NODE_ENV=test"

cd ..

cd backend
npm run-script debug&
cd ..

cd frontend-smartphone
npm run start_on_windows_test&
cd ..

cd frontend-center-screen
npm run start_on_windows_test&
cd ..

trap endMe SIGINT
while :;do sleep 86400; done
