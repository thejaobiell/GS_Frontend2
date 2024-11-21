'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './GerenciarPaineis.module.css';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Link from 'next/link';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const GerenciarPaineis = () => {
    const data = {
        labels: ['Energia Consumida', 'Energia Produzida'],
        datasets: [
            {
                label: 'Consumo vs Produção',
                data: [20,80], //DADOS FICTICIOS PARA O GRÁFICO
                backgroundColor: ['#FF6347', '#32CD32'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <h1>Gerenciar Paineis</h1>

            <fieldset className={styles.fieldset}>
                <legend>Gráfico de Energia</legend>
                <div className={styles.chartContainer}>
                    <Pie data={data} />
                </div>
            </fieldset>

            <div className={styles.buttonContainer}>
                <Link href="/Dashboard" className={styles.backButton}>
                    Voltar para Dashboard
                </Link>
            </div>
        </div>
    );
};

export default GerenciarPaineis;
