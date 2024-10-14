
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the seasons with their respective start and end dates
const seasons = {
    spring: { start: '01-01', end: '05-31' },
    summer: { start: '06-01', end: '08-31' },
    fall: { start: '08-19', end: '12-24' },
    winter: { start: '12-25', end: '12-31' },
};

// Function to capitalize the first letter of the season
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Function to get the current season and year based on today's date
const getCurrentSeasonAndYear = () => {
    const today = new Date();
    const monthDay = today.toISOString().slice(5, 10); // Get MM-DD format
    const currentYear = today.getFullYear(); // Get the current year

    for (const [season, range] of Object.entries(seasons)) {
        if (monthDay >= range.start && monthDay <= range.end) {
            return {
                season: capitalize(season), // Capitalize the current season
                year: currentYear, // Return the current year
            };
        }
    }

    return { season: null, year: currentYear }; // If no season found (shouldn't happen)
};

// Function to get available seasons based on the current season
const getAvailableSeasons = (currentSeason) => {
    const seasonKeys = Object.keys(seasons);
    const currentIndex = seasonKeys.indexOf(currentSeason.toLowerCase()); // Find the index of the current season in lowercase

    const availableSeasons = [];
    const currentYear = new Date().getFullYear();

    // Include the current season and next two seasons
    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % seasonKeys.length; // Wrap around to the start
        const year = currentYear + Math.floor((currentIndex + i) / seasonKeys.length); // Adjust year based on season index
        availableSeasons.push(`${capitalize(seasonKeys[index])}_${year}`); // Capitalize the season name
    }

    return availableSeasons;
};

// Create Zustand store with persist middleware
const useCourseYear = create(
    persist(
        (set, get) => ({
            year: getCurrentSeasonAndYear().year,
            season: getCurrentSeasonAndYear().season,
            availableSeasons: [],
            initialize: () => {
                const { season, year } = getCurrentSeasonAndYear(); // Get the current season and year
                const availableSeasons = getAvailableSeasons(season); // Get available seasons based on the current season
                set({ availableSeasons, season, year }); // Set the current season and year during initialization
            },
            setYearAndSeason: (year, season) => {
                const capitalizedSeason = capitalize(season);
                set({ year, season: capitalizedSeason });
                // Update available seasons based on the new selection
                const availableSeasons = getAvailableSeasons(capitalizedSeason);
                set({ availableSeasons });
            },
        }),
        {
            name: 'course-year-storage', // name of the item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        }
    )
);

export default useCourseYear;