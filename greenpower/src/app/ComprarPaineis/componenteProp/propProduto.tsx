import React from "react";
import Swal from "sweetalert2";
import estilos from "./PropProduto.module.css";

interface ProdutoCarrinho extends PropProdutoProps {
    quantidade: number;
}

interface PropProdutoProps {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo: string;
    imagem: string;
}

const PropProduto: React.FC<PropProdutoProps> = ({ id, nome, descricao, preco, tipo, imagem }) => {
    const lidarComCompra = () => {
        const produto: ProdutoCarrinho = { id, nome, descricao, preco, tipo, imagem, quantidade: 1 };
        const produtosArmazenados = sessionStorage.getItem("produtos");
        let produtos: ProdutoCarrinho[] = produtosArmazenados ? JSON.parse(produtosArmazenados) : [];
        const produtoExistente = produtos.find((item) => item.id === id);
        
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
            produtos = produtos.map(item => 
                item.id === id ? produtoExistente : item
            );
        } else {
            produtos.push(produto);
        }
        sessionStorage.setItem("produtos", JSON.stringify(produtos));
        window.dispatchEvent(new Event('carrinhoAtualizado'));
        Swal.fire({
            title: "Produto Adicionado!",
            text: `Você adicionou "${nome}" ao carrinho. Quantidade: ${produtoExistente ? produtoExistente.quantidade : 1}`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#007bff",
        });
    };

    return (
        <div className={estilos.container}>
            <img src={imagem} alt={`Imagem do ${nome}`} className={estilos.imagem} />
            <h2 className={estilos.titulo}>{nome}</h2>
            <p className={estilos.texto}><strong>ID:</strong> {id}</p>
            <p className={estilos.texto}><strong>Descrição:</strong> {descricao}</p>
            <p className={estilos.texto}><strong>Preço:</strong> R$ {preco.toFixed(2)}</p>
            <p className={estilos.texto}><strong>Tipo:</strong> {tipo}</p>
            <button className={estilos.botao} onClick={lidarComCompra}>Comprar</button>
        </div>
    );
};

export default PropProduto;
