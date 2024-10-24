'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Make {
    MakeId: number
    MakeName: string
}

export default function FilterPage({ makes }: { makes: Make[] }) {
    const [selectedMake, setSelectedMake] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [error, setError] = useState('')
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
        (currentYear - i).toString()
    )

    const isNextDisabled = !selectedMake || !selectedYear

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isNextDisabled) {
            setError('Please select both a vehicle make and a model year.')
        } else {
            setError('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 ">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-center text-gray-700">
                    Vehicle Filter
                </h1>
                <h2 className="text-lg font-bold text-center text-gray-700/50">
                    @marcosmonaco for @developstoday
                </h2>
            </div>
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="make-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Select a vehicle make
                    </label>
                    <select
                        id="make-select"
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    >
                        <option value="">Select a vehicle make</option>
                        {makes.map((make) => (
                            <option
                                key={make.MakeId}
                                value={make.MakeId.toString()}
                            >
                                {make.MakeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="year-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Select a model year
                    </label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    >
                        <option value="">Select a model year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Link
                href={
                    isNextDisabled
                        ? '#'
                        : `/result/${selectedMake}/${selectedYear}`
                }
                passHref
                className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    isNextDisabled
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
                aria-disabled={isNextDisabled}
                onClick={(e) => {
                    if (isNextDisabled) {
                        e.preventDefault()
                        setError(
                            'Please select both a vehicle make and a model year.'
                        )
                    }
                }}
            >
                Next
            </Link>
        </form>
    )
}
