import Head from 'next/head';
import React from 'react';
import { Header } from './Header';

interface LayoutTypes {
	title: string;
	children?: React.ReactNode;
}

export default function Layout({ title, children }: LayoutTypes) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header />
			<main>
				<div className='container'>{children}</div>
			</main>
		</>
	);
}
