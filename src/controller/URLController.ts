import shortId from 'shortid'
import {Request, Response} from 'express'
import {config} from '../config/Constants'
import { URLModel } from '../db/model/URL'

export class URLController {
    public async short(req: Request, response: Response): Promise<void> {
        const { ogURL } = req.body
        const url = await URLModel.findOne({ogURL});
        if(url) {
            response.json(url)
            return
        }

        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({hash, shortURL, ogURL})

        response.json(newURL)
    }

    public async redirect(req: Request, response: Response): Promise<void> {
        const {hash} = req.params
        const url = await URLModel.findOne({hash})

        if(url) {
            if(url.ogURL.includes('http://') || url.ogURL.includes('https://')){
                 response.redirect(url.ogURL)
                }
            else response.redirect(`http://${url.ogURL}`)
            return
        }
        response.status(400).json({error: 'Url não encontrada!'})
    }
}