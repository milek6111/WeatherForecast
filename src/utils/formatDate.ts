export const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const day = date.getDate();

    let formattedDay = day < 10 ? `0${String(day)}` : `${String(day)}`;
    const month = date.getMonth() + 1;
    let formattedMonth = month < 10 ? `0${String(month)}` : `${String(month)}`;
    const year = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${year}`;
}