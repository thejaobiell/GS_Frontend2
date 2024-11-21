'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import styles from './Pagamento.module.css';
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

const Pagamento = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [formaPagamento, setFormaPagamento] = useState('');
    const [numeroGerado, setNumeroGerado] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [nomeTitular, setNomeTitular] = useState('');
    const [validadeCartao, setValidadeCartao] = useState('');
    const [cvv, setCvv] = useState('');
    const [parcelas, setParcelas] = useState(1);
    const [erroFormulario, setErroFormulario] = useState('');


    useEffect(() => {
        document.title = "Pagamento - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const produtosStorage = sessionStorage.getItem('produtos');
        if (produtosStorage) {
            const produtosArray: Produto[] = JSON.parse(produtosStorage);
            setProdutos(produtosArray);

            const totalCalculado = produtosArray.reduce(
                (acc, produto) => acc + produto.preco * produto.quantidade,
                0
            );
            setTotal(totalCalculado);
        }
    }, []);

    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado !== 'sim') {
            router.push('/Login');
        }
    }, [router]);

    const handleFormaPagamento = (forma: string) => {
        setFormaPagamento(forma);
        setErroFormulario(''); 
        if (forma === 'pix' || forma === 'boleto') {
            const numero = Math.floor(100000000000 + Math.random() * 900000000000);
            setNumeroGerado(numero.toString());
        } else {
            setNumeroGerado('');
        }
    };

    const handleNumeroCartaoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.replace(/\D/g, '');
        setNumeroCartao(valor);
    };

    const handleNomeTitularChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setNomeTitular(valor);
    };

    const handleValidadeCartaoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.replace(/\D/g, '');
        setValidadeCartao(valor);
    };

    const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.replace(/\D/g, '');
        setCvv(valor);
    };

    const handleParcelasChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setParcelas(Number(e.target.value));
    };

    const validarFormularioCartao = () => {
        if (
            numeroCartao.length !== 16 ||
            nomeTitular.trim() === '' ||
            validadeCartao.length !== 4 ||
            cvv.length !== 3
        ) {
            setErroFormulario('Por favor, preencha todos os campos corretamente.');
            return false;
        }
        setErroFormulario('');
        return true;
    };

    const handleSubmitCartao = (e: React.FormEvent) => {
        e.preventDefault();
        if (validarFormularioCartao()) {
            alert(`Pagamento realizado com sucesso! Parcelado em ${parcelas}x.`);
            router.push('/TelaFinalPagamento');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.resumo}>
                <h2>Resumo do Pedido:</h2>
                <ul className={styles.produtoList}>
                    {produtos.map((produto: Produto) => (
                        <li className={styles.produtoItem} key={produto.id}>
                            <span className={styles.produtoNome}>{produto.nome}</span>
                            <span className={styles.produtoPreco}>
                                {produto.quantidade} x R${produto.preco.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
                <h3 className={styles.total}>Total: R${total.toFixed(2)}</h3>
            </div>

            <h2>Escolha a forma de pagamento:</h2>
            <div className={styles.formaPagamento}>
                <button
                    className={styles.formaButton}
                    onClick={() => handleFormaPagamento('cartao')}
                >
                    Cartão
                </button>
                <button
                    className={styles.formaButton}
                    onClick={() => handleFormaPagamento('pix')}
                >
                    PIX
                </button>
                <button
                    className={styles.formaButton}
                    onClick={() => handleFormaPagamento('boleto')}
                >
                    Boleto
                </button>
            </div>

            {formaPagamento === 'cartao' && (
                <div className={styles.formCartao}>
                    <fieldset className={styles.fieldset}>
                        <legend>Pagamento com Cartão</legend>
                        <form onSubmit={handleSubmitCartao}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Número do Cartão:</label>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    maxLength={16}
                                    value={numeroCartao}
                                    onChange={handleNumeroCartaoChange}
                                    placeholder="Digite o número do cartão"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Nome no Cartão:</label>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    value={nomeTitular}
                                    onChange={handleNomeTitularChange}
                                    placeholder="Digite o nome como está no cartão"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Data de Validade:</label>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    maxLength={4}
                                    value={validadeCartao}
                                    onChange={handleValidadeCartaoChange}
                                    placeholder="MM/AA"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>CVV:</label>
                                <input
                                    className={styles.formInput}
                                    type="text"
                                    maxLength={3}
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    placeholder="Código de segurança"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Parcelas:</label>
                                <select
                                    className={styles.formInput}
                                    value={parcelas}
                                    onChange={handleParcelasChange}
                                >
                                    <option value={1}>1x (à vista)</option>
                                    <option value={2}>2x</option>
                                    <option value={3}>3x</option>
                                    <option value={4}>4x</option>
                                    <option value={5}>5x</option>
                                    <option value={6}>6x</option>
                                    <option value={7}>7x</option>
                                    <option value={8}>8x</option>
                                    <option value={9}>9x</option>
                                    <option value={10}>10x</option>
                                </select>
                            </div>
                            {erroFormulario && <p className={styles.erro}>{erroFormulario}</p>}
                            <button type="submit" className={styles.formaButton}>
                                Pagar
                            </button>
                        </form>
                    </fieldset>
                </div>
            )}

            {formaPagamento === 'pix' && (
                <div>
                    <h2>Pagamento com PIX</h2>
                    <p>Use o código abaixo para realizar o pagamento:</p>
                    <div className={styles.numeroGerado}>{numeroGerado}</div>
                    <button type="submit" className={styles.formaButton}>
                        Pagar
                    </button>
                </div>
            )}

            {formaPagamento === 'boleto' && (
                <div>
                    <h2>Pagamento com Boleto</h2>
                    <p>Use o número abaixo para pagar o boleto:</p>
                    <div className={styles.numeroGerado}>{numeroGerado}</div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Parcelas:</label>
                        <select
                            className={styles.formInput}
                            value={parcelas}
                            onChange={handleParcelasChange}
                        >
                            <option value={1}>1x (à vista)</option>
                            <option value={2}>2x</option>
                            <option value={3}>3x</option>
                            <option value={4}>4x</option>
                            <option value={5}>5x</option>
                            <option value={6}>6x</option>
                            <option value={7}>7x</option>
                            <option value={8}>8x</option>
                            <option value={9}>9x</option>
                            <option value={10}>10x</option>
                        </select>
                    </div>
                    <Link href="/TelaFinalPagamento">
                        <button type="submit" className={styles.formaButton}>
                            Pagar
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Pagamento;
