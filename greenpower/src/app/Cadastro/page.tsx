'use client';
import { useRouter } from 'next/navigation';
import styles from "./Cadastro.module.css"; 
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEye,FaEyeSlash  } from "react-icons/fa";

const Cadastro = () => {
    const [email_Cliente, setEmail_Cliente] = useState('');
    const [senha_Cliente, setSenha_Cliente] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [nome_Cliente, setNome_Cliente] = useState('');
    const [sobrenome_Cliente, setSobrenome_Cliente] = useState('');
    const [cpf_Cliente, setCpf_Cliente] = useState('');
    const [cep_Cliente, setCep_Cliente] = useState('');
    const [rua_Cliente, setRua_Cliente] = useState('');
    const [numero_Cliente, setNumero_Cliente] = useState('');
    const [complemento_Cliente, setComplemento_Cliente] = useState('');
    const [bairro_Cliente, setBairro_Cliente] = useState('');
    const [cidade_Cliente, setCidade_Cliente] = useState('');
    const [estado_Cliente, setEstado_Cliente] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenha2, setMostrarSenha2] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.title = "Cadastro - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, [])

    const formatarCpf = (valor: string) => {
        return valor.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const formatarCep = (valor: string) => {
        return valor.replace(/\D/g, '')
            .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (senha_Cliente !== confirmarSenha) {
            alert("As senhas não coincidem. Tente Novamente");
            return;
        }

        if (senha_Cliente.length < 7 || senha_Cliente.length > 14) {
            alert("A senha deve ter entre 7 e 14 caracteres.");
            return;
        }

        const cliente = {
            email_Cliente: email_Cliente,
            senha_Cliente: senha_Cliente,
            nome_Cliente: nome_Cliente,
            sobrenome_Cliente: sobrenome_Cliente,
            cpf_Cliente: formatarCpf(cpf_Cliente),
            rua_Cliente: rua_Cliente,
            numero_Cliente: parseInt(numero_Cliente),
            complemento_Cliente: complemento_Cliente || 'N/A',
            bairro_Cliente: bairro_Cliente,
            cidade_Cliente: cidade_Cliente,
            estado_Cliente: estado_Cliente,
            cep_Cliente: formatarCep(cep_Cliente)
        };

        const result = await Swal.fire({
            title: 'Realizar Cadastro?',
            text: `Nome:${nome_Cliente} ${sobrenome_Cliente}\v` + ` | `+
                `Email:${email_Cliente}\n` + ` | ` +
                `CPF:${formatarCpf(cpf_Cliente)}\n` + ` | ` +
                `Endereço:${rua_Cliente}, ${numero_Cliente} ${complemento_Cliente}\n` +
                `${bairro_Cliente}, ${cidade_Cliente} - ${estado_Cliente}\n`  +
                `CEP:${formatarCep(cep_Cliente)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: styles.myConfirmBtn,
                cancelButton: styles.myCancelBtn,
            }
        });
    
        if (result.isConfirmed) {
            try {
                await createCliente(cliente);
                router.push('/Login');
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
                alert("Erro ao cadastrar cliente.");
            }
        } else {
            Swal.fire('Cadastro Cancelado', 'Você cancelou o cadastro.', 'info');
        }
    };

    const createCliente = async (cliente: { 
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
    }) => {
        try {
            const response = await fetch('http://localhost:8080/greenpowerweb/rest/cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            const responseText = await response.text();
            if (!response.ok) {
                throw new Error(`Erro ao criar cliente: ${responseText}`);
            }
            console.log('Cliente cadastrado com sucesso:', responseText);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const buscaCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cepUSER = e.target.value.replace(/\D/g, '');
        setCep_Cliente(cepUSER);

        if (cepUSER.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepUSER}/json/`);
                const dadosCEP = await response.json();
                console.log(dadosCEP);

                if (!dadosCEP.erro) {
                    setRua_Cliente(dadosCEP.logradouro);
                    setBairro_Cliente(dadosCEP.bairro);
                    setCidade_Cliente(dadosCEP.localidade);
                    setEstado_Cliente(dadosCEP.uf);
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

    const VisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };
    const VisibilidadeSenha2 = () => {
        setMostrarSenha2(!mostrarSenha2);
    };

    return (
        <>
            <section className={styles.forms}>
                <form onSubmit={handleRegister}>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Dados Pessoais</legend>

                        <label className={styles.label}> Nome: 
                            <input 
                                type="text" 
                                placeholder="Digite seu Nome" 
                                value={nome_Cliente}
                                onChange={(e) => setNome_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> Sobrenome: 
                            <input 
                                type="text" 
                                placeholder="Digite seu Sobrenome" 
                                value={sobrenome_Cliente}
                                onChange={(e) => setSobrenome_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> CPF:&ensp;
                            <input
                                placeholder="Digite seu CPF"
                                maxLength={14}
                                value={formatarCpf(cpf_Cliente)}
                                onChange={(e) => setCpf_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                            />
                        </label><br />

                        <label className={styles.label}>E-mail: 
                            <input 
                                type="email" 
                                placeholder="Digite seu e-mail" 
                                value={email_Cliente}
                                onChange={(e) => setEmail_Cliente(e.target.value)}
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br/>

                        <label className={styles.label}>Senha: 
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={mostrarSenha ? 'text' : 'password'}
                                    placeholder="Digite uma senha"
                                    value={senha_Cliente}
                                    onChange={(e) => setSenha_Cliente(e.target.value)} 
                                    required  
                                    className={styles.inputField}
                                />
                                <button 
                                    type="button" 
                                    onClick={VisibilidadeSenha}
                                    className={styles.toggleButton}
                                >
                                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </label><br/>
                        
                        <label className={styles.label}>Confirmar Senha: 
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={mostrarSenha2 ? 'text' : 'password'}
                                    placeholder="Confirme sua senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                                    required  
                                    className={styles.inputField}
                                />
                                <button 
                                    type="button" 
                                    onClick={VisibilidadeSenha2}
                                    className={styles.toggleButton}
                                >
                                    {mostrarSenha2 ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </label><br />
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legenda}>Endereço</legend>

                        <label className={styles.label}> CEP: 
                            <input
                                placeholder="Digite seu CEP"
                                maxLength={9}
                                value={formatarCep(cep_Cliente)}
                                onChange={buscaCep}
                                required  
                                className={styles.inputField}
                            />
                        </label><br />

                        <label className={styles.label}> Rua:&ensp; 
                            <input 
                                type="text" 
                                placeholder="Digite sua Rua" 
                                value={rua_Cliente}
                                onChange={(e) => setRua_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                                readOnly
                            /> 
                        </label><br />

                        <label className={styles.label}> Número Residencial: 
                            <input 
                                type="text" 
                                placeholder="Digite o Número"
                                value={numero_Cliente}
                                onChange={(e) => setNumero_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> Complemento: 
                            <input 
                                type="text" 
                                placeholder="Complemento (Opicional)" 
                                value={complemento_Cliente}
                                onChange={(e) => setComplemento_Cliente(e.target.value)} 
                                className={styles.inputField}
                            /> 
                        </label><br />

                        <label className={styles.label}> Bairro: 
                            <input 
                                type="text" 
                                placeholder="Digite seu Bairro" 
                                value={bairro_Cliente}
                                onChange={(e) => setBairro_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                                readOnly
                            /> 
                        </label><br />

                        <label className={styles.label}> Cidade: 
                            <input 
                                type="text" 
                                placeholder="Digite sua Cidade" 
                                value={cidade_Cliente}
                                onChange={(e) => setCidade_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                                readOnly
                            /> 
                        </label><br />

                        <label className={styles.label}> Estado: 
                            <input 
                                type="text" 
                                placeholder="Digite seu Estado" 
                                value={estado_Cliente}
                                onChange={(e) => setEstado_Cliente(e.target.value)} 
                                required  
                                className={styles.inputField}
                                readOnly
                            /> 
                        </label><br />
                    </fieldset>

                    <div className={styles.botaoWrapper}>
                        <button type="submit" className={styles.submitButton}>Cadastrar</button>
                    </div>
                </form>
            </section>
        </>
    );
};
export default Cadastro;