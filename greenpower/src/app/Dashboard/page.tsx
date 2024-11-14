'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado !== 'sim') {
            router.push('/Login');
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('logado');
        router.push('/Login');
    };

    return (
        <section className={styles.section}>
            <div className={styles.dashboardContainer}>
                <h1>Bem-vindo ao Dashboard!</h1>
                <p>Você está logado com sucesso.</p>

                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </section>
    );
};

export default Dashboard;
