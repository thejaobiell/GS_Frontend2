import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Todos os direitos ainda não reservados © <a href="https://github.com/thejaobiell/GS_Frontend2" className={styles.repositorio}> GreenPower</a> 2024</p>
            <p>João Gabriel Boaventura Marques e Silva | RM:554874</p>
            <p>Lucas de Melo Pinheiro Pinho | RM:558791</p>
            <p>Lucas Leal das Chagas | RM551124</p>
    </footer>
    );
};

export default Footer;