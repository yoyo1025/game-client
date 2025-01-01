import '../Game.css';

export default function Dice({ onDiceRoll, diceRoll }){
  return (
    <button className='dice' onClick={onDiceRoll}>
      <img className='dice-picture' src={`./dice${diceRoll}.svg`} alt='Dice'/>
    </button>
  )
}