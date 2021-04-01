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
NODE_ENV=test npm run-script debug &
cd ..

cd frontend-smartphone
npm run start_test &
cd ..

cd frontend-center-screen
npm run start_test &
cd ..

cd test/maincontroller-imitator
npm run-script debug&&open https://localhost:1000
cd ../..

trap endMe SIGINT
while :;do sleep 86400; done
