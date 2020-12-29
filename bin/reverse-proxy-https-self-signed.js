const signalling = require('libp2p-webrtc-star/src/sig-server')
;(async () => {
  const server = await signalling.start({
    port: 13578,
    host: '0.0.0.0',
    metrics: false
  })
  console.log('Listening on:', server.info.uri)
  process.on('SIGINT', async () => {
    await server.stop()
    console.log('Signalling server stopped')
    process.exit()
  })
})()

const selfsigned = require('selfsigned')
const pems = selfsigned.generate([{name: 'commonName', value: 'selfsigned'}], {days: 365})
const ssl = {key: pems.private, cert: pems.cert}

const proxyServerPort = 13579
const httpProxy = require('http-proxy')
const proxy = httpProxy.createServer({
  target: 'ws://localhost:13578',
  ws: true,
  ssl
})

proxy.on('error', (error) => {
  console.log(`reverse proxy error: ${error.message}`)
  // console.log(error)
})

proxy.listen(proxyServerPort)
console.log(`https self signed reverse proxy listening on port ${proxyServerPort}`)
