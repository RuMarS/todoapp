import axios from "axios";

class TodoDataService {
    getAll(token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}` ;//"Token"+ token;
        //alert( "axios "+ axios.defaults.headers.common["Authorization"]);
        return axios.get("http://user24122010.pythonanywhere.com/api/todos/");
    }

    createTodo(data, token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
       // alert("axios createTodo");
        return axios.post("http://user24122010.pythonanywhere.com/api/todos/", data);
    }

    updateTodo(id, data, token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      //  alert("axios updateTodo");
        return axios.put("http://user24122010.pythonanywhere.com/api/todos/"+`${id}`, data);
    }

    deleteTodo (id, token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        return axios.delete("http://user24122010.pythonanywhere.com/api/todos/"+`${id}`);
    }

    completeTodo(id, token){
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        return axios.put("http://user24122010.pythonanywhere.com/api/todos/"+`${id}`+"/complete");
    }

    login(data){
        return axios.post("http://user24122010.pythonanywhere.com/api/login/", data);
    }

    signup(data){
        return axios.post("http://user24122010.pythonanywhere.com/api/signup/", data);
    }

}

export default new TodoDataService();
