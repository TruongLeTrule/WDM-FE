import { useState, useRef, useEffect } from 'react';
import lobImg from '../../assets/images/lobby.jpg';
const shift = ['morning', 'afternoon', 'evening'];

const LobCard = ({ lobby, setLobValue, setShiftValue, setNextModalOpen }) => {
  const { id, lobName, bookedShift } = lobby;
  const [showShiftModal, setShowShiftModal] = useState(false);
  const cardRef = useRef(null);

  const resolveBusyShift = (shift, bookedShift) => {
    if (bookedShift.includes(shift)) return 'busy';
  };

  const handleCardClick = () => {
    setLobValue(id);
    setShowShiftModal(true);
  };

  const handleShiftClick = (shift) => {
    setShiftValue(shift);
    setNextModalOpen();
  };

  const handleOutsideClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setShowShiftModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <div className="card" ref={cardRef} onClick={handleCardClick}>
      <img src={lobImg} alt={lobName} className="lob-img" />
      <div className="content">
        <h5>{lobName}</h5>
        <div className="shift-wrapper">
          {shift.map((shift) => (
            <span
              className={`shift ${resolveBusyShift(shift, bookedShift)}`}
              key={shift}
            >
              {shift}
            </span>
          ))}
        </div>
        {showShiftModal && (
          <div className="choose-shift">
            <h6>choose shift</h6>
            {shift.map((shift) => (
              <span
                key={shift}
                className={!bookedShift.includes(shift) ? 'shift' : ''}
                onClick={() => handleShiftClick(shift)}
              >
                {!bookedShift.includes(shift) && shift}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default LobCard;
