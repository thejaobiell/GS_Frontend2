'use client'
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

    const voltarMenu = () => {
        router.push('/');
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo} src="/Logos/logoHeader.png" alt="Logo GreenPower" onClick={voltarMenu} />
            <h1 className={`${styles.GreenPower} ${fonto.variable}`} onClick={voltarMenu}>
                GreenPower
            </h1>
            <nav>
                <ul className={styles.navUl}>
                    <li className={styles.navLi}>
                        <Link className={styles.navLink} href="/">Menu</Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link className={styles.navLink} href="/Login">Login</Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link className={styles.navLink} href="/Membros">Membros</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
