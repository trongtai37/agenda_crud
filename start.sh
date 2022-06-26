# Setup backend
cd backend
npm install 

# Setup frontend
cd ../frontend
npm install

cd ../
(cd ./backend && npm run start:dev) & (cd ./frontend && npm start)