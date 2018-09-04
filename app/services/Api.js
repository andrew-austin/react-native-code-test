class Api {

  static API_BASE = "https://reqres.in/api/"; 
  static API_USER_LIST = "users"; 

    static headers() {
      return { 
        'Content-Type': 'Application/x-www-form-urlencoded',
        'Accept': '*/*'
      }
    }
    
    static get(route, headerData) {
      return this.xhr2(route, 'GET', headerData);
    }
    static put(route, params) {
      return this.xhr(route, params, 'PUT')
    }
  
    static post(route, params) {
      return this.xhr(route, params, 'POST')
    }
  
    static delete(route, params) {
      return this.xhr(route, params, 'DELETE')
    }
    static xhr2(route, verb, headerData) {
      let options = Object.assign({ method: verb }, );
      options.headers = headerData;
      console.log("HEADER DATA ", options.headers)
      console.log("Api.API_BASE+route ", Api.API_BASE + route)
  
      return fetch(Api.API_BASE + route, options).then(resp => {
  
        let json = resp.json();
  
        if (resp.ok) {
          return json
        }
        return json.then(err => { throw err });
      }).then(json => json);
    }
  
    static xhr(route, params, verb) {
      let options = Object.assign({ method: verb });
      options.headers = Api.headers()
  
      const str = [];
      for (let p in params) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
      const body = str.join("&");
  
      options.body = body;
      console.log("HEADER DATA ", options.headers)
      console.log("Api.API_BASE+route ", Api.API_BASE + route)
  
      return fetch(Api.API_BASE + route, options).then(resp => {
        let json = resp.json();
        console.log("API RESPONSE json   ", json)
        if (resp.ok) {
          console.log("API RESPONSE @2  ")
          return json
        }
        return json.then(err => {
          console.log("API RESPONSE @3  ")
          throw err
        });
      }).then(json => json);
    }
  }
  
  export default Api;
  