import { URLController } from './controller/URLController';
import express from 'express'
import { DBConnect } from './db/DBConnect';

const api = express();
api.use(express.json())

const db = new DBConnect()
db.connect()

const urlController = new URLController();
api.post("/short", urlController.short)
api.get("/:hash", urlController.redirect)

api.listen(5000, () => console.log('Express listening at port :5000'))