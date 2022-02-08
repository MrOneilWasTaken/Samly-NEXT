import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  query: string,
  message: string,
  link: string,
  response: object,
  originallink: string,
  samlydlink: string
}

const db = require('better-sqlite3')("db/redirects.db")

function getRandomString(length:number){
  const charStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += charStr.charAt(Math.floor(Math.random() * charStr.length))
  }
  return result
}

export default function handler(req: NextApiRequest,res: NextApiResponse) {
  const link =  req.query.link
  const linkSize = 5
  if (req.query.link) {
    let samlyLink = getRandomString(linkSize)
    const newLink = db.prepare('INSERT INTO redirects VALUES (@samlyLink,@link)')

    newLink.run({"samlyLink": samlyLink, "link":link})

    let response = { message: 'Samly Link created',
                   originallink: `${link}`,
                   samlydlink: `${samlyLink}`,

    }
    res.status(200).json(response)
  }
}

