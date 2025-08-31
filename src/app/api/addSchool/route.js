import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const connection = await dbConnect();
  try {
    const formData = await request.formData();

    // Extract image from FormData
    const imageFile = formData.get("image"); // this is a File object
    const entries = Object.fromEntries(formData); // other fields

    let imagePath = null;

    if (imageFile) {
      // Convert File → Buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // Ensure SchoolImages folder exists
      const uploadDir = path.join(process.cwd(), "public", "SchoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save file with unique name
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      // Store relative path to DB
      imagePath = `/SchoolImages/${fileName}`;
    }

    // Example: prepare data for DB insert
    const schoolData = {
      name: entries.name,
      address: entries.address,
      city: entries.city,
      state: entries.state,
      contact: entries.contact,
      email_id: entries.email_id,
      image: imagePath, // store path instead of binary
    };

    console.log("schoolData", schoolData);

    const { name, address, city, state, contact, email_id } = entries;

    // image path you saved earlier
    // const imagePath = `/SchoolImages/${Date.now()}-${entries.image?.name || "default.png"}`;

    const [result] = await connection.db.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imagePath, email_id]
    );

    console.log("Inserted ID:", result.insertId);

    // TODO: insert into MySQL with connection.query("INSERT ...", [values])

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
