'use client'
import { useEffect } from "react";
import styles from "./Error404/Error404.module.css"
import Link from 'next/link';

const Error404 = () => {
    useEffect(() => {
        document.title = "ERROR 404 - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, [])

    return (
        <div className={styles.j}>
            <h1 className={styles.error}>🇪​​​​​🇷​​​​​🇷​​​​​🇴​​​​​ 404</h1>
            <h2 className={styles.mensagem}>Ops! Infelizmente a página que você tentou acessar não existe/não foi encontrada.</h2>
            <Link href="/">
                <button type="submit" className={styles.button}>Voltar</button>
            </Link>
        </div>
    );
};

export default Error404;