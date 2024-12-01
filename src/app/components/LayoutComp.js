import React from 'react';
import HeaderComp from './HeaderComp';
import FooterComp from './FooterComp';
import HomePage from '../pages/HomePage';

function LayoutComp() {
	return (
		<div className="container-fluid">
			<HeaderComp />
			<HomePage />
			<FooterComp />
		</div>
	);
}

export default LayoutComp;
