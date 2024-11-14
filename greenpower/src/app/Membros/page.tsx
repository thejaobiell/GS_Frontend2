'use client'
import Link from 'next/link';
import styles from './Membros.module.css';
import { useEffect } from 'react';
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";

const Membros = () => {

    useEffect(() => {
        document.title = "Membros - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, [])

    return (
        <>
            <section className={styles.membrosContainer}>
                <div className={styles.membro}>
                    <img
                        className="Joao"
                        src="/Fotos dos Membros/JoaoGabriel.jpg"
                        alt="João Gabriel Boaventura Marques e Silva"
                    />
                    <h1>João Gabriel Boaventura Marques e Silva <br/> RM554874 - 1TDSB-2024</h1>
                    <div className={styles.iconContainer}>
                        <a href='https://github.com/thejaobiell' className={styles.icon}><FaSquareGithub /></a>
                        <a href='https://www.linkedin.com/in/jo%C3%A3o-gabriel-boaventura-marques-e-silva-93b67b323/'className={styles.icon}><FaLinkedin /></a>
                    </div>
                </div>

                <div className={styles.membro}>
                    <img
                        className="Melo"
                        src="/Fotos dos Membros/LucasMelo.jpg"
                        alt="Lucas de Melo Pinho Pinheiro"
                    />
                    <h1>Lucas de Melo Pinho Pinheiro <br/> RM558791 - 1TDSB-2024</h1>
                    <div className={styles.iconContainer}>                    
                        <a href=''className={styles.icon}><FaSquareGithub /></a>
                        <a href=''className={styles.icon}><FaLinkedin /></a>
                    </div>
                </div>

                <div className={styles.membro}>
                    <img
                        className="Leal"
                        src="/Fotos dos Membros/LucasLeal.jpg"
                        alt="Lucas Leal das Chagas"
                    />
                    <h1>Lucas Leal das Chagas <br/> RM551124 - 1TDSB-2024</h1>
                    <div className={styles.iconContainer}>    
                        <a href='https://github.com/LucasLDC'className={styles.icon}><FaSquareGithub /></a>
                        <a href='https://www.linkedin.com/in/lucas-leal-das-chagas-3424a2210/'className={styles.icon}><FaLinkedin /></a>
                    </div>
                </div>
            </section>
            <Link href="/" className={styles.link}>
                <button className={styles.botao}>Voltar</button>
            </Link>
        </>
    );
};

export default Membros;