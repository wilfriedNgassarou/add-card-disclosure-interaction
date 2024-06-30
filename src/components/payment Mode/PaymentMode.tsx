import { MouseEvent, useState } from "react";
import MasterCard from "../svg/MasterCard";
import Visa from "../svg/Visa";
import AddCard from "../svg/AddCard";

export default function PaymentMode() {
  const [activeIndex, setActiveIndex] = useState(0) ;
  
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement ;

    const item = target.closest('.payment-body-item') as HTMLDivElement | null ;
    
    if(!item) return ;

    const index = +item.dataset.index! ;

    setActiveIndex(index) ;
  }

  // 40px est la taille du block et 12px le gap
  const translateY = ((activeIndex * 40) + (activeIndex * 12)) ;

  return (
    <div className="payment-mode">
      {/* header start  */}
      <div className="payment-header">
        <h1>Payment Mode</h1>
        <div>
          <AddCard />
          <span>Add Card</span>
        </div>
      </div>
      {/* header end  */}
      
      {/* body start  */}
      <div 
        className="payment-body"
        onClick={handleClick}
      >
        
        {/* single item start  */}
        <div data-index="0" 
          className={`payment-body-item ${activeIndex == 0 && 'payment-body-item-active'}`}
        >
          <div className="payment-body-item-flex">
            <div 
              className={`item-cursor ${activeIndex == 0 && 'item-cursor-active'}`}
            >
              <div></div>
            </div>
            <span>
              <span className="number-hidden">
                ····
              </span>
              6756
            </span>
          </div>
          {/* svg container  */}
          <span>
            <Visa />
          </span>
        </div>
        {/* single item end  */}
        
        {/* single item start  */}
        <div data-index="1" 
          className={`payment-body-item ${activeIndex == 1 && 'payment-body-item-active'}`}
        >
          <div className="payment-body-item-flex">
            <div 
              className={`item-cursor ${activeIndex == 1 && 'item-cursor-active'}`}
            >
              <div></div>
            </div>
            <span>
              <span className="number-hidden">
                ····
              </span>
              4632
            </span>
          </div>
          {/* svg container  */}
          <span>
            <MasterCard />
          </span>
        </div>
        {/* single item end  */}
        
        <div
          style={{
            transform: `translateY(${translateY}px)`
          }} 
          className="payment-mode-cursor"
        >

        </div>
      </div>
      {/* body end  */}
    </div>
  )
}