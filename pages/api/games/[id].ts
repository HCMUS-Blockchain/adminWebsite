import Cookies from 'cookies'
import httpProxy from 'http-proxy'
import { NextApiHandler } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

const handler: NextApiHandler = async (req, res) => {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('access_token')
    if (accessToken) {
      req.headers.Authorization = `JWT ${accessToken}`
    }

    req.headers.cookie = ''
    proxy.web(req, res, {
      target: 'http://localhost:3001',
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes', () => {
      resolve(true)
    })
  })
}

export default handler
