import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiServer } from '../../../_services'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { data, status } = await ApiServer.post(`/users`, req.body)
			return res.status(status).json(data)
		} catch (error: any) {
			return res.status(error.response.status).json(error.response.data)
		}
	}
	try {
		const { data, status } = await ApiServer.get(`/users`)
		return res.status(status).json(data)
	} catch (error: any) {
		return res.status(error.response.status).json(error.response.data)
	}
}
