'use client';

import React, { useState, useEffect } from 'react';
import MainBannerComp from '../components/MainBannerComp';
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../assets/svg/SearchIcon";
import MovieCardComp from '../components/MovieCardComp';

const HomePage = () => {
	const movieNameTags = ['love', 'life', 'babe', 'hope', 'sweet'];
	const webSeriesTags = ['teach', 'tech', 'hack', 'love', 'army', 'revenge', 'sport'];
	const [movieList, setMovieList] = useState([]);
	const [webSeriesList, setWebSeriesList] = useState([]);
	const [loading, setLoading] = useState(true); // Manage loading state
	const [error, setError] = useState(null); // Manage error state

	const TOTAL_MOVIE_TAGS = 3;
	const TOTAL_WEB_SERIES_TAGS = 5;
	const CURRENT_YEAR = (new Date()).getFullYear();

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
		const getMovieTags = getRandomTags(movieNameTags, TOTAL_MOVIE_TAGS);
		const getWebSeriesTags = getRandomTags(webSeriesTags, TOTAL_WEB_SERIES_TAGS);
		setLoading(true);
		setError(null); // Reset error state

		// Fetch movies using async requests
		const fetchMovies = async () => {
			try {
				const moviePromises = getMovieTags.map((movieTag) =>
					fetch(`https://www.omdbapi.com/?s=${movieTag}&y=${CURRENT_YEAR}&apikey=${process.env.NEXT_PUBLIC_API_KEY}&type=movie`)
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

		// Fetch web series using async requests
		const webSeries = async () => {
			try {
				const webSeriesPromises = getWebSeriesTags.map((webSeriesTag) =>
					fetch(`https://www.omdbapi.com/?s=${webSeriesTag}&y=${CURRENT_YEAR}&apikey=${process.env.NEXT_PUBLIC_API_KEY}&type=series`)
						.then((res) => res.json())
						.then((data) => data.Search || [])
				);

				const webSeriesArray = await Promise.all(webSeriesPromises); // Wait for all promises to resolve

				// Flatten the array of web series lists and filter out invalid entries
				const combinedWebSeries = webSeriesArray.flat().filter((webSeries) => webSeries.Poster !== 'N/A');

				setWebSeriesList(combinedWebSeries); // Update the state with the combined web series list
			} catch (err) {
				console.error('Failed to fetch movies:', err);
				setError('Failed to load movies. Please try again later.');
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchMovies();
		webSeries();
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
					<div className="text-center font-medium">Loading Movies...</div>
				) : error ? (
					<div className="text-center text-red-500 font-medium">{error}</div>
				) : movieList.length > 0 ? (
					movieList.map((movie, index) => (
						<MovieCardComp
							key={index}
							isFooterBlurred
							className="col-span-12 sm:col-span-3 md:col-span-2"
							header={{
								subtitle: movie.isNew ? "New" : null,
								title: movie.Title,
							}}
							imageSrc={movie.Poster}
							altText={movie.Title}
							footerContent={<h2 className="text-black text-tiny">{movie.Title}</h2>}
							onButtonClick={() => alert(`Notify me for ${movie.Title}`)}
						/>
					))
				) : (
					<div className="px-8 grid grid-cols-12">
						<p className="font-medium">No movies found.</p>
					</div>
				)}
			</div>

			<hr></hr>

			<div className="px-8 mt-6 grid grid-cols-12">
				<div className="sm:col-span-6">
					<h2 className="text-2xl font-medium">Web Series</h2>
				</div>
				<div className="sm:col-span-6">
					<Input
						classNames={{
							base: "max-w-full",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Search web series"
						size="sm"
						startContent={<SearchIcon size={18} />}
						type="search"
					/>
				</div>
			</div>

			<div className="max-w-[1800px] gap-3 grid grid-cols-12 grid-rows-2 px-8" style={{ marginTop: 30, marginBottom: 30 }}>
				{/* Render movie list */}
				{loading ? (
					<div className="text-center font-medium">Loading Web Series...</div>
				) : error ? (
					<div className="text-center text-red-500 font-medium">{error}</div>
				) : webSeriesList.length > 0 ? (
					webSeriesList.map((webSeries, index) => (
						<MovieCardComp
							key={index}
							isFooterBlurred
							className="col-span-12 sm:col-span-3 md:col-span-2"
							header={{
								subtitle: webSeries.isNew ? "New" : null,
								title: webSeries.Title,
							}}
							imageSrc={webSeries.Poster}
							altText={webSeries.Title}
							footerContent={<h2 className="text-black text-tiny">{webSeries.Title}</h2>}
							onButtonClick={() => alert(`Notify me for ${webSeries.Title}`)}
						/>
					))
				) : (
					<div className="px-8 grid grid-cols-12">
						<p className="font-medium">No web series found.</p>
					</div>
				)}
			</div>

		</main>
	);
};

export default HomePage;
