'use client';
import React, { useEffect, useState } from 'react';
import estilos from './TelaFinalPagamento.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo: string;
    imagem: string;
    quantidade: number;
}

const TelaFinalPagamento = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        document.title = "Pagemento Concluído - GreenPower";
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
    
    useEffect(() => {
        const produtosNoStorage = sessionStorage.getItem('produtos');
        if (produtosNoStorage) {
            setProdutos(JSON.parse(produtosNoStorage));
        }
    }, []);

    return (
        <div className={estilos.container}>
            <h1 className={estilos.cabecalho}>Agradecemos pelo seu pagamento!</h1>
            <h2 className={estilos.subCabecalho}>Seu pedido foi realizado com sucesso.</h2>
            <h3>Detalhes do Pedido:</h3>
            <h3>Prazo de Entrega: 20 a 30 dias.</h3>

            {produtos.length > 0 ? (
                <div className={estilos.listaProdutos}>
                    {produtos.map((produto, index) => (
                        <div key={index} className={estilos.itemProduto}>
                            <div className={estilos.detalhesProduto}>
                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    className={estilos.imagemProduto}
                                />
                                <div>
                                    <h4 className={estilos.nomeProduto}>{produto.nome}</h4>
                                    <p className={estilos.descricaoProduto}>{produto.descricao}</p>
                                    <p className={estilos.precoProduto}><strong>Preço:</strong> R${produto.preco}</p>
                                    <p className={estilos.quantidadeProduto}><strong>Quantidade:</strong> {produto.quantidade}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Não há produtos no pedido.</p>
            )}

            <Link href='/Dashboard'>
                <button className={estilos.botaoDashboard}>Ir para o Dashboard</button>
            </Link>
        </div>
    );
}

export default TelaFinalPagamento;
