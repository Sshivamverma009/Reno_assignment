
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">School Management</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/addSchool" className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add School
          </Link>
          <Link href="/showSchools" className="bg-green-500 flex-1 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Show Schools
          </Link>
        </div>
      </div>
    </main>
  );
}
