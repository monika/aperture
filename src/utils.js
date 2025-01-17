import { parse as _parse } from 'url'

import db from './mongo.config.js'

export const fetchServerFromPortalId = portalId => new Promise((resolve, reject) =>
	db.servers.find({ 'info.portal': portalId }, (error, docs) => {
	    if(error) return reject(error)
	    if(docs.length === 0) return resolve(null)

	    resolve(docs[0].info)
	})
)

export const log = (...msg) => console.log('[CRYB-APERTURE]', ...msg)

export const parse = url => {
	if(url.length <= 1) return {}

	return JSON.parse('{"' + decodeURI(_parse(url).query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}