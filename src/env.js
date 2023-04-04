
// import Cookies from 'js-cookie';



// export const domain = "http://localhost:8000";
export const imageApiKey = '5a73a4da3332ae51a7b323c8c3f97836';
export const domain = "https://yasirmamun71.pythonanywhere.com";
export const userToken = window.localStorage.getItem("token")
export const adminToken = window.localStorage.getItem("admin_token")

export const header = {
    Authorization: `token ${userToken}`
}

export const admin_header = {
    Authorization: `token ${adminToken}`
}
// export const domain = "";

/*
    window.localStorage.setItem('myCat', 'Tom');
    window.localStorage.removeItem('myCat');
    window.localStorage.clear();
    window.localStorage.getItem("token");
*/
// const token = ""

// const csrftoken = Cookies.get('csrftoken')
// export const header2 = {
//     'X-CSRFToken': csrftoken,
// }