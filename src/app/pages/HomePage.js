'use client';

import React, { useState, useEffect } from 'react';
import MainBannerComp from '../components/MainBannerComp';
import { Card, CardHeader, CardFooter, Image, Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../assets/svg/SearchIcon";

const HomePage = () => {
	const movieNameTags = ['patti', 'family', 'love', 'legal', 'sweet', 'sacred', 'man', 'woman', 'sex', 'loyal', 'ved', 'babygirl', 'arcane', 'murder', 'kiss', 'legal', 'hostel', 'moana'];
	const [movieList, setMovieList] = useState([]);
	const [loading, setLoading] = useState(true); // Manage loading state
	const [error, setError] = useState(null); // Manage error state

	const TOTAL_MOVIE_TAGS = 5;

	// Function to get random elements
	function getRandomTags(array, num) {
		const randomTags = [];
		while (randomTags.length < num) {
			const randomIndex = Math.floor(Math.random() * array.length);
			if (!randomTags.includes(array[randomIndex])) {
				randomTags.push(array[randomIndex]);
			}
		}
		return randomTags;
	}

	// Fetch movie data when the component mounts
	useEffect(() => {
		const getMovieTags = getRandomTags(movieNameTags, TOTAL_MOVIE_TAGS); // Get 5 random tags
		setLoading(true);
		setError(null); // Reset error state

		// Fetch movies using async requests
		const fetchMovies = async () => {
			try {
				const moviePromises = getMovieTags.map((movieTag) =>
					fetch(`https://www.omdbapi.com/?s=${movieTag}&y=2024&apikey=${process.env.NEXT_PUBLIC_API_KEY}&type=movie`)
						.then((res) => res.json())
						.then((data) => data.Search || [])
				);

				const moviesArray = await Promise.all(moviePromises); // Wait for all promises to resolve

				// Flatten the array of movie lists and filter out invalid entries
				const combinedMovies = moviesArray.flat().filter((movie) => movie.Poster !== 'N/A');

				setMovieList(combinedMovies); // Update the state with the combined movie list
			} catch (err) {
				console.error('Failed to fetch movies:', err);
				setError('Failed to load movies. Please try again later.');
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchMovies();
	}, []);

	return (
		<main className="main-container">
			<MainBannerComp />

			<div className="px-8 mt-6 grid grid-cols-12">
				<div className="sm:col-span-6">
					<h2 className="text-2xl font-medium">Movies</h2>
				</div>
				<div className="sm:col-span-6">
					<Input
						classNames={{
							base: "max-w-full",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Search movies"
						size="sm"
						startContent={<SearchIcon size={18} />}
						type="search"
					/>
				</div>
			</div>

			<div className="max-w-[1800px] gap-3 grid grid-cols-12 grid-rows-2 px-8" style={{ marginTop: 30, marginBottom: 30 }}>
				{/* Render movie list */}
				{loading ? (
					<div className="text-center font-medium">Loading...</div>
				) : error ? (
					<div className="text-center text-red-500 font-medium">{error}</div>
				) : movieList.length > 0 ? (
					movieList.map((movie, index) => (
						<Card isFooterBlurred className="col-span-12 sm:col-span-2" key={index}>
							<CardHeader className="absolute z-10 top-1 flex-col items-start">
								<p className="text-tiny text-white/60 uppercase font-bold">New</p>
								{/* <h4 className="text-black font-medium text-2xl">{movie.Title}</h4> */}
							</CardHeader>
							<Image
								removeWrapper
								alt={movie.Title}
								className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
								src={movie.Poster || "https://via.placeholder.com/400x600"} // Fallback if no poster
							/>
							<CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
								<div>
									<h2 className="text-black text-tiny">{movie.Title}</h2>
								</div>
								<Button className="text-tiny" color="primary" radius="full" size="sm">
									Notify Me
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<div className="px-8 grid grid-cols-12">
						<p className="font-medium">No movies found.</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default HomePage;
