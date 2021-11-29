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
			<h2>{name}</h2>
			<div
				className={style.image}
				style={{ backgroundImage: `url(${picture})` }}></div>
			<p>{description}</p>{' '}
			{picture ? <a href={url}>Перейти на страницу</a> : ''}
		</article>
	);
}
