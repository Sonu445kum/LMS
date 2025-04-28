import React from "react";
import { useGetAllCertificationsQuery } from "../../Features/Api/certificationsApi";
import { Link } from "react-router-dom";

const DisplayCertificates = () => {
    const { data: certifications, isLoading, isError } = useGetAllCertificationsQuery();

    if (isLoading) return <p>Loading certifications...</p>;
    if (isError) return <p>Failed to load certifications.</p>;

    return (
        <div className="mb-10 container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Certifications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {certifications.map((cert) => (
                    <div
                        key={cert._id}
                        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-semibold">{cert.title}</h2>
                        <p className="text-sm text-gray-600">{cert.category}</p>
                        <p className="text-sm text-gray-800 font-bold">${cert.price}</p>
                        <p className="text-sm text-gray-600">{cert.duration}</p>
                        <p className="text-sm text-gray-600">{cert.description}</p>
                        <p className="text-sm text-gray-600">{cert.tag}</p>
                        <p className="text-sm text-gray-600">{cert.tagColor}</p>
                        <p className="text-sm text-gray-600">{cert.introduction}</p>
                        <ul className="text-sm text-gray-600">
                            <li>{cert.key_1}</li>
                            <li>{cert.key_2}</li>
                            <li>{cert.key_3}</li>
                        </ul>
                        <ul className="text-sm text-gray-600">
                            <li>{cert.Course_Benefits}</li>
                            <li>{cert.Course_Benefits_2}</li>
                            <li>{cert.Course_Benefits_3}</li>
                        </ul>
                        <ul className="text-sm text-gray-600">
                            {cert.Road_map.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <Link
                            to={`/${cert._id}`}
                            className="text-blue-500 hover:underline mt-2 block"
                        >
                            View More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayCertificates;