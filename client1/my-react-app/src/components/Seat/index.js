
import { MdEventSeat } from "react-icons/md"
import { MdOutlineEventSeat } from "react-icons/md"
import './index.css'

const Seat = (props) => {
    const { seat, onClickSeat } = props
    const { seatId, seatType, seatAvailable } = seat

    const selectedSeat = () => {
        onClickSeat(seatId)
    }
    return (
        <li className="seat-item" onClick={selectedSeat}>
            {seatType === "standard" ? <p>S</p> : <p>P</p>}
            {seatAvailable === "yes" ? <MdOutlineEventSeat className="icon" /> : <MdEventSeat className="icon" />}
        </li>
    )
}

export default Seat