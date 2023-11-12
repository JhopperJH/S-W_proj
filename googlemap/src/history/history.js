import { useState } from 'react'
import {db} from '../firebase.db'
import {push, child, ref, update} from 'firebase/database'
import { IconButton } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';

function History(props) {

    const date = props.data.date
    const origin = props.data.origin
    const destination = props.data.destination
    const isFavorite = props.data.isFavorite
    const uid = props.data.uid
    const key = props.data.key


    function writeNewHistory() {
        const postData = {
            date : date,
            origin : origin,
            destination : destination,
            isFavorite : !isFavorite
        }


        console.log("key : ",key)

        const updates = {}
        updates[`user/` + uid + `/history/` + key] = postData
        
        return update(ref(db), updates)
    }

    return (
        <div style={{fontSize: "20px", alignItems: "center", display:" flex", justifyContent:"space-between"}}>
            {origin} → {destination} <br/>
            เริ่มเดินทาง {date} <br/>
            _______________________
            <div>
                <IconButton onClick={() => {writeNewHistory();}}>
                {(isFavorite) ? (
                    <StarRateIcon/>
                    ) : (
                    <StarOutlineIcon/>
                    )
                }
                </IconButton>
            </div>
        </div>
    )
}

export default History