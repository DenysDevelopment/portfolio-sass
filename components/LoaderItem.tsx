import ContentLoader from 'react-content-loader';

export default function LoaderItem() {
	return (
		<ContentLoader
			speed={2}
			width={344}
			height={350}
			viewBox='0 0 344 350'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
			style={{
				border: '1px solid #dedede',
				borderRadius: '20px 20px 0 0',
				flex: '1 1 auto',
			}}>
			<path
				d='M9 25C9 13.9543 17.9543 5 29 5H315C326.046 5 335 13.9543 335 25V195H9V25Z'
				fill='#9B9B9B'
			/>
			<rect x='9' y='211' width='189' height='21' fill='#737373' />
			<rect x='9' y='253' width='276' height='9' fill='#A7A7A7' />
			<rect x='9' y='266' width='189' height='9' fill='#A7A7A7' />
			<rect x='9' y='279' width='216' height='9' fill='#A7A7A7' />
			<rect x='73' y='316' width='197' height='23' fill='#B4B4B4' />
		</ContentLoader>
	);
}
