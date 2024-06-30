import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

interface Props {
  setActiveAmount:Dispatch<SetStateAction<number>>
}

export default function Cash({ setActiveAmount }: Props) {
  const [activeIndex, setActiveIndex] = useState(1) ;
  
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement ;

    const item = target.closest('.cash-item') as HTMLDivElement | null ;
    
    if(!item) return ;

    const index = +item.dataset.index! ;

    if(index == 0) {
      setActiveAmount(50) ;
    }

    if(index == 1) {
      setActiveAmount(100) ;
    }

    if(index == 2) {
      setActiveAmount(300) ;
    }

    setActiveIndex(index) ;
  }

  return (
    <div className="cash">
      <h1>Cash</h1>
      <div
        onClick={handleClick} 
        className="cash-body"
      >
        <div data-index="0" 
          className={`cash-item ${activeIndex == 0 && 'cash-item-active'} `}
        >
          $50
          <div 
            // 9px est le gap 
            style={{
              transform: `translateX(calc((${activeIndex * 100}%) + (${activeIndex * 9}px) ))`
            }}
            className="cash-cursor"
          >

          </div>
        </div>
        <div
          className={`cash-item ${activeIndex == 1 && 'cash-item-active'} `} 
          data-index="1" 
        >
          $100
        </div>
        <div 
          data-index="2" 
          className={`cash-item ${activeIndex == 2 && 'cash-item-active'} `}
        >
            $300
        </div>
      </div>
    </div>
  )
}