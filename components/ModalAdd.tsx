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
	closeModal: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ModalAdd({ closeModal }: ModalAddProps) {
	const fileRef = React.useRef<HTMLInputElement>(null);
	const nameRef = React.useRef<HTMLInputElement>(null);
	const descriptionRef = React.useRef<HTMLInputElement>(null);
	const webURLRef = React.useRef<HTMLInputElement>(null);
	const loaderRef = React.useRef<HTMLDivElement>(null);

	const [progress, setProgress] = React.useState(0);

	const storage = getStorage();
	const storageRef = ref(storage, `${new Date().getMilliseconds()}`);

	const writeFile = (file: File) => {
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
					get(child(dbReference, `/`)).then((snapshot) => {
						const db = getDatabase();
						console.log(snapshot);

						set(dbRef(db, `/`), [
							...snapshot.val(),
							{
								name: nameRef.current.value,
								description: descriptionRef.current.value,
								url: webURLRef.current.value,
								picture: url,
							},
						]);
					});
				});
			},
		);
	};

	const addPorjectToPortfolio = () => {
		writeFile(fileRef.current.files[0]);
	};
	return (
		<div className={style.modal}>
			<div className={style['modal__overlay']}></div>
			<div className={style['modal__body']}>
				<button className={style['modal__close']} onClick={closeModal}>
					*
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
					className={style['modal__input']}
				/>
				<div
					className={style.loader}
					ref={loaderRef}
					style={{ width: progress + '%' }}></div>
				<button onClick={addPorjectToPortfolio}>Добавить</button>
			</div>
		</div>
	);
}
