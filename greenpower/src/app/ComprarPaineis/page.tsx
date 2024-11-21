'use client'
import React, { useEffect } from "react";
import PropProduto from "./componenteProp/propProduto";
import styles from "./ComprarPaineis.module.css";
import Carrinho from "./componenteProp/componenteCarrinho";
import Swal from "sweetalert2";  // Importando SweetAlert2
import { useRouter } from "next/navigation";

const ComprarPaineis = () => {
    useEffect(() => {
        document.title = "Comprar Paineis - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado !== 'sim') {
            router.push('/Login');
        }
    }, [router]);
    const limparSessionStorage = () => {
        sessionStorage.setItem('produtos', JSON.stringify([]));
    };

    const handleVoltarClick = () => {
        Swal.fire({
            title: 'Tem certeza que deseja voltar?',
            text: "Os produtos no carrinho serão limpos.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, voltar',
            cancelButtonText: 'Não, cancelar',
            reverseButtons: true,
            customClass: {
                confirmButton: 'swal-button-confirm',
                cancelButton: 'swal-button-cancel'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                limparSessionStorage();
                window.location.href = '/Dashboard';
            }
        });
    };

    return (
        <>
            <h1 className={styles.titulo}>Comprar Painéis</h1>
            <Carrinho />
            <div className={styles.grid}>
                <PropProduto
                    id={1}
                    nome="Kit Energia Solar Fotovoltaica 1.120Wp - até 4.480Wh/dia"
                    descricao="Alta eficiência e durabilidade com células monocristalinas."
                    preco={2286.00}
                    tipo="Monocristalino"
                    imagem="./Produtos/produto1.png"
                />
                <PropProduto
                    id={2}
                    nome="Painel Solar Monocristalino de Alta Eficiência 800W - Emergência e Flexível"
                    descricao="Painel econômico com boa eficiência em condições variadas."
                    preco={329.00}
                    tipo="Policristalino"
                    imagem="./Produtos/produto2.png"
                />
                <PropProduto
                    id={3}
                    nome="Painel Solar 385W Canadian Mono Bifacial - Alta Eficiência (CS3U-MB-AG)"
                    descricao="Painel bifacial monocristalino, ideal para maximizar a captação de energia."
                    preco={628.00}
                    tipo="Monocristalino"
                    imagem="./Produtos/produto3.png"
                />
            </div>
            <div className={styles.botaoContainer}>
                <button className={styles.botao} onClick={handleVoltarClick}> Voltar </button>
            </div>
        </>
    );
};

export default ComprarPaineis;
