'use client';
import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [MostrarSenha, setMostrarSenha] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.title = "Login - GreenPower";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/Logos/GreenPower.ico';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const logado = sessionStorage.getItem('logado');
        if (logado === 'sim') {
            router.push('/Dashboard');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/greenpowerweb/rest/cliente/login?email=${email}&senha=${senha}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseText = await response.text();

            if (response.ok) {
                const cliente = JSON.parse(responseText);
                sessionStorage.setItem('logado', 'sim');
                sessionStorage.setItem('usuario', JSON.stringify(cliente));
                router.push('/Dashboard');
            } else {
                setError(responseText || 'Erro ao verificar login.');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            setError('Erro de conexão com o servidor. Tente novamente mais tarde.');
        }
    };

    const mudarVisibilidadeSenha = () => {
        setMostrarSenha(!MostrarSenha);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && email && senha) {
            handleLogin(e as unknown as React.FormEvent);
        }
    };

    return (
        <section className={styles.section}>
            <form onSubmit={handleLogin} onKeyDown={handleKeyPress}>
                <fieldset className={styles.fieldset}>
                    <legend><h1>Login</h1></legend>

                    <label htmlFor="txtEmail">
                        <h1>Email:</h1>
                        <input
                            type="email"
                            name="txtEmail"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <div>
                        <h1>Senha:</h1>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.input}
                                type={MostrarSenha ? 'text' : 'password'}
                                placeholder='Digite sua senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={mudarVisibilidadeSenha}
                                className={styles.toggleButton}
                            >
                                {MostrarSenha ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <br />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Link href="/Cadastro" className={styles.criar}>
                        <h1>Criar um cadastro</h1>
                    </Link>
                    <button type="submit" className={styles.button}>Entrar</button>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
