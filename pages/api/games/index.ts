import Cookies from 'cookies'
import formidable from 'formidable'
import httpProxy from 'http-proxy'
import { NextApiHandler, NextApiRequest } from 'next'
export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

const readFile = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}
const handler: NextApiHandler = async (req, res) => {
  const x = await readFile(req)

  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('access_token')
    if (accessToken) {
      req.headers.Authorization = `JWT ${accessToken}`
    }

    req.headers.cookie = ''
    proxy.once('proxyReq', function (proxyReq, req, res, options) {
      let bodyData = JSON.stringify(x.fields)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.write(bodyData)
    })

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
