star server is the ipfs webrtc signaling server. It tells peers what webrtc ip and port to use to connect to each other

## run in docker

### start on port 13579
`docker-compose up`

### start on port 13579 with logs
`docker-compose run --rm --entrypoint="npm run start:debug --service-ports star-server"`

## run outside docker

### install node_modules
`npm install`

### start on port 13579
`npm start`

### start on port 13579 with logs
`npm run start:debug`
