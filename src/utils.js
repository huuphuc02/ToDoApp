export const compareDate = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return d1 - d2;
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
const day = ('0' + currentDate.getDate()).slice(-2);
    
export const dateToday = year + '-' + month + '-' + day;

export const formValidate = (name, dueDate) => {
    if(name === ''){
        alert('Please enter todo name!')
        return false;
    }
    if(compareDate(dateToday, dueDate) > 0){
        alert('Due date was in the past. Please try again!')
        return false;
    }
    return true;
}