// import mypic from "./krishnkumar.jpeg"
export const Contact = ()=>{
    const mainDiv = {
        padding:"18px",
        border:"2px solid black",
        margin:"5%",
        borderRadius:"15px",
        display:"flex",
        justifyContent: "space-between",
        flexDirection: "column"
    }
    // const picStyle = {
    //     width: "20%"
    // }
    return (
        <div style={mainDiv}>
            {/* <img style={picStyle} src={mypic} alt="Krishn Kumar" /> */}
            <div>
                <h3>Name : Ket</h3>
                <h3>Phone No : 0729563326</h3>
                <h3>Qualification : </h3>
                <h3>Email : </h3>
            </div>
        </div>
    )
}