import Link from 'next/link';

import style from '../styles/Header.module.scss';

export const Header = () => {
	return (
		<header className={style.header}>
			<nav className={style.menu}>
				<ul className={style.menu__list}>
					<li className={style.menu__item}>
						<Link href='/'>Портфолио</Link>
					</li>
					<li className={style.menu__item}>
						<Link href='/about'>Обо мне</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
