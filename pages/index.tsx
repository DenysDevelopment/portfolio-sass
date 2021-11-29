import React from 'react';
import type { NextPage } from 'next';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

import PortfolioItem from '../components/PortfolioItem';
import Layout from '../components/Layout';

import style from '../styles/portfolio.module.scss';
import LoaderItem from '../components/LoaderItem';

const firebaseConfig = {
	apiKey: 'AIzaSyAiJKCDzgEJXnYKxpFjtjCs3FBK_Gj0DHg',
	authDomain: 'portfolio-sass.firebaseapp.com',
	projectId: 'portfolio-sass',
	storageBucket: 'portfolio-sass.appspot.com',
	messagingSenderId: '288377669828',
	appId: '1:288377669828:web:45c9d9a261744f00ce2191',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface projectsTypes {
	name: string;
	description: string;
	url: string;
	picture: string;
}

const Home: NextPage = () => {
	const [projects, setProjects] = React.useState<projectsTypes[]>([]);

	React.useEffect(() => {
		const db = getDatabase();
		const portfolio = ref(db, `/`);
		onValue(portfolio, (snapshot) => setProjects(snapshot.val()));
	}, []);

	return (
		<Layout title='Portfolio'>
			<h1 className={style.title}>Портфолио</h1>
			<div className={style.wrapper}>
				{projects.length
					? projects.map((project, idx) => (
							<PortfolioItem {...project} key={`${project.name}_${idx}`} />
					  ))
					: new Array(10).fill(10).map((item, idx) => <LoaderItem key={idx} />)}
			</div>
		</Layout>
	);
};

export default Home;
