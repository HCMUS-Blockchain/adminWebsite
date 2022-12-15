import { NextApiHandler, NextApiRequest } from 'next'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import dayjs from 'dayjs'
import httpProxy from 'http-proxy'
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

interface Data {
  name: string
  numberOfVoucher: number
  description: string
  dateBegin: number
  dateEnd: number
  image: string
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
  const x = await readFile(req)
  const { name, numberOfVoucher, description, dateEnd, dateBegin } = x.fields
  const start = dayjs(dateBegin.toString()).unix()
  const end = dayjs(dateEnd.toString()).unix()
  const y = JSON.parse(JSON.stringify(x.files.imageCover))
  let imageSource
  if (y) {
    const x = await cloudinary.v2.uploader.upload(y.filepath)
    imageSource = x.secure_url
  }

  let foo = {} as Data
  foo.name = name.toString()
  foo.numberOfVoucher = parseInt(numberOfVoucher.toString())
  foo.description = description.toString()
  foo.dateBegin = start
  foo.dateEnd = end
  foo.image = imageSource || ''

  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    //her you can create condition identifying your path
    let bodyData = JSON.stringify(foo)
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.setHeader('Content-Type', 'application/json')
    // Stream the content
    proxyReq.write(bodyData)
  })
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
