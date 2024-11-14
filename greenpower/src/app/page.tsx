'use client'
import { useEffect } from "react";
import styles from './Menu/Menu.module.css';
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    document.title = "Menu - GreenPower";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/Logos/GreenPower.ico';
    document.head.appendChild(link);
  }, []);

  return (
    <section className={styles.sectionMenu}>
        <div className={styles.fundoContainer}>
            <img className={styles.fundo} src="/Imagens/paineisSolares.jpg" alt="Foto de Fundo" />
            <article className={styles.botaoEtexto}>
                <h1 className={styles.texto}>
                  Invista em energia limpa e sustentável com nossos painéis solares. Economize na conta de luz e contribua para um futuro mais verde e acessível para todos!
                </h1>
                <Link href="/Login">
                    <button className={styles.botao}>Fazer Parte da GreenPower</button>
                </Link>

            </article>
            
        </div>

    </section>
  );
};
