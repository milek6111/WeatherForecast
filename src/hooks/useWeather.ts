import {useState, useEffect} from 'react'

export const useWeather = (latitude: number, longitude: number) => {
    const [data, setData] = useState<{ temperature_2m_max: number[], temperature_2m_min: number[], time: string[], weather_code: number[], generated_energy: number[] }>();


    useEffect(() => {
        fetch(`https://weatherforecastapi-6e5v.onrender.com/api/v1/forecast?latitude=${latitude}&longitude=${longitude}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Błąd pobierania danych. Kod odpowiedzi: ' + res.status);
                }
                return res.json();
            })
            .then(res => {
                setData(res);
            })
            .catch(error => {
                console.error('Błąd:', error);
            });
    }, [latitude, longitude]);

    return data
}