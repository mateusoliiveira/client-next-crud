import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiServer } from '../../../_services'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	try {
		const { data, status } = await ApiServer.get(`/products`)
		return res.status(status).json(data)
	} catch (error: any) {
		return res.status(error.response.status).json(error.response.data)
	}
}
