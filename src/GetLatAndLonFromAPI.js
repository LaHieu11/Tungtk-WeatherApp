import { useState, useEffect } from "react";

export default function GetLatAndLonFromAPI() {
    const [infor, setInfor] = useState("");
    const [latID, setLatID] = useState("");
    const [lonID, setLonID] = useState("");
    const [city, setCity] = useState("");
    const [sevendays, setsevendays] = useState("");
    const [sevenDayFeelsLike, setSevenDayFeelsLike] = useState([]);
    const [sevenDayTemp, setSevenDayTemp] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
        )
            .then((res) => res.json())
            .then((data) => setInfor(data));
    }, [city]);

    useEffect(() => {
        if (infor) {
            setLatID(infor.coord.lat);
            setLonID(infor.coord.lon);
        }
    }, [infor]);

    useEffect(() => {
        if (latID && lonID) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latID}&lon=${lonID}&cnt=7&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => setsevendays(data));
        }
    }, [latID, lonID]);

    useEffect(() => {
        if (sevendays.list && sevendays.list.length > 0) {
            const feelsLikeData = sevendays.list.map((item) => item.main.feels_like);
            setSevenDayFeelsLike(feelsLikeData);
            const TempOfSevenday = sevendays.list.map((item) => item.main.temp);
            setSevenDayTemp(TempOfSevenday);
        }
    }, [sevendays]);

    console.log(sevenDayFeelsLike);

    return (
        <>
            {infor && (
                <div>
                    <p>Temperature: {infor.main.temp}</p>
                </div>
            )}

            {sevenDayFeelsLike.length > 0 && (
                <div>
                    <p>Feels Like for the next 7 days: {sevenDayFeelsLike.join(", ")}</p>
                </div>

            )}

            {sevenDayTemp.length > 0 && (
                <div>
                    <p>temp for the next 7 days: {sevenDayTemp.join(", ")}</p>
                </div>

            )}
        </>
    );
}
