export default  function formatUnixTimestamp(timestamp) {
    // Convert Unix timestamp to milliseconds
    var timestampMilliseconds = timestamp * 1000;

    // Create a new Date object
    var date = new Date(timestampMilliseconds);

    // Get date components
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');

    // Format the date string
    var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}