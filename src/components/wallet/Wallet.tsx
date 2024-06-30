import { Dispatch, SetStateAction } from "react";
import Close from "../svg/Close";
import WalletSVG from "../svg/WalletSvg";

interface Props {
  activeAmount: number,
  showNewTotal: boolean,
  setContainerState: Dispatch<SetStateAction<'close' | 'open'>>,
  setRotateButton: Dispatch<SetStateAction<boolean>>,
  handleReset: () => void
}

export default function Wallet({ 
  activeAmount, 
  showNewTotal, 
  setContainerState, 
  setRotateButton, 
  handleReset 
}: Props) {

  const currentAmount = 34 ;
  const totalAmount = activeAmount + currentAmount ;

  function handleClick() {
    setContainerState('close')
    setRotateButton(true)
    handleReset()
  }

  return (
    <div className={`wallet ${showNewTotal == true && 'show-new-total'}`}>
      <div className="svg-container">
        <WalletSVG />
      </div>
      <div className="wallet-text">
        <h1>Wallet</h1>
        <h2>
          <span>
            ${currentAmount}.00
          </span>
          <span>
            ${totalAmount}.00
          </span>
        </h2>
      </div>
      <div className="border"></div>
      <div onClick={handleClick} className="close-button">
        <Close />
      </div>
    </div>
  )
}