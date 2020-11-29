export async function apiCall( url, method){
    //"https://cors-anywhere.herokuapp.com/" +
      const e = await fetch("https://portfolio-a537a.firebaseio.com/"+url+"?print=pretty",{
        method: method,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const x = e.json();
      return x;
  }
  
  export default apiCall;