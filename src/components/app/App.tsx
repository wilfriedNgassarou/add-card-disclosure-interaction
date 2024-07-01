import { useState } from "react";
import AddButton from "../add button/AddButton";
import Cash from "../cash/Cash";
import PaymentMode from "../payment Mode/PaymentMode";
import Wallet, { Amount } from "../wallet/Wallet";
import Credits from "../credits/Credits";


export default function App() {
  const [cardState, setCardState] = useState<'close' | 'open'>('close')
  
  const [activeAmount, setActiveAmount] = useState(100);
  
  // effet de rotation lorsque le bouton se deplace
  const [rotate, setRotate] = useState(false) ;

  // liste de tous les montants de la card
  const [amounts, setAmounts] = useState<Amount[]>([]) ;

  function reset() {
    setCardState('close')
    setRotate(true) ;
    setAmounts([])
  }

  return (
    <section className="app">
      <section className={`container container-${cardState}`}>
        <Wallet
          amounts={amounts} 
          reset={reset}
        />
        <PaymentMode />
        <Cash setActiveAmount={setActiveAmount} />
        <AddButton
          rotateButton={rotate}
          setRotateButton={setRotate}
          containerState={cardState}
          setContainerState={setCardState} 
          activeAmount={activeAmount}
          amounts={amounts}
          setAmounts={setAmounts}
        />
      </section>
      {/* <Credits /> */}
    </section>
  )
}