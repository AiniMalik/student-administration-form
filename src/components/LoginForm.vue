<template >
    <div class="mainWrapper">
        <div class="wrapper">
            <div class="login">
                <p class="header">Student Administration</p>
                <p class="subHeader">Login</p>
            </div>
            <div>
                <input class="inputs" type="email" v-model="email" placeholder="Enter Email" /><br />
            </div>
            <div>
                <input class="inputs" type="password" v-model="password" placeholder="Enter Password" /><br />
            </div>
            <div>
                <button class="btn" v-on:click="login">Login</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: 'LoginForm',
    data() {
        return {
            password: "",
            email: ""
        }
    },
    methods: {
        async login() {
            let result = await axios.post(`http://localhost:5000/login`, {
                password: this.password,
                email: this.email
            })
            if (result.status == 200) {
                localStorage.setItem("token", JSON.stringify(result.data.token));
                localStorage.setItem("userData", JSON.stringify(result.data.user))
                this.$router.push({ name: 'Home' })
            }
        }
    },
     mounted() {
        let user = localStorage.getItem('userData');
        if (user) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>
<style scoped>
.mainWrapper {
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
}

.wrapper {
    width: 400px;
    height: 300px;
    background-color: white;
}

.login {
    font-weight: 500;
    font-size: 25px;
    /* font-weight: 600; */
    margin-top: 5rem;
    color: #2a93ad;
}
.header{
    font-weight: 700;
     text-decoration: underline;
}
.subHeader{
    font-weight: 700;
     text-decoration: underline;
}
.inputs{
    margin-top: 1rem;
    height: 30px;
    width: 85%;
}
.inputs:focus{

    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.btn{
margin-top: 1rem;
margin-bottom: 0.2rem;
height: 35px;
width: 87%;
background-color:  #2a93ad;
color: white;
font-size: 15px;
font-weight: 700;
border: 1px solid  #2a93ad;
cursor: pointer;
}
.btn:hover{
color:  #2a93ad;
font-size: 15px;
font-weight: 700;
background-color:  white;
border: 1px solid #2a93ad;
cursor: pointer; 
}
</style>