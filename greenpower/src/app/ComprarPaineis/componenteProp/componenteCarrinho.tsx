import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from 'next/link';
import styles from "./componenteCarrinho.module.css";

interface ProdutoCarrinho {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo: string;
    imagem: string;
    quantidade: number;
}

const Carrinho: React.FC = () => {
    const [produtos, setProdutos] = useState<ProdutoCarrinho[]>([]);
    const [estaAberto, setEstaAberto] = useState(false);
    const carregarProdutos = () => {
        const produtosArmazenados = sessionStorage.getItem("produtos");
        if (produtosArmazenados) {
            setProdutos(JSON.parse(produtosArmazenados));
        }
    };

    useEffect(() => {
        carregarProdutos();
        window.addEventListener('carrinhoAtualizado', carregarProdutos);
        return () => {
            window.removeEventListener('carrinhoAtualizado', carregarProdutos);
        };
    }, []);

    const atualizarCarrinho = (produtosAtualizados: ProdutoCarrinho[]) => {
        setProdutos(produtosAtualizados);
        sessionStorage.setItem("produtos", JSON.stringify(produtosAtualizados));
    };

    const alterarQuantidade = (id: number, quantidade: number) => {
        const produtosAtualizados = produtos
            .map((produto) => {
                if (produto.id === id) {
                    if (quantidade === 0) {
                        return null;
                    }
                    return { ...produto, quantidade };
                }
                return produto;
            })
            .filter(Boolean) as ProdutoCarrinho[];

        atualizarCarrinho(produtosAtualizados);
    };

    const removerProduto = (id: number) => {
        const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
        atualizarCarrinho(produtosAtualizados);
        Swal.fire({
            title: "Item removido",
            text: "O item foi removido do carrinho.",
            icon: "info",
            confirmButtonText: "OK",
        });
    };

    return (
        <>
            <button className={styles.botaoCarrinho} onClick={() => setEstaAberto(true)}>
                🛒 Carrinho ({produtos.reduce((soma, item) => soma + item.quantidade, 0)})
            </button>
            {estaAberto && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.botaoFechar} onClick={() => setEstaAberto(false)}>
                            ✖
                        </button>
                        <h2>Carrinho</h2>
                        {produtos.length === 0 ? (
                            <p>O carrinho está vazio.</p>
                        ) : (
                            <>
                                <ul className={styles.listaProduto}>
                                    {produtos.map((produto) => (
                                        <li key={produto.id} className={styles.itemProduto}>
                                            <img src={produto.imagem} alt={produto.nome} className={styles.imagemProduto} />
                                            <div className={styles.detalhesProduto}>
                                                <h3>{produto.nome}</h3>
                                                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                                                <p>Quantidade:</p>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={produto.quantidade}
                                                    onChange={(e) =>
                                                        alterarQuantidade(produto.id, parseInt(e.target.value))
                                                    }
                                                    className={styles.quantityInput}
                                                />
                                                <button
                                                    className={styles.botaoRemover}
                                                    onClick={() => removerProduto(produto.id)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <Link href="/Pagamento" className={styles.paymentButton}>
                                        <button className={styles.botaoPagamento}>Ir para Pagar</button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Carrinho;