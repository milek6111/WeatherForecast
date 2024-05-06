import { IconDefinition, faSnowflake, faSun } from "@fortawesome/free-regular-svg-icons";
import { faCloud, faCloudBolt, faCloudMeatball, faCloudRain, faCloudShowersHeavy, faCloudShowersWater, faCloudSun, faSmog } from "@fortawesome/free-solid-svg-icons";


export const weatherCodeToIcon = new Map<number, { icon: IconDefinition, description: string }>([
    [0, { icon: faSun, description: "Clear sky" }],
    [1, { icon: faCloudSun, description: "Mainly clear" }],
    [2, { icon: faCloudSun, description: "Partly cloudy" }],
    [3, { icon: faCloud, description: "Overcast" }],
    [45, { icon: faSmog, description: "Fog" }],
    [48, { icon: faSmog, description: "Depositing rime fog" }],
    [51, { icon: faCloudRain, description: "Light drizzle" }],
    [53, { icon: faCloudRain, description: "Moderate drizzle" }],
    [55, { icon: faCloudRain, description: "Dense drizzle" }],
    [56, { icon: faCloudShowersHeavy, description: "Light freezing drizzle" }],
    [57, { icon: faCloudShowersHeavy, description: "Dense freezing drizzle" }],
    [61, { icon: faCloudRain, description: "Slight rain" }],
    [63, { icon: faCloudRain, description: "Moderate rain" }],
    [65, { icon: faCloudRain, description: "Heavy rain" }],
    [66, { icon: faCloudShowersHeavy, description: "Light freezing rain" }],
    [67, { icon: faCloudShowersHeavy, description: "Heavy freezing drizzle" }],
    [71, { icon: faSnowflake, description: "Slight snowfall" }],
    [73, { icon: faSnowflake, description: "Moderate snowfall" }],
    [75, { icon: faSnowflake, description: "Heavy snowfall" }],
    [77, { icon: faCloudMeatball, description: "Snow grains" }],
    [80, { icon: faCloudShowersWater, description: "Slight rain shower" }],
    [81, { icon: faCloudShowersWater, description: "Moderate rain shower" }],
    [82, { icon: faCloudShowersWater, description: "Violent rain shower" }],
    [85, { icon: faSnowflake, description: "Slight snow shower" }],
    [86, { icon: faSnowflake, description: "Heavy snow shower" }],
    [95, { icon: faCloudBolt, description: "Thunderstorm" }],
    [96, { icon: faCloudBolt, description: "Thunderstorm with slight hail" }],
    [99, { icon: faCloudBolt, description: "Thunderstorm with heavy hail" }],
]);