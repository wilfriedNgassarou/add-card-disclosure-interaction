import { useState } from "react";
import AddButton from "../add button/AddButton";
import Cash from "../cash/Cash";
import PaymentMode from "../payment Mode/PaymentMode";
import Wallet from "../wallet/Wallet";

export default function App() {
  const [cardState, setCardState] = useState<'close' | 'open'>('close')
  const [activeAmount, setActiveAmount] = useState(100);
  const [showNewTotal, setShowNewTotal] = useState(false) ;
  const [rotate, setRotate] = useState(false) ;

  function handleReset() {
    setActiveAmount(50) ;
    setShowNewTotal(false) ;
  }

  return (
    <section className="app">
      <section className={`container container-${cardState}`}>
        <Wallet
          showNewTotal={showNewTotal} 
          activeAmount={activeAmount} 
          setContainerState={setCardState} 
          setRotateButton={setRotate}
          handleReset={handleReset}
        />
        <PaymentMode />
        <Cash setActiveAmount={setActiveAmount} />
        <AddButton
          rotateButton={rotate}
          setRotateButton={setRotate}
          containerState={cardState}
          setContainerState={setCardState} 
          setShowNewTotal={setShowNewTotal}
        />
      </section>
    </section>
  )
}