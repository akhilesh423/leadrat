
import { Component } from "react"


import Seat from '../Seat'
import { MdEventSeat } from "react-icons/md"
import { MdOutlineEventSeat } from "react-icons/md"
import './index.css'

class SeatingLayout extends Component {
    state = { seatsArray: [], selectedSeats: [], text: "" }

    componentDidMount() {
        this.getSeats()

    }

    onClickSeat = (id) => {
        const { seatsArray } = this.state
        const selectedSeat = seatsArray.filter(eachItem => eachItem.seatId === id);
        this.setState({ selectedSeats: [...selectedSeat] })

    }

    getSeats = async () => {
        const response = await fetch('http://localhost:3000/')
        const data = await response.json()
        const formattedData = data.map((eachItem) => ({
            seatId: eachItem.seat_id,
            seatNumber: eachItem.seat_number,
            seatType: eachItem.seat_type,
            seatAvailable: eachItem.seat_available
        }))
        this.setState({ seatsArray: formattedData })

    }

    onClickProceedBtn = () => {
        const { selectedSeats } = this.state
        selectedSeats.map((eachItem) => (
            this.fetchUpdateseats(eachItem.seatId)))
    }

    fetchUpdateseats = async (seatId) => {
        const url = `http://localhost:3000/${seatId}`
        const options = {
            method: "PUT"
        }
        await fetch(url, options)

    }

    render() {
        const { seatsArray } = this.state
        return (
            <div className="main-container">
                <div>
                    <div><MdEventSeat /> Unavailable</div>
                    <div><MdOutlineEventSeat /> Available</div>
                </div>
                <p>After Clicking the proceed button. Please, refresh the page to reflect the changes.</p>

                <ul className="seats-container">
                    {seatsArray.map((eachItem) => (
                        <Seat key={eachItem.id} seat={eachItem} onClickSeat={this.onClickSeat} />
                    ))}
                </ul>
                <button className="button" onClick={this.onClickProceedBtn} type="button">Proceed</button>
            </div>
        )
    }
}



export default SeatingLayout