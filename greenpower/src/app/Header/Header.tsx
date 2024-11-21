'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import localFont from 'next/font/local';

const fonto = localFont({
    src: "../../font/odin-rounded.regular.woff",
    variable: "--FontDifera",
    weight: "400",
});

const Header = () => {
    const router = useRouter();
    const [estaLogado, setEstaLogado] = useState(false);

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        setEstaLogado(logado === 'sim');
    }, []);

    const voltarMenu = () => {
        router.push('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoEtitulo} onClick={voltarMenu}>
                <img className={styles.logo} src="/Logos/logoHeader.png" alt="Logo GreenPower" />
                <h1 className={`${styles.GreenPower} ${fonto.variable}`}>GreenPower</h1>
            </div>
            {!estaLogado && (
                <nav>
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <Link className={styles.navLink} href="/">Menu</Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link className={styles.navLink} href="/Membros">Membros</Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link className={styles.navLink} href="/Login">Login</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
