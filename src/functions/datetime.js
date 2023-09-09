// - Returns a string with the current date in the following format: yyyy-mm-dd
export function get_date_today() {
    try {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    } catch (e) {
        console.error('error get date today: ', e);
        return null;
    }
}

