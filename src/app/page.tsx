import FilterPage from '@/components/FilterPage'

export default async function Home() {
    const apiUrl = process.env.PUBLIC_CAR_DATABASE_API

    if (!apiUrl) {
        throw new Error(
            'PUBLIC_CAR_DATABASE_API is not defined in the environment variables'
        )
    }

    const response = await fetch(
        `${apiUrl}/GetMakesForVehicleType/car?format=json`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch vehicle makes')
    }

    const data = await response.json()
    const makes = data.Results

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
            <img src="/car.svg" height={100} width={100} />
            <FilterPage makes={makes} />
        </main>
    )
}
