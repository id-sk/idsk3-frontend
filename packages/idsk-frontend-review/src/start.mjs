import { ports, urls } from '@govuk-frontend/config'

import app from './app.mjs'

const server = await app()

// Ak server (MIRRI) povie, že chce iný port (process.env.PORT), použi ten.
// Ak nepovie nič, použi ten tvoj pôvodný (ports.app).
const port = process.env.PORT || ports.app

server.listen(port, () => {
  // Ak bežíš na špecifickom porte, vypíš to, inak použi pôvodnú URL
  const address = process.env.PORT ? `http://localhost:${port}` : urls.app
  console.log(`Server started at ${address}`)
})
