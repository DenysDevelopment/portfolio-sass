import React from 'react';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { getDatabase, set, ref as dbRef, get, child } from '@firebase/database';

import style from '../styles/modal.module.scss';

interface ModalAddProps {
	closeModal: React.MouseEventHandler<HTMLButtonElement> | any;
}

interface refObject<T> {
	readonly current: T | null;
}

export default function ModalAdd({ closeModal }: ModalAddProps) {
	const fileRef: any = React.useRef(null); //TODO: type any replace to other
	const nameRef: refObject<HTMLInputElement> = React.useRef(null);
	const descriptionRef: refObject<HTMLInputElement> = React.useRef(null);
	const webURLRef: refObject<HTMLInputElement> = React.useRef(null);
	const loaderRef: refObject<HTMLInputElement> = React.useRef(null);

	const [progress, setProgress] = React.useState(0);

	const storage = getStorage();
	const storageRef = ref(
		storage,
		`${new Date().getDate()}_${new Date().getMilliseconds()}`,
	);

	const writeFile = (file: any) => {
		const UploadTask = uploadBytesResumable(storageRef, file);

		UploadTask.on(
			'state_changed',
			(snapshot) => {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progress);
			},
			() => {
				console.log('error');
			},
			() => {
				getDownloadURL(UploadTask.snapshot.ref).then((url) => {
					const dbReference = dbRef(getDatabase());
					get(child(dbReference, `/portfolio`)).then((snapshot) => {
						const db = getDatabase();
						set(dbRef(db, `/portfolio`), [
							...snapshot.val(),

							{
								name: nameRef?.current?.value,
								description: descriptionRef?.current?.value,
								url: webURLRef?.current?.value,
								picture: url,
							},
						]);
						closeModal();
					});
				});
			},
		);
	};

	const addPorjectToPortfolio = () => {
		const file = fileRef?.current?.files[0];
		writeFile(file);
	};
	return (
		<div className={style.modal}>
			<div className={style['modal__overlay']} onClick={closeModal}></div>
			<div className={style['modal__body']}>
				<button className={style['modal__close']} onClick={closeModal}>
					&times;
				</button>
				<input
					ref={nameRef}
					placeholder='Назва сайта'
					type='text'
					className={style['modal__input']}
				/>
				<input
					ref={descriptionRef}
					placeholder='Описание'
					type='text'
					className={style['modal__input']}
				/>
				<input
					ref={webURLRef}
					placeholder='URL'
					type='text'
					className={style['modal__input']}
				/>
				<input
					ref={fileRef}
					placeholder='Добавить фотку'
					type='file'
					accept='.png, .jpg, .jpeg, webp, .gif, .svg'
					className={style['modal__input']}
				/>
				<div className={style.loader}>
					<div
						ref={loaderRef}
						style={{ width: progress + '%' }}
						className={style['loader-bg']}></div>
				</div>
				<button onClick={addPorjectToPortfolio}>Добавить</button>
			</div>
		</div>
	);
}
