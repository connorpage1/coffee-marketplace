import { useEffect } from "react";

function MyProfile() {
    useEffect(() => {
        fetch('/api/v1/profile')
        .then(res => {
            if (res.ok) {
                res.json()
                .then(profileObj => console.log(profileObj))
            } else {
                throw Error("response not ok")
            }
        }).catch(err => console.log(`error caught ${err}`))
    }    
    , [])
    
    return (
    <div>
        <h1>3</h1>
    </div>
    );
}


export default MyProfile;