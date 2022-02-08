import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  query: string
}

const db = require('better-sqlite3')("db/redirects.db")

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  const {samlyLink} = req.query
  const findCorrSamly = db.prepare('SELECT link FROM redirects WHERE samlyLink = @samlyLink')
  const redirect = findCorrSamly.get({"samlyLink": samlyLink})

  res.redirect(307, redirect.link)  
}

