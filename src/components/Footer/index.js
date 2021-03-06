import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #000070;
  padding: 26px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: #fff;
    text-decoration: none;
    transition: 0.3s;
    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }
  span {
    text-decoration: underline;
  }
`;

const Footer = (props) => (
  <FooterWrapper {...props}>
    <a href="https://www.alura.com.br">
      <img
        src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg"
        alt="Logo Alura"
      ></img>
    </a>
    <p>
      Orgulhosamente criado durante a{' '}
      <a href="https://www.alura.com.br">
        <span>Imersão React Alura</span>
      </a>
    </p>
  </FooterWrapper>
);

export default Footer;
