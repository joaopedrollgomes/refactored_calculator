import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

import { Container, Content, Row } from "./styles";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumber] = useState("0");
  const [lastNumber, setLastNumber] = useState("0");
  const [percentNumber, setPercentNumber] = useState("1");
  const [handleAddNumberTerm, setHandleAddNumberTerm] = useState("0");
  const [operation, setOperation] = useState("");

  //Função responsavel por adicionar número a "tela" da calculadora
  const handleAddNumber = (number) => {
    // Verifica se o ponto já foi adicionado ao número atual
    if (number === "." && currentNumber.includes(".")) {
      return; // Se já houver um ponto, não adiciona outro
    }
    // Não permite a adição de números após o resultado de uma operação.
    if (handleAddNumberTerm === "0") {
      setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${number}`);
    }
  };

  //Função responsavel por limpar a "tela" da calculadora
  const handleOnClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setLastNumber("0");
    setPercentNumber("1");
    setOperation("");
    setHandleAddNumberTerm("0");
  };

  // Função responsável por apagar caracteres
  const handleDeleteChar = () => {
    // Se o currentNumber tiver mais de um caractere, apaga o último
    if (currentNumber.length > 1) {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else {
      // Se tiver só um caractere, volta para "0"
      setCurrentNumber("0");
    }
  };

  // Função que define a operação matemática que será usada e armazena o primeiro número digitado.
  const prepareOperation = (operator) => {
    if (firstNumber === "0") {
      setOperation(operator);
      setFirstNumber(currentNumber);
      setPercentNumber(currentNumber);
      setCurrentNumber("0");
      setLastNumber("0");
      setHandleAddNumberTerm("0");
    }
  };

  const percentOperation = () => {
    if (currentNumber !== "0") {
      if (percentNumber === "1") {
        const result = (Number(percentNumber) * Number(currentNumber)) / 100;
        setCurrentNumber(String(result));
        setLastNumber(String(result));
        setHandleAddNumberTerm("1");
      } else {
        const result = (Number(percentNumber) * Number(currentNumber)) / 100;
        setCurrentNumber(String(result));
        setPercentNumber("1");
        setHandleAddNumberTerm("1");
      }
    }
  };

  const sqrtOperation = () => {
    if (currentNumber !== "0") {
      const result = Math.sqrt(Number(currentNumber));
      setCurrentNumber(String(result));
      setHandleAddNumberTerm("1");
    }
  };

  // Função reponsavel por calcular o resultado
  const calculateResult = (num1, num2, operator) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) throw new Error("Não é permitido divisão por 0");
        return num1 / num2;
      default:
        return num1;
    }
  };

  // Função que manipula a operação de igualdade
  const handleEquals = () => {
    if (firstNumber !== "0" && operation !== "") {
      try {
        const num1 = Number(firstNumber);
        const num2 = Number(lastNumber === "0" ? currentNumber : lastNumber);

        if (lastNumber === "0") {
          setLastNumber(currentNumber);
          setHandleAddNumberTerm("1");
        }

        const result = calculateResult(num1, num2, operation);
        setCurrentNumber(String(result)); //Após a resolução mostra o resultado na tela
        setFirstNumber(String(result)); //Faz parte da lógica para que o button de igualdade, continue efetuando a operação cada vez que for clicado.
        setPercentNumber("1"); //Faz parte da lógica para funcionalidade da função de porcentagem.
      } catch (error) {
        alert(error.message); //Tratameto de exceção para divisão por zero
        handleOnClear();
      }
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="AC" id="clearButton" onClick={handleOnClear} />
          <Button label="sqrt" id="operationButton" onClick={sqrtOperation} />
          <Button label="%" id="operationButton" onClick={percentOperation} />
          <Button
            label="/"
            id="operationButton"
            onClick={() => prepareOperation("/")}
          />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button
            label="*"
            id="operationButton"
            onClick={() => prepareOperation("*")}
          />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button
            label="-"
            id="operationButton"
            onClick={() => prepareOperation("-")}
          />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button
            label="+"
            id="operationButton"
            onClick={() => prepareOperation("+")}
          />
        </Row>
        <Row>
          <Button label="C" id="clearButton" onClick={handleDeleteChar} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label="." onClick={() => handleAddNumber(".")} />
          <Button label="=" id="operationButton" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;