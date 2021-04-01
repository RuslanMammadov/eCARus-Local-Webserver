# Start on Ubuntu, mac and probably all other os except windows

function endMe {
echo ""
echo "You pressed ctrl с. Now look me disappearing."
pkill node
pkill npm
exit 0
}

cd ..

cd backend
npm run-script start &
cd ..

cd frontend-smartphone
npm start &
cd ..

cd frontend-center-screen
npm start &
cd ..

trap endMe SIGINT
while :;do sleep 86400; done
