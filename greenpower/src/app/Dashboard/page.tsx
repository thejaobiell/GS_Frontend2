'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';
import { PiSealQuestionBold } from "react-icons/pi";
import Swal from 'sweetalert2';
import Link from 'next/link';

interface User {
    email_Cliente: string;
    senha_Cliente: string;
    nome_Cliente: string;
    sobrenome_Cliente: string;
    cpf_Cliente: string;
    rua_Cliente: string;
    numero_Cliente: number;
    complemento_Cliente: string;
    bairro_Cliente: string;
    cidade_Cliente: string;
    estado_Cliente: string;
    cep_Cliente: string;
}

const Dashboard = () => {
    const [usuario, setUsuario] = useState<User | null>(null);
    const [estaEditando, setEstaEditando] = useState(false);
    const [novoEmail, setNovoEmail] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    useEffect(() => {
        document.title = "Dashboard - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const userData = sessionStorage.getItem('usuario');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUsuario(parsedUser);
            } catch (error) {
                console.error("Erro ao analisar os dados do usuário: ", error);
                sessionStorage.removeItem('usuario');
            }
        }
    }, []);

    const router = useRouter();

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado !== 'sim') {
            router.push('/Login');
        }
    }, [router]);

    const alerta1 = () => {
        alert("Você apenas pode fazer a alteração do email e da senha de sua conta.\nCaso você precise alterar nome completo, endereço ou CPF, entre em contato com o nosso suporte.");
    };

    const logout = () => {
        Swal.fire({
            title: 'Tem certeza que deseja sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            reverseButtons: false,
            customClass: {
                confirmButton: styles.myConfirmBtn,
                cancelButton: styles.myCancelBtn,
            }
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('logado');
                sessionStorage.removeItem('usuario');
                router.push('/Login');
            } else if (result.isDismissed) {
                window.location.reload();
            }
        });
    };

    const lidarEditar = () => {
        setEstaEditando(true);
        setNovoEmail('');
        setSenhaAntiga('');
        setSenhaNova('');
        setConfirmarSenha('');
        setError('');
        setMensagemSucesso('');
    };

    const validarAlteracoes = () => {
        if (!senhaAntiga) {
            setError('A senha atual é obrigatória para confirmar as alterações.');
            return false;
        }

        if (novoEmail && (!senhaNova && !confirmarSenha)) {
            if (senhaAntiga === usuario?.senha_Cliente) {
                return true;
            } else {
                setError('A senha atual está incorreta.');
                return false;
            }
        }

        if (senhaNova || confirmarSenha) {
            if (senhaNova !== confirmarSenha) {
                setError('A nova senha e a confirmação não coincidem.');
                return false;
            }

            if (senhaAntiga === usuario?.senha_Cliente) {
                return true;
            } else {
                setError('A senha atual está incorreta.');
                return false;
            }
        }

        setError('Preencha ao menos o campo Novo Email ou os campos de senha para alterar.');
        return false;
    };

    const atualizarDadosUsuario = async () => {
        if (!usuario) return;
    
        const dadosAtualizados = {
            email_Cliente: novoEmail || usuario.email_Cliente,
            senha_Cliente: senhaNova || usuario.senha_Cliente,
        };
    
        try {
            const response = await fetch(`http://localhost:8080/greenpowerweb/rest/cliente/atualizar/${usuario.cpf_Cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            });
    
            if (response.ok) {
                const camposAtualizados = await response.json();
                const usuarioAtualizado = {
                    ...usuario,
                    email_Cliente: camposAtualizados.email_Cliente || usuario.email_Cliente,
                    senha_Cliente: camposAtualizados.senha_Cliente || usuario.senha_Cliente,
                };
    
                sessionStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
                setUsuario(usuarioAtualizado);
    
                setEstaEditando(false);
                setMensagemSucesso('Alterações salvas com sucesso!');
            } else {
                throw new Error('Falha ao atualizar os dados do usuário.');
            }
        } catch (error) {
            setError('Erro ao atualizar dados. Tente novamente.');
        }
    };    

const lidarSalvarMudancas = async () => {
    if (!usuario) return;
    if (validarAlteracoes()) {
        atualizarDadosUsuario();
    }
};

    return (
        <section className={styles.section}>
            <div className={styles.mainContent}>
                <h1 className={styles.bemVindo}>Bem-vindo(a) {usuario?.nome_Cliente}!</h1>
                <div className={styles.contentWrapper}>
                    {usuario && !estaEditando && (
                        <fieldset className={styles.userDataFieldset}>
                            <legend>Dados do Usuário</legend>
                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Nome:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.nome_Cliente} {usuario.sobrenome_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Email:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.email_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Senha:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.senha_Cliente.replace(/./g, '*')}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>CPF:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.cpf_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Endereço:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.rua_Cliente}, {usuario.numero_Cliente}, {usuario.complemento_Cliente} - {usuario.bairro_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Cidade:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.cidade_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>Estado:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.estado_Cliente}</span>
                            </div>

                            <div className={styles.dadosItem}>
                                <strong className={styles.dadosID}>CEP:</strong><br/>
                                <span className={styles.dadosValue}>{usuario.cep_Cliente}</span>
                            </div>

                            <button onClick={lidarEditar} className={styles.editButton}>Editar</button>
                        </fieldset>
                    )}

                    {estaEditando && (
                        <fieldset className={styles.userDataFieldset}>
                            <legend>Editar Dados</legend>
                            <div>
                                <label className={styles.labelTitulo}>Novo Email:<br /></label>
                                <input
                                    type="email"
                                    className={styles.emailInput}
                                    value={novoEmail}
                                    onChange={(e) => setNovoEmail(e.target.value)}
                                    placeholder="Digite o novo email"
                                />
                            </div>

                            <div>
                                <label className={styles.labelTitulo}>Senha Atual:<br /></label>
                                <input
                                    type="password"
                                    className={styles.senhaInput}
                                    value={senhaAntiga}
                                    onChange={(e) => setSenhaAntiga(e.target.value)}
                                    placeholder="Digite sua senha atual"
                                />
                            </div>
                            <div>
                                <label className={styles.labelTitulo}>Nova Senha:<br /></label>
                                <input
                                    type="password"
                                    className={styles.senhaInput}
                                    value={senhaNova}
                                    onChange={(e) => setSenhaNova(e.target.value)}
                                    placeholder="Digite a nova senha"
                                />
                            </div>
                            <div>
                                <label className={styles.labelTitulo}>Confirmar Nova Senha:<br /></label>
                                <input
                                    type="password"
                                    className={styles.senhaInput}
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    placeholder="Confirme a nova senha"
                                />
                            </div>

                            {error && <div className={styles.error}>{error}</div>}
                            {mensagemSucesso && <div className={styles.success}>{mensagemSucesso}</div>}

                            <div onClick={alerta1} className={styles.perguntaContainer}>
                                <PiSealQuestionBold className={styles.pergunta}/><h3 className={styles.text}>Por que só posso alterar email e senha?</h3>
                            </div>
                            <button onClick={lidarSalvarMudancas} className={styles.saveButton}>Salvar Alterações</button>
                            <button onClick={() => setEstaEditando(false)} className={styles.cancelButton}>Cancelar</button>
                        </fieldset>
                    )}

                    <div className={styles.sideFieldsets}>
                        <fieldset className={styles.duplaFieldset}>
                            <legend>Comprar Painéis Solares</legend>
                            <p className={styles.texto}>Compre os melhores painéis solares para sua residência ou empresa.</p>
                            <Link href={'/ComprarPaineis'}>
                                <button className={styles.botaoComprar}>Comprar Agora</button>
                            </Link>
                        </fieldset>

                        <fieldset className={styles.duplaFieldset}>
                            <legend>Gerenciar Painéis Solares</legend>
                            <p className={styles.texto}>Gerencie e monitore seus painéis solares existentes.</p>
                            <Link href={'/GerenciarPaineis'}>
                                <button className={styles.botaoGerenciar}>Gerenciar</button>
                            </Link>
                        </fieldset>
                    </div>
                </div>

                <button onClick={logout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </section>
    );
};

export default Dashboard;
