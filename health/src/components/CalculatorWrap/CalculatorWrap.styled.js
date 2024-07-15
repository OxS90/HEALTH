import styled from 'styled-components';
export const Section = styled.section`

  @media screen and (max-width: 479.99px) {
    background-color:#F0F1F3;;
  }

  @media screen and (min-width: 480px) {
    width: 440px;
  }
  @media screen and (max-width: 767.99px) {
    margin: 5px auto 0;
    
  }
  @media screen and (min-width: 768px) {
    margin: 0;
    width: 100%;
    background-image: url("../../src/assets/calculator-page-t.png");
    background-position-y: bottom;
    background-position-x: right;
    background-size: 746px 646px;
    background-repeat: no-repeat;
  }

  @media screen and (min-width: 1280px) {
    width: 40%;
    background-image: url("../../../src/assets/calculator-page-d.png");
    background-position-y: bottom;
    background-position-x: right;
    background-size: 746px 646px;
    background-repeat: no-repeat;
  }
`;

export const SectionSummary = styled.section`
  @media screen and (min-width: 768px) {
    width: 288px;
  }

  @media screen and (min-width: 1280px) {
    width: 400px;
  }
`;

export const Wrapper = styled.div`
  background: rgba(255, 255, 255);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: black;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  @media screen and (min-width: 480px) {
    padding: 40px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 40px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: column;
    padding: 0px 50px 60px;
  }
`;

export const CaloriesEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CaloriesTitle = styled.h3`
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
  @media screen and (min-width: 1280px) {
    margin-top: 60px;
  }
`;
export const CaloriesTitleFood = styled(CaloriesTitle)`
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
  @media screen and (min-width: 1280px) {
    margin-top: 60px;
  }
`;
export const CaloriesText = styled.p`
  margin-bottom: 10px;
`;
