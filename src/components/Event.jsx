import '../Game.css';
import ExchangeEventModal from './ExchangePosition';
import SkipTurnModal from './SkipTurn';

export default function Event({
  prepareEvent,
  setPrepareEvent,
  event1,
  event2,
  event3,
  setEvent1,
  setEvent2,
  setEvent3,
  players,
  userId,
  currentPlayerIndex,
  playerPositions
}){
  return (
    <>
      <div className='event-container'>
        <button className={`event-button ${prepareEvent ? 'blinking': ''}`} onClick={() => setEvent1(event1 => !event1)}>さらに進む</button>
        <button className={`event-button ${prepareEvent ? 'blinking': ''}`} onClick={() => setEvent2(event2 => !event2)}>一回休み</button>
        <button className={`event-button ${prepareEvent ? 'blinking': ''}`} onClick={() => setEvent3(event3 => !event3)}>ワープ</button>
      </div>
      {
        event2
          && <SkipTurnModal
              setEvent={setEvent2}
              setPrepareEvent={setPrepareEvent}
              players={players}
             />
      }
      {
        event3
          && <ExchangeEventModal
              setEvent={setEvent3}
              setPrepareEvent={setPrepareEvent}
              players={players}
              userId={userId}
              currentPlayerIndex={currentPlayerIndex}
              playerPositions={playerPositions}
             />
      }
    </>
  )
}