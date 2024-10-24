import Link from 'next/link'

interface Params {
    makeId: string
    year: string
}

interface VehicleModel {
    Make_ID: number
    Make_Name: string
    Model_ID: number
    Model_Name: string
}

async function fetchVehicleModels(
    makeId: string,
    year: string
): Promise<VehicleModel[]> {
    const API_URL = process.env.PUBLIC_CAR_DATABASE_API

    if (!API_URL) {
        throw new Error(
            'PUBLIC_CAR_DATABASE_API is not defined in the environment variables'
        )
    }

    const res = await fetch(
        `${API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )

    if (!res.ok) throw new Error('Failed to fetch vehicle models')

    const data = await res.json()

    return data.Results
}

export default async function ResultPage({
    params,
}: {
    params: Promise<Params>
}) {
    const { makeId, year } = await params
    const models = await fetchVehicleModels(makeId, year)

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Vehicle Models
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Showing results for Make ID: {makeId} and Year: {year}
                </p>
                {models.length === 0 ? (
                    <p className="text-xl text-gray-600">
                        No models found for this make and year.
                    </p>
                ) : (
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {models.map((model) => (
                            <li
                                key={model.Model_ID}
                                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                            >
                                <div className="w-full flex items-center justify-between p-6 space-x-6">
                                    <div className="flex-1 truncate">
                                        <h3 className="text-gray-900 text-sm font-medium truncate">
                                            {model.Model_Name}
                                        </h3>
                                        <p className="text-gray-500 text-sm truncate">
                                            Model ID: {model.Model_ID}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const apiUrl = process.env.PUBLIC_CAR_DATABASE_API

    if (!apiUrl) {
        throw new Error(
            'PUBLIC_CAR_DATABASE_API is not defined in the environment variables'
        )
    }

    const makes = await fetch(
        `${apiUrl}/GetMakesForVehicleType/car?format=json`
    )
        .then((res) => res.json())
        .then((data) => data.Results)

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
        (currentYear - i).toString()
    )

    const params = makes.flatMap((make: { MakeId: number }) =>
        years.map((year) => ({
            makeId: make.MakeId.toString(),
            year,
        }))
    )

    return params
}
