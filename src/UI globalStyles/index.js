import styled from 'styled-components';

export const MainBackGround = styled.div`
  background: 
    linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6)
          ),
    url('https://images.pexels.com/photos/6546425/pexels-photo-6546425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
`;

export const ProfileContent = styled.div`
background: 
    linear-gradient(
            rgba(0, 0, 0, 0.9), 
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6)
          ),
    url('https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    background-size: cover;
  width: 100vw;
  height: 86vh;
`;

export const NavProfileDiv = styled.div`
  width: 100vw;
  margin-top: 2vh;
  height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: black;
`;

export const ProfileBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0,0,0,0.6);
  border-radius: 6px;
  width: 40vw;
  p{
    padding: 10px;
    font-weight: 700;
    font-size: 20px;
    color: whitesmoke;
  }
  svg {
    transform: translateY(-40px);
    margin-bottom: -40px;
    font-size: 70px;
    padding: 10px;
    background-color: rgba(215, 133, 33, 1);
    border-radius: 100px;
    color: white;
  }
`;

export const ProfileEmailContent = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 20px;
  margin-left: 1vw;
  padding-bottom: 3px ;
  color: white;
  width: 99vw;
`;

export const DatailsMain = styled.main`
  background-color: #EFEFEF;
  background-size: cover;
  background-position: center;
  padding-bottom: 30px;
  width: 100vw;
  `;
export const ExploreContent = styled.div`
background: 
    linear-gradient(
            rgba(0, 0, 0, 0.9), 
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6)
          ),
    url('https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    background-size: cover;
    padding-bottom: 30px;
  width: 100vw;
  height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: black;
`;

export const ExploreBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0,0,0,0.6);
  border-radius: 6px;
  width: 40vw;
  p{
    padding: 10px;
    font-weight: 700;
    font-size: 20px;
    color: whitesmoke;
  }
  span{
    display: block;
    padding: 10px;
    font-weight: 700;
    font-size: 16px;
    color: whitesmoke;
  }
  svg {
    transform: translateY(-40px);
    margin-bottom: -40px;
    font-size: 70px;
    padding: 10px;
    background-color: rgba(215, 133, 33, 1);
    border-radius: 100px;
    color: white;
  }
`;

export const IngredientsBackground = styled.div`
  background: 
    linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6)
          ),
    ${(props) => {
    if (props.comida) {
      return 'url("https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")';
    }
    return 'url("https://content.paodeacucar.com/wp-content/uploads/2017/05/receitas-de-drinks-capa-2.jpg")';
  }};
    background-size: cover;
    min-height: 76vh;
    width: 100vw;
    max-height: 150vh;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
<<<<<<< HEAD
    padding-top: 50px;
=======
    padding-top: 10vh;
>>>>>>> 91b7696ae091c847e93715fee63ba13b0f96c56e
`;
