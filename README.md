### eCARus local Webserver

This is a local webserver that should be used as Human Machine Interface in an electric-car designed by the eCARus student organisation at TUM. This webserver's backend is supposed to run on the local computer in electric-car, the displays (frontend) should run on the touch screens that were used for interaction between user/driver and the auto. Because of the corona pandemy and following rebasing of EWR chair to Garching, the project was prematurely canceled and could not be finished.

#### Backend
Main task of the backend is to process and forward data between frontend and the maincontroller of the auto, and to manage the database used to store users' information and statistics. The last part could not be finished because of the abrupt canceling. The backend was written by Bo-Wen Yuan and Ruslan Mammadov (alphabetically).

#### Frontend
The frontend is used to display driving data, like speed and battery status for example, and to get commands from user, like lights. The personalization, e.g. the user data, settings etc., could not be finished because of the abrupt canceling. The frontend was written by Yizhe Zhang and Wafa Laroussi.

#### Mobile App
The mobile app (_phone_app.js_ and phone_assets) was designed to be used for authentification. The idea was to make log in faster by saving authentification data on mobiles. This part was written by Fratiloiu Teodor.

#### Maincontroller imitator
The maincontroller imitator (mc-imitator) is a testing program, which imitates maincontroller. This program can receive and display messages that are supposed to be sent to maincontroller, and they send the message as if they were sent from maincontroller. This part was written by Ruslan Mammadov.

#### Running the webserver and scripts
To start the webserver, you have to install the _npm_ & _NodeJS_, execute script _install.sh_ (`sh /.install.sh`), and execute one of the scripts in the _start-scripts_ directory, according to your OS and your goals (you probably want to execute the webserver locally and in the debug mode). The start scripts are outdated and will be updated in near future. However, they still work.
