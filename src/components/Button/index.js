import { ButtonContainer } from "./styles";

 const Button = ({id, label, onClick}) => {
    return (
        <ButtonContainer id={id} onClick={onClick}>
            {label}
        </ButtonContainer>
    )
}

export default Button;