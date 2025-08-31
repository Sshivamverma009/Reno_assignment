"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SchoolCard = ({ school }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <div className="relative h-48 w-full">
      <Image
        src={school.image}
        alt={`Image of ${school.name}`}
        fill
        sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         25vw"
        style={{ objectFit: "cover" }}
        className="bg-gray-200"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {school.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{school.address}</p>
      <p className="text-sm text-gray-500">{school.city}</p>
    </div>
  </div>
);

export default function Page() {
  const [schools, setSchools] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setFetching(true);
      try {
        const res = await fetch("/api/showSchools");
        const data = await res.json();
        console.log(data.data);
        setSchools(data.data || []); // match API structure
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Schools
          </h1>
        </div>
        {fetching ? (
            <div>
                <h1 className="text-center text-xl text-red-500">Fetching...</h1>
            </div>
        ) : (
          <div>
            {schools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {schools.map((school) => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No schools found. Please add a school first.
                </p>
                <Link
                  href="/add-school"
                  className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add a School
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
