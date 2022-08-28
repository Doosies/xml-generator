import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Container, TextArea } from "../styles/InputPage.style";
var XMLParser = require('react-xml-parser');

const InputPage = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();


  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const handleClickButton = async() => {
    if (value === '') {
      alert("빈값입니다! \n값을 입력해주세요!");
      return;
    }

    try {
      const json = new XMLParser().parseFromString(value).children[1].children[1].children;
      // setValue(json);
      navigate('/result', {state: value});
    }catch(e) {
      alert("올바른 XML형식이 아닙니다! \n다시 입력해주세요!");
    }
  }
  return (
    <>
      <Container>
        <TextArea 
          name="text"
          placeholder='입력해주세요'
          value={value}
          onChange={handleChangeTextArea}
          spellCheck={false}
        />
        <Button onClick={handleClickButton}>완료</Button>
      </Container>
    </>
  );
}

export default InputPage;