import { shift } from '../../utils/orderRenderArr';
import { useState, useRef, useEffect, useMemo } from 'react';
import lobImg from '../../assets/images/lobby.jpg';

const LobCard = ({
  lobby,
  setNextModalOpen,
  setPickLobbyModalClose,
  setLobbyInfo,
  editLobby,
}) => {
  const { id, name, Wedding } = lobby;
  const [showShiftModal, setShowShiftModal] = useState(false);
  const cardRef = useRef(null);

  // Get lobby booked shift
  const bookedShift = useMemo(
    () => Wedding.map(({ shift }) => shift),
    [Wedding]
  );

  const resolveBusyShift = (shift, bookedShift) => {
    if (bookedShift.includes(shift)) return 'busy';
  };

  const handleCardClick = () => {
    setShowShiftModal(true);
  };

  const handleShiftClick = (shift) => {
    setLobbyInfo(id, shift, name);
    // If Lobby card in edit mode, close lobby modal after shift picked
    if (editLobby) return setPickLobbyModalClose();
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
      <img src={lobImg} alt={name} className="lob-img" />
      <div className="content">
        <h5>{name}</h5>
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
