import { NextApiRequest, NextApiResponse } from "next"
import { without } from "lodash"
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth"
import { error } from "console"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req)

            const { moveId } = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: moveId
                }
            })
            if (!existingMovie) {
                throw new Error('Invalid Id')
            }
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: {
                        push: moveId
                    }
                }
            })
            return res.status(200).json(user)
        }

        if (req.method === 'DELETE') {

            const { currentUser } = await serverAuth(req)
            const { moveId } = req.body
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: moveId
                }
            })

            if (!existingMovie) {
                throw new Error('Invalid Id')
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, moveId)

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })
            return res.status(200).json(user)

        }

        return res.status(405).end()

    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}