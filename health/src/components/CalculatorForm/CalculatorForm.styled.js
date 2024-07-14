import styled from 'styled-components';

export const Title = styled.h1`
  width: 90vw;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  color: #212121;
  margin-bottom: 40px;
  text-align: left;

  @media (min-width: 480px) {
    width: 400px;
  }
  @media (min-width: 768px) {
    font-size: 34px;
    width: 554px;
  }
  @media (min-width: 1280px) {
    width: 608px;
  }
`;

export const TitleBloor = styled.p`
  font-family: 'Jost', sans-serif;
  font-weight: bold;
  cursor: text;
  font-size: 14px;
  line-height: 1.2;
  color: #212121;
`;
export const LabelTitle = styled.p`
  font-family: 'Jost', sans-serif;
  font-weight: bold;
  cursor: text;
  font-size: 14px;
  line-height: 1.2;
  color: #212121;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 30px;
    margin-bottom: 60px;
    margin-top: 20px;
  }
`;

export const InputsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;
export const InputsRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;

export const Input = styled.input`
  width: 90vw;
  border: none;
  border-bottom: 1px solid #212121;
  background-color: transparent;
  outline: 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.04em;
  color: #212121;
  padding-bottom: 10px;
  transition: all 0.3s;

  /* ::placeholder{
  font-family: Verdana;
  font-weight: bold;
  cursor: text;
  font-size: 14px;
  line-height: 1.2;
  color:  #212121;
 
  } */
  @media screen and (min-width: 480px) {
    width: 400px;
  }
  @media screen and (min-width: 768px) {
    width: 240px;
  }
`;

export const Button = styled.button`
  width: 210px;
  height: 43px;
  padding: 13px 4px;
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.21;
  letter-spacing: 0.04em;
  color: #ffffff;
  background-color: #fc842d;
  box-shadow: 0px 4px 10px 0px #fc842d80;
  border-radius: 30px;
  border: transparent;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 767.99px) {
    margin: 0 auto;
    margin-bottom: 40px;
  }

  :hover,
  :focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transform: scale(1.1);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  @media (min-width: 768px) {
    align-items: flex-start;
    margin-top: 60px;
  }

  @media (min-width: 1280px) {
    width: 608px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const RadioBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;



export const InputRadio = styled.input`
  margin-right: 8px;
  cursor: pointer;
  &:checked {
    background-color: #fc842d; 
    border-color: #fc842d;
  }
`;
export const LabelRadio = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
 cursor: pointer;

  ${InputRadio}:checked + & {
    color: #fc842d; /* Example checked label color */
  }
`;