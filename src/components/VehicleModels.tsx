import { use } from 'react'

async function fetchVehicleModels(makeId: string, year: string) {
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
    return res.json()
}

export default function VehicleModels({
    makeId,
    year,
}: {
    makeId: string
    year: string
}) {
    const data = use(fetchVehicleModels(makeId, year))

    if (data.Results.length === 0) {
        return (
            <p className="text-xl text-gray-600">
                No models found for this make and year.
            </p>
        )
    }

    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.Results.map(
                (model: { Model_ID: number; Model_Name: string }) => (
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
                )
            )}
        </ul>
    )
}
