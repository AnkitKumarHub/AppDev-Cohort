import { db } from '@/lib/db'

export async function GET() {
    try {
        const result = await db.execute({
            sql: 'SELECT * FROM users_data'
        })
        return Response.json({
            data: result.rows,
            status: 200
        })
    } catch (error) {
        return Response.json({
            error: 'Failed to get users',
            status: 500
        })
    }
}

export async function POST(request: Request) {
    const { name, email } = await request.json()

    //here Response object is a global which will be used to send the response to the client
    if (!name || !email) {
        return Response.json({
            error: 'Name and email are required',
            status: 400
        })
    }

    try {
        const result = await db.execute({
            sql: 'INSERT INTO users_data (name, email) VALUES (?, ?)',
            args: [name, email]
        })
        console.log('Result of user creation', result) //lastInsertRowid is a bigint
        return Response.json(
            { id: Number(result.lastInsertRowid), name, email },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error in user creation', error)
        return Response.json({
            error: 'Failed to create user',
            status: 500
        })
    }
}