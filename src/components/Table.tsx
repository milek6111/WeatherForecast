import { faSnowflake, faSun } from "@fortawesome/free-regular-svg-icons";
import { faCloud, faCloudBolt, faCloudMeatball, faCloudRain, faCloudShowersHeavy, faCloudShowersWater, faCloudSun, faSmog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"


const codeToIcon:{[code:number]: {icon: JSX.Element, description: string}} = {
    0: {icon: <FontAwesomeIcon icon={faSun} />, description: "Clear sky"},
    1: {icon: <FontAwesomeIcon icon={faCloudSun} />, description: "Mainly clear"},
    2: {icon: <FontAwesomeIcon icon={faCloudSun} />, description: "Partly cloudy"},
    3: {icon: <FontAwesomeIcon icon={faCloud} />, description: "Overcast"},
    45: {icon: <FontAwesomeIcon icon={faSmog} />, description: "Fog"},
    48: {icon: <FontAwesomeIcon icon={faSmog} />, description: "Depositing rime fog"},
    51: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Light drizzle"},
    53: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Moderate drizzle"},
    55: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Dense drizzle"},
    56: {icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />, description: "Light freezing drizzle"},
    57: {icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />, description: "Dense freezing drizzle"},
    61: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Slight rain"},
    63: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Moderate rain"},
    65: {icon: <FontAwesomeIcon icon={faCloudRain} />, description: "Heavy rain"},
    66: {icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />, description: "Light freezing rain"},
    67: {icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />, description: "Heavy freezing drizzle"},
    71: {icon: <FontAwesomeIcon icon={faSnowflake} />, description: "Slight snowfall"},
    73: {icon: <FontAwesomeIcon icon={faSnowflake} />, description: "Moderate snowfall"},
    75: {icon: <FontAwesomeIcon icon={faSnowflake} />, description: "Heavy snowfall"},
    77: {icon: <FontAwesomeIcon icon={faCloudMeatball} />, description: "Snow grains"},
    80: {icon: <FontAwesomeIcon icon={faCloudShowersWater} />, description: "Slight rain shower"},
    81: {icon: <FontAwesomeIcon icon={faCloudShowersWater} />, description: "Moderate rain shower"},
    82: {icon: <FontAwesomeIcon icon={faCloudShowersWater} />, description: "Violent rain shower"},
    85: {icon: <FontAwesomeIcon icon={faSnowflake} />, description: "Slight snow shower"},
    86: {icon: <FontAwesomeIcon icon={faSnowflake} />, description: "Heavy snow shower"},
    95: {icon: <FontAwesomeIcon icon={faCloudBolt} />, description: "Thunderstorm"},
    96: {icon: <FontAwesomeIcon icon={faCloudBolt} />, description: "Thunderstorm with slight hail"},
    99: {icon: <FontAwesomeIcon icon={faCloudBolt} />, description: "Thunderstorm with heavy hail"},
  }
  

export const Table = (props: {latitude: number, longitude: number}) => {
    const [data,setData] = useState<{temperature_2m_max: number[], temperature_2m_min: number[], time: string[], weather_code: number[], generated_energy: number[]}>();

    //date formatter
    function formatDate(dateString:string) {
        const parts = dateString.split("-");
        
        if (parts.length !== 3) {
            return dateString;
        }
    
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
    
        return `${day}/${month}/${year}`;
    }


    useEffect(() => {
        fetch(`https://weatherforecastapi-6e5v.onrender.com/api/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}`)
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
      }, [props.latitude, props.longitude]);

    return(
        <>
            <table style={{ margin: '0 auto' }}>
                <tr>
                    <th></th>
                    {data?.time.map(
                        element => formatDate(element)
                    )
                    .map(element => (

                        <th>
                            {element}
                        </th>
                    ))}
                </tr>
                <tr>
                    <td>
                        Min temperature
                    </td>
                    {data?.temperature_2m_min.map(
                        element => <td>{element} °C</td>
                    )
                    }
                </tr>

                <tr>
                    <td>
                        Max temperature
                    </td>
                    {data?.temperature_2m_max.map(
                        element => <td>{element} °C</td>
                    )
                    }
                </tr>

                <tr>
                    <td>
                        Energy obtained
                    </td>
                    {data?.generated_energy.map(
                        element => <td>{element.toFixed(2)} kWh</td>
                    )
                    }
                </tr>

                <tr>
                    <td>
                        Weather
                    </td>
                    {data?.weather_code.map(
                        element => (
                            <td>
                            {codeToIcon[element].icon}
                            <br/>
                            {codeToIcon[element].description}
                            </td>
                        )

                    )
                    }
                </tr>


            </table>
        </>
    )

}