import { Dispatch, SetStateAction, useState } from "react"
import Plus from "../svg/Plus"
import Check from "../svg/Check";
import { Amount } from "../wallet/Wallet";

interface Props {
  containerState: 'close' | 'open',
  setContainerState: Dispatch<SetStateAction<'close' | 'open'>>,
  rotateButton: boolean,
  setRotateButton: Dispatch<SetStateAction<boolean>>,
  activeAmount: number,
  amounts: Amount[],
  setAmounts: Dispatch<SetStateAction<Amount[]>>
}

export default function AddButton({ 
  containerState, 
  setContainerState,
  rotateButton, 
  setRotateButton,
  amounts,
  setAmounts,
  activeAmount
}: Props) {

  // les differents etats du bouton ( text, chargement, success )
  const [state, setState] = useState<'text' | 'done' | 'progress'>('text')

  // petite transition qui passe juste avant l'action du bouton (de la gauche vers la droite)
  const [textLoaderState, setTextLoaderState] = useState<'close' | 'open'>('close') ;

  // barre de progression déjà rempli ? 
  const [progressEnd, setProgressEnd] = useState(false) ;

  // afficher la transition quand on clique sur le bouton
  function handleClick() {
    setTextLoaderState('open')
  }
  
  // action a effectuer quand la transition du loader finit
  function handleRemoveLoader() {
    // condition pour ignorer la transition lors du passage de la droite vers la gauche
    // (retour a l'état initial)
    if(textLoaderState == 'open') {

      // s'il s'agit de l'animation d'ouverture du container
      if(containerState == 'close') {
        setContainerState('open') ;
        // petite rotation du bouton
        setRotateButton(true)
      }
      // s'il s'agit de l'animation d'ajout de cash 
      else {

        if( state == 'text' ) {
          setState('progress') ;
        }
    
      }

      // retour a l'etat initial
      setTextLoaderState('close')

    }
  }

  function handleProgressTransition() {
    if(state != 'progress') return 

    // retour a l'etat initial de la progress bar
    setProgressEnd(true) ;

    if(progressEnd == true) {
      // on affiche l'etat success
      setState('done')
      setProgressEnd(false)
    }
  }

  function handlePaySuccefully() {
    // afficher le total 2 ( masqué par le overflow par défaut )
    if(state != 'done') return
    const length = amounts.length ;
    // 34 car la carte vient avec 34 dollars par default
    const lastAmount = length > 0 ? amounts[length - 1].amount : 34 ;

    const array = amounts.map((item) => {
      if(item.position != 'top') {
        return {
          amount: item.amount,
          position: 'top',
        }
      }
      return item ;
    }) 

    const newAmounts = [...array, {
      amount: lastAmount + activeAmount,
      position: 'bottom',
    }] as Amount[]

    // le nouvel element sera en dessous par default
    setAmounts(newAmounts) ;
    

    // on le fait transiter juste apres pour venir au milieu
    setTimeout(() => {
      const newAmounts = [...array, {
        amount: lastAmount + activeAmount,
        position: 'middle',
      }] as Amount[]
  
      setAmounts(newAmounts) ;
    }, 30);

    // le texte ne revient pas directement apres done, on attend un peu
    setTimeout(() => {
      setState('text')
    }, 250);
  }

  function handleRemoveRotate() {
    // retour à l'état initial
    setRotateButton(false) ;
  }

  return (
    <div 
      className={`
        add-button add-button-${containerState}
        ${rotateButton == true && 'rotate'}
      `}
      onAnimationEnd={handleRemoveRotate}
    >
      <div 
        onClick={handleClick} 
        className={`
          add-button-text ${state == 'text' ? 'translate-y-0' : '-translate-y-1'}
        `}
      >
        <span><Plus /></span>
        <span>Add Cash</span>
        {/* elemens qui se deplacent quand on clique sur un bouton  */}
        <div
          onTransitionEnd={handleRemoveLoader}
          className={`loader loader-${textLoaderState}`}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* progress  */}
      <div 
        style={{
          opacity: state == 'progress' || state == 'done' ? 1 : 0
        }}
        className={`
          add-button-progress-container 
          ${state == 'progress' ? 'translate-y-0' : state == 'done' ? '-translate-y-1' : 'translate-y-1'}
        `}
        onTransitionEnd={handleProgressTransition}
      >
        <div 
          className={`
            progress ${state == 'progress' && 'translate-y-0'}
            ${progressEnd == true && 'progress-done'}
          `}
        >
          <div></div>
        </div>
      </div>
      {/* success message  */}
      <div 
        onTransitionEnd={handlePaySuccefully}
        className={`add-button-confirm ${state == 'done' ? 'translate-y-0' : 'translate-y-1'}`}
      >
        <Check /> 
        <span>Done</span>
      </div>
    </div>
  )
}