/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

const Pusher = require('pusher')

try {
  const pusher = new Pusher({
    appId: '1248961',
    key: '8b7a3aa9d2c977813906',
    secret: '4fb638ede0a30fc80726',
    cluster: 'eu',
    useTLS: true,
  })

  // pusher.trigger('my-channel', 'my-event', {
  //   message: 'hello world',
  // })
} catch (error) {
  console.log(error)
}

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname).httpServer().start()
