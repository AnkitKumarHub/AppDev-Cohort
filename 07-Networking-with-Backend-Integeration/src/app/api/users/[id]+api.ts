//this is a dynamic route
import {db} from '@/lib/db'

// context type
type Ctx = {
    params: {id:string} 
}


// get a user
export async function GET(_req:Request, {id}:{id:string}){
try {
    const result = await db.execute({
        sql: 'SELECT * FROM users_data WHERE id = ?',
        args: [Number(id)]
    })
    if(result.rows.length === 0){
        return Response.json({
            error: 'User not found',
            status: 404
        })
    }
    return Response.json({
        data: result.rows,
        status: 200
    })
} catch (error) {
    console.error('Error in getting user', error)
    return Response.json({
        error: 'Failed to get user',
        status: 500
    })
}
}

// update a user
export async function PATCH(requset: Request, {params}:Ctx){

}

// delete a user
export async function DELETE(requset: Request, {params}:Ctx){

}

