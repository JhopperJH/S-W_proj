function History(props) {

    const date = props.data.date
    const origin = props.data.origin
    const destination = props.data.destination

    return (
        <div>
            date : {date}
            origin : {origin}
            destination : {destination}
        </div>
    )
}

export default History