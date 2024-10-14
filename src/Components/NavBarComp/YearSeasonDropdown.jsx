
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import useCourseYear from "../../lib/providers/courses-year.js";

const useDropdownPosition = (ref) => {
    const [dropUp, setDropUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const bottomSpace = window.innerHeight - rect.bottom;
                setDropUp(bottomSpace < 200);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [ref]);

    return dropUp;
};

export default function YearSeasonDropdown() {
    const { availableSeasons, setYearAndSeason, initialize } = useCourseYear();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('');
    const dropdownRef = useRef(null);
    const dropUp = useDropdownPosition(dropdownRef);

    useEffect(() => {
        initialize();
        if (availableSeasons.length > 0) {
            setSelectedSeason(availableSeasons[0]); // Set default to the first available season
        }
    }, []);

    const handleSeasonChange = (season) => {
        setSelectedSeason(season);
        const [selectedSeasonName, selectedYear] = season.split('_'); // Extract the name and year
        setYearAndSeason(selectedYear, selectedSeasonName.toLowerCase()); // Set the year and the season in lowercase
        setIsOpen(false);
    };

    const handleKeyDown = (event, season) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleSeasonChange(season);
        }
    };

    return (
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <label htmlFor="year-dropdown" className="font-semibold text-xl text-gray-800">
                Choose Semester:
            </label>
            <div className="relative inline-block w-40" ref={dropdownRef}>
                <button
                    id="year-dropdown"
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-yellow-400 border border-yellow-400 rounded-md shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="year-dropdown-label"
                >
                    <span className="truncate">{selectedSeason?.replace("_", " ") || 'Select Season'}</span>
                    {dropUp ? (
                        <ChevronUp className="w-4 h-4 ml-2 text-gray-600" aria-hidden="true" />
                    ) : (
                        <ChevronDown className="w-4 h-4 ml-2 text-gray-600" aria-hidden="true" />
                    )}
                </button>

                {isOpen && (
                    <div
                        className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${dropUp ? 'bottom-full mb-1' : 'top-full'}`}
                    >
                        <ul
                            className="py-1 overflow-auto text-sm rounded-md max-h-60 focus:outline-none"
                            role="listbox"
                            aria-labelledby="year-dropdown-label"
                            tabIndex={-1}
                        >
                            {availableSeasons.length > 0 ? (
                                availableSeasons.map((season) => (
                                    <li
                                        key={season}
                                        className={`relative px-4 py-2 cursor-pointer select-none ${
                                            season === selectedSeason
                                                ? 'text-gray-800 bg-yellow-200'
                                                : 'text-gray-900 hover:bg-yellow-100'
                                        }`}
                                        onClick={() => handleSeasonChange(season)}
                                        onKeyDown={(e) => handleKeyDown(e, season)}
                                        role="option"
                                        aria-selected={season === selectedSeason}
                                        tabIndex={0}
                                    >
                                        <span className="block truncate">{season.replace("_", " ")}</span>
                                        {season === selectedSeason && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <Check className="w-4 h-4 text-yellow-600" aria-hidden="true" />
                                            </span>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No seasons available</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
