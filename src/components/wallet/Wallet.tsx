import Close from "../svg/Close";
import WalletSVG from "../svg/WalletSvg";

export interface Amount {
  amount: number,
  position: 'top' | 'middle' | 'bottom',
}

interface Props {
  amounts: Amount[],
  reset: () => void,
}

export default function Wallet({ 
  amounts, 
  reset 
}: Props) {

  const currentAmount = 34 ;

  function handleClick() {
    reset()
  }

  return (
    <div className={`wallet`}>
      <div className="svg-container">
        <WalletSVG />
      </div>
      <div className="wallet-text">
        <h1>Wallet</h1>
        <h2>
          <span 
            className={`${amounts.length > 0 ? '-translate-y-1' : 'translate-y-0' }`}
          >
            ${currentAmount}.00
          </span>
          {
            amounts.map((item, index) => (
              <span 
                key={index}
                className={
                  item.position == 'middle' ? 'translate-y-0' : item.position == 'bottom' ? 'translate-y-1' : '-translate-y-1'
                }
              >
                ${item.amount}.00
              </span>
            ))
          }
        </h2>
      </div>
      <div className="border"></div>
      <div onClick={handleClick} className="close-button">
        <Close />
      </div>
    </div>
  )
}