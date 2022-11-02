import './App.css';
import PatternDivider from './images/pattern-divider-desktop.svg'
import DiceImage from './images/icon-dice.svg'
import axios from "axios";
import { useState,useEffect } from 'react';
import LoadingGIF from './images/loading.gif'

function App() {

 const [advice,setAdvice] = useState({})
//  console.log("advice",advice);

 const [loading,setLoading] = useState(true)

 const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);


const GenerateAdvice =  ()=>{
  setLoading(true)
 
  // let id = Math.floor(Math.random() * 225);

  setTimeout(()=>{
    setDisableSubmitBtn(true)
    axios.get(`https://api.adviceslip.com/advice`).then((response=>{
    console.log(response.data.slip);
    setAdvice(response.data.slip)
    setLoading(false)
   
  })
  )  // axios end
  },1500)
  setDisableSubmitBtn(false)
}  // generateAdvice end


useEffect(() => {
    GenerateAdvice(); 
},[]);


  return (
    <div className="App">

      <div className="container">
        {
           loading ? <div><img src={LoadingGIF} alt="Loading" /></div> : <div>
                                        <div className="idTitle">          
                                        <h5 >ADVICE # {advice.id}</h5>          
                                        </div>
                                        <div className="advice">
                                        <h3>{advice.advice}</h3>
                                        </div>
                                        </div>
        }
        
        <div className="patternDivider">
          <img src={PatternDivider} alt="" />
        </div>
        {
              disableSubmitBtn ?   <div className="diceImage" onClick={GenerateAdvice}>
                                     <img src={DiceImage} alt="" />
                                    </div>   : null
        }
        
           
      </div>
 
    </div>
  );
}

export default App;
