import { useNavigate } from "react-router";
import { useInput } from "../hooks/useInput";
import { Button, Container, TextArea } from "../styles/InputPage.style";

const InputPage = () => {
  const {value, onChange} = useInput<string>('');
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate('/result', {state: value});
  }
  return (
    <>
      <Container>
        <TextArea 
          name="text"
          placeholder='입력해주세요'
          value={value}
          onChange={onChange}
          spellCheck={false}
        />
        <Button onClick={handleClickButton}>완료</Button>
      </Container>
    </>
  );
}

export default InputPage;