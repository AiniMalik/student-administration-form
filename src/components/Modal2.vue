<template>
    <h1>hello</h1>
    <!-- <div class="modal-backdrop">
        <div class="modal">
            <header v-if="this.type === 'student'" class="modal-header">
                <slot name="header">
                    Add Student
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header> 
            <header  class="modal-header">
                <slot name="header">
                    Modal 2
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>

            <section v-if="this.type === 'student'" class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Name</div>
                        <div>
                            <input type="text" name="name" v-model="name" placeholder="Enter Name">
                        </div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Gender</div>
                        <div><input type="text" name="gender" v-model="gender" placeholder="Enter Gender"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Email</div>
                        <div><input type="text" name="email" v-model="email" placeholder="Enter Email"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Place Of Birth</div>
                        <div><input type="text" name="Pob" v-model="pob" placeholder="Enter Place Of Birth"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Date Of Birth</div>
                        <div><input type="text" name="dob" v-model="dob" placeholder="Enter Date Of Birth"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Study Groups</div>

                        <div class="study-group" v-for="(item, index) in list" :key="index">
                            <div>
                                <input type="radio" name="input-filter" :checked="selected ? true : false"
                                    v-on:click="filterGroup(item.group)" />
                            </div>
                            <div>{{ item.group }}</div>

                        </div>
                    </div>
                </slot>
            </section>
            <section v-else class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Group Name</div>
                        <div>
                            <input type="text" name="group_name" v-model="group_name" placeholder="Enter Group Name">
                        </div>
                    </div>
                </slot>
            </section>
            <footer v-if="this.type === 'student'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submit()">
                    Add
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
            <footer v-else class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitGroup()">
                    Add
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
        </div>
    </div>  -->
</template>

<script>
// import axios from 'axios';
export default {
    name: 'Modal2Vue',
    props: {
        type: String
    },
    // data() {
    //     return {
    //         name: "",
    //         gender: "",
    //         email: "",
    //         pob: "",
    //         dob: "",
    //         groups: "",
    //         list: [],
    //         group_name: ""

    //     }
    // },
    // methods: {
    //     close() {
    //         this.$emit('close');
    //     },
    //     async submit() {
    //         let res = await axios.post(`http://localhost:5000/students`, {
    //             name: this.name,
    //             gender: this.gender,
    //             email: this.email,
    //             place_of_birth: this.pob,
    //             date_of_birth: this.dob,
    //             study_group: this.groups
    //         });
    //         console.log(res)
    //         this.close();
    //     },
    //     async submitGroup() {
    //         let res = await axios.post(`http://localhost:5000/study-groups`, {
    //             group: this.group_name,
    //         });
    //         console.log(res)
    //         this.close();
    //     },
    //     filterGroup(data) {
    //         this.groups = data
    //     },
    //     async filterList() {
    //         let res = await axios.get(`http://localhost:5000/study-groups`);
    //         this.list = res.data.group;
    //         console.log(this.type)
    //     },
    // },
    // mounted() {
    //     this.filterList();
    // }
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #2a93ad;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
    overflow: hidden;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #2a93ad;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    width: 38%;
    font-weight: 500;
    background-color: #2a93ad;
    cursor: pointer;
}

.outerDiv {
    padding-left: 10%;
    padding-right: 10%;
}

input {
    width: 100%;
    border: 1px solid lightgrey;
    padding-left: 0.5rem;
}

:-ms-input-placeholder {
    padding-left: 0.5rem;
}

input:focus {

    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.label {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}

.study-group {
    display: flex;
    gap: 5px
}
</style>