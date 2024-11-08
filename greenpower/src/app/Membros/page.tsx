'use client'
import Link from 'next/link';
import styles from './Membros.module.css';

const Membros = () => {
    return (
        <>
            <section className={styles.membrosContainer}>
                <div className={styles.membro}>
                    <img
                        className="Joao"
                        src="/Fotos dos Membros/JoaoGabriel.jpg"
                        alt="João Gabriel Boaventura Marques e Silva"
                    />
                    <h1>João Gabriel Boaventura Marques e Silva - RM554874</h1>
                </div>

                <div className={styles.membro}>
                    <img
                        className="Melo"
                        src="/Fotos dos Membros/LucasMelo.jpg"
                        alt="Lucas de Melo Pinho Pinheiro"
                    />
                    <h1>Lucas de Melo Pinho Pinheiro - RM558791</h1>
                </div>

                <div className={styles.membro}>
                    <img
                        className="Leal"
                        src="/Fotos dos Membros/LucasLeal.jpg"
                        alt="Lucas Leal das Chagas"
                    />
                    <h1>Lucas Leal das Chagas - RM551124</h1>
                </div>
            </section>
            <Link href="/" className={styles.link}>
                <button className={styles.botao}>Voltar</button>
            </Link>
        </>
    );
};

export default Membros;