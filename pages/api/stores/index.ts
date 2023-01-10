import { NextApiHandler, NextApiRequest } from 'next'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import dayjs from 'dayjs'
import httpProxy from 'http-proxy'
import { Campaign, Store } from '@/models'
import Cookies from 'cookies'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

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

const proxy = httpProxy.createProxyServer()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const x = await readFile(req)
    const { _id, title, description, image, coordinates, address } = x.fields
    let imageSource
    if (Object.keys(x.files).length === 0) {
      imageSource = x.fields.image
    } else {
      const y = JSON.parse(JSON.stringify(x.files.image))
      if (y) {
        const x = await cloudinary.v2.uploader.upload(y.filepath)
        imageSource = x.secure_url
      }
    }
    let foo = {} as Store
    foo.title = title.toString()
    foo.description = description.toString()
    foo.address = address.toString()
    foo.image = imageSource?.toString() || ''
    foo.coordinates = coordinates.toString()
    if (_id) {
      foo._id = _id.toString()
    }
    console.log(foo)

    proxy.once('proxyReq', function (proxyReq, req, res, options) {
      let bodyData = JSON.stringify(foo)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.write(bodyData)
    })
  }

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
