import { NextApiHandler, NextApiRequest } from 'next'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import dayjs from 'dayjs'
import httpProxy from 'http-proxy'
import { Campaign } from '@/models'

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
    console.log(x)
    const { name, numberOfVoucher, description, dateEnd, dateBegin, games, status, _id } = x.fields
    const start = dayjs(dateBegin.toString()).unix()
    const end = dayjs(dateEnd.toString()).unix()
    let imageSource

    if (Object.keys(x.files).length === 0) {
      imageSource = x.fields.imageCover
    } else {
      const y = JSON.parse(JSON.stringify(x.files.imageCover))
      if (y) {
        const x = await cloudinary.v2.uploader.upload(y.filepath)
        imageSource = x.secure_url
      }
    }

    let foo = {} as Campaign
    foo.name = name.toString()
    foo.numberOfVoucher = parseInt(numberOfVoucher.toString())
    foo.description = description.toString()
    foo.dateBegin = start
    foo.dateEnd = end
    foo.image = imageSource?.toString() || ''
    foo.status = status.toString()
    foo.games = games.toString().split(',')
    if (_id) {
      foo._id = _id.toString()
    }

    proxy.on('proxyReq', function (proxyReq, req, res, options) {
      let bodyData = JSON.stringify(foo)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.write(bodyData)
    })
  }

  return new Promise((resolve) => {
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
