import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    const connection = await dbConnect();
    try{
        const result = await connection.db.query("SELECT * FROM schools");
        // console.log('result', result[0]);
        return NextResponse.json({data: result[0] || []});
    }
    catch(error) {
        console.log('Error:', error);
    }
}