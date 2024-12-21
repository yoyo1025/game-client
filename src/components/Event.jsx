import '../Game.css';

export default function Event(){
  return (
      <div className='event-container'>
        <button className='event-button'>サイコロを振る</button>
        <button className='event-button'>指定したプレイヤーを休み</button>
        <button className='event-button'>ワープ</button>
        <button className='event-button'>イベント実行</button>
      </div>
  )
}