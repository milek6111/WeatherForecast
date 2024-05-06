import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeather } from "../hooks/useWeather";
import { formatDate } from "../utils/formatDate";
import { weatherCodeToIcon } from "../utils/weatherCodeToIcon";
import styles from './Table.module.css'
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export const Table = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const data  = useWeather(latitude, longitude)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {data?.time.map(
                            element => formatDate(element)
                        ).map((time, index) => (
                            <th key={`${time}_${index}`}>
                                {time}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Min temperature
                        </td>
                        {data?.temperature_2m_min.map(
                            (temperatureMin, index) => <td key={`${temperatureMin}_${index}`}>{temperatureMin} °C</td>
                        )
                        }
                    </tr>
                    <tr>
                        <td>
                            Max temperature
                        </td>
                        {data?.temperature_2m_max.map(
                            (temperatureMax, index) => <td key={`${temperatureMax}_${index}`}>{temperatureMax} °C</td>
                        )
                        }
                    </tr>
                    <tr>
                        <td>
                            Energy obtained
                        </td>
                        {data?.generated_energy.map(
                            (generatedEnergy, index) => <td key={`${generatedEnergy}_${index}`}>{generatedEnergy.toFixed(2)} kWh</td>
                        )
                        }
                    </tr>
                    <tr>
                        <td>
                            Weather
                        </td>
                        {data?.weather_code.map(
                            (weatherCode, index) => {
                                const weatherCodeMapping = weatherCodeToIcon.get(weatherCode)
                                if (!weatherCodeMapping) {
                                    return <td key={index}>
                                        <div className={styles.weatherContainer}>
                                            <FontAwesomeIcon icon={faTriangleExclamation} />
                                        </div>
                                    </td>
                                }
                                return (
                                    <td key={index}>
                                        <div className={styles.weatherContainer}>
                                            <FontAwesomeIcon icon={weatherCodeMapping.icon} />
                                            <span>
                                                {weatherCodeMapping.description}
                                            </span>
                                        </div>
                                    </td>
                                )
                            }
                        )
                        }
                    </tr>
                </tbody>
            </table>
        </>
    )

}