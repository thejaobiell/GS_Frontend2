'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import estilos from "./DeletarConta.module.css";

const DeletarConta: React.FC = () => {
    const [cpfInput, setCpfInput] = useState("");
    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem("logado");
        if (logado !== "sim") {
            router.push("/Login");
        }
    }, [router]);

    const formatarCpf = (valor: string) => {
        return valor
            .replace(/\D/g, "") 
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2") 
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    };

    const lidarComMudancaDeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cpfFormatado = formatarCpf(e.target.value);
        setCpfInput(cpfFormatado);
    };

    const lidarComDeletar = async () => {
        const usuarioArmazenado = sessionStorage.getItem("usuario");
        if (!usuarioArmazenado) {
            Swal.fire("Erro", "Nenhum usuário encontrado na sessão.", "error");
            return;
        }

        const usuario = JSON.parse(usuarioArmazenado);

        if (cpfInput === usuario.cpf_Cliente) {
            Swal.fire({
                title: "Você tem certeza?",
                text: "Essa ação é irreversível. Sua conta será deletada, seus paineis solares serão desligados e seus dados serão excluídos do nosso banco de dados em até 30 dias. Caso haja arrependimento, contate nosso suporte.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, deletar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(
                            `http://localhost:8080/greenpowerweb/rest/cliente/deletar/${cpfInput}`,
                            {
                                method: "DELETE",
                            }
                        );

                        if (response.ok) {
                            Swal.fire(
                                "Deletado!",
                                "Sua conta foi deletada com sucesso.",
                                "success"
                            );
                            sessionStorage.removeItem("usuario");
                            sessionStorage.removeItem("produtos");
                            sessionStorage.removeItem("logado");
                            window.location.href = "/Login";
                        } else {
                            Swal.fire("Erro", "Falha ao deletar a conta.", "error");
                        }
                    } catch (error) {
                        Swal.fire("Erro", "Algo deu errado. Tente novamente.", "error");
                    }
                }
            });
        } else {
            Swal.fire("Erro", "O CPF informado não corresponde ao da sessão.", "error");
        }
    };

    return (
        <div className={estilos.container}>
            <h1 className={estilos.titulo}>Deletar Conta</h1>
            <p className={estilos.descricao}>
                Insira o CPF associado à conta para deletá-la:
            </p>
            <input
                type="text"
                className={estilos.input}
                placeholder="Digite seu CPF"
                value={cpfInput}
                maxLength={14}
                onChange={lidarComMudancaDeInput}
            />
            <button className={estilos.botao} onClick={lidarComDeletar}>
                Deletar Conta
            </button>
        </div>
    );
};

export default DeletarConta;
