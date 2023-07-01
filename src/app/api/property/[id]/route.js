import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Property from "@/models/Property";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const property = await Property.findById(id).populate("currentOwner").select('-password')

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const property = await Property.findById(id).populate('currentOwner')

        if (property?.currentOwner?._id.toString() !== decodedToken._id.toString()) {
            return new Response(JSON.stringify({ msg: 'Only owner can update his property' }), { status: 403 })
        }

        const updatedproperty = await Property.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedproperty), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const property = await Property.findById(id).populate('currentOwner')
        if (property?.currentOwner?._id.toString() !== decodedToken._id.toString()) {
            return new Response(JSON.stringify({ msg: 'Only owner can delete his property' }), { status: 403 })
        }

        await Property.findByIdAndDelete(id)

        return new Response(JSON.stringify({ msg: 'Successfully deleted property' }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}