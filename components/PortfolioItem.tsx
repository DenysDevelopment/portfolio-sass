import Image from 'next/image';

import style from '../styles/portfolioItem.module.scss';

interface PortfolioItemProps {
	name: string;
	description: string;
	url: string;
	picture: string;
}

export default function PortfolioItem({
	name,
	description,
	url,
	picture,
}: PortfolioItemProps) {
	if (name === 'test') return <>Проектов пока нет</>;

	return (
		<article className={style.article}>
			<div
				className={style.image}
				style={{ backgroundImage: `url(${picture})` }}></div>
			<h2>{name}</h2>
			<p>{description}</p>{' '}
			{picture ? <a href={url}>Перейти на страницу</a> : ''}
		</article>
	);
}
