import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiServer } from '../../../_services'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'PATCH') {
		try {
			const { data, status } = await ApiServer.patch(`/users/${req.query.id}`, req.body)
			return res.status(status).json(data)
		} catch (error: any) {
			return res.status(error.response.status).json(error.response.data)
		}
	}

	if (req.method === 'DELETE') {
		try {
			const { data, status } = await ApiServer.delete(`/users/${req.query.id}`)
			return res.status(status).json(data)
		} catch (error: any) {
			return res.status(error.response.status).json(error.response.data)
		}
	}
}
