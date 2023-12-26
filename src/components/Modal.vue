<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header v-if="this.type === 'student'" class="modal-header">
                <slot name="header">
                    Add Student

                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>
            <header v-else-if="this.type === 'group'" class="modal-header">
                <slot name="header">
                    Add Group
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>
            <header v-else-if="this.type === 'studentEdit'" class="modal-header">
                <slot name="header">
                    Edit
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>
            <header v-else-if="this.type === 'studentDelete'" class="modal-header">
                <slot name="header">
                    Delete
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>
            <header v-else-if="this.type === 'groupEdit'" class="modal-header">
                <slot name="header">
                    Delete
                </slot>
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>
            <header v-else class="modal-header">
                <slot name="header">
                    Delete
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
            <section v-else-if="this.type === 'group'" class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Group Name</div>
                        <div>
                            <input type="text" name="group_name" v-model="group_name" placeholder="Enter Group Name">
                        </div>
                    </div>
                </slot>
            </section>
            <section v-else-if="this.type === 'studentEdit'" class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Name : {{ editName }}</div>
                        <div>
                            <input type="text" name="name" v-model="newName" placeholder="Enter Name">
                        </div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Gender: {{ editGender }}</div>
                        <div><input type="text" name="gender" v-model="newGender" placeholder="Enter Gender"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Email: {{ editEmail }}</div>
                        <div><input type="text" name="email" v-model="newEmail" placeholder="Enter Email"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Place Of Birth: {{ editPob }}</div>
                        <div><input type="text" name="Pob" v-model="newPob" placeholder="Enter Place Of Birth"></div>
                    </div>
                    <div class="outerDiv">
                        <div class="label">Date Of Birth: {{ editDob }}</div>
                        <div><input type="text" name="dob" v-model="newDob" placeholder="Enter Date Of Birth"></div>
                    </div>
                </slot>
            </section>
            <section v-else-if="this.type === 'studentDelete'" class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Are you sure you want to delete this student?</div>
                    </div>
                </slot>
            </section>
            <section v-else-if="this.type === 'groupEdit'" class="modal-body">
                <slot name="body">
                    <div class="label">Group Name: {{ editGroup }}</div>
                    <div>
                        <input type="text" name="group_name" v-model="newGroup" placeholder="Enter Group Name">
                    </div>
                </slot>
            </section>
            <section v-else-if="this.type === 'groupDelete'" class="modal-body">
                <slot name="body">
                    <div class="outerDiv">
                        <div class="label">Are you sure you want to delete this Study Group?</div>
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
            <footer v-if="this.type === 'studentDelete'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitDelete(record)">
                    Delete
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
            <footer v-if="this.type === 'studentEdit'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitEdit(editId)">
                    Edit
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
            <footer v-else-if="this.type === 'group'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitGroup()">
                    Add
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
            <footer v-else-if="this.type === 'groupEdit'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitGroupEdit(editIdGroup)">
                    Update
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>
            <footer v-else-if="this.type === 'groupDelete'" class="modal-footer">
                <button type="button" class="btn-green" v-on:click="submitGroupDelete(record)">
                    Delete
                </button>
                <button type="button" class="btn-green" @click="close">
                    Close
                </button>
            </footer>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue';
export default {
    name: 'ModalVue',
    props: {
        type: String,
        record: Object,
        editData: Object,
        editName: String,
        editGender: String,
        editEmail: String,
        editPob: String,
        editDob: String,
        editGroup: String,
        editId: String,
        editIdGroup: String,
    },
    setup(props, { emit }) {
        let name = ref('')
        let email = ref('')
        let gender = ref('')
        let pob = ref('')
        let dob = ref('')
        let groups = ref('')
        let newName = ref('')
        let newGender = ref('')
        let newEmail = ref('')
        let newPob = ref('')
        let newDob = ref('')
        let newGroup = ref('')
        let list = ref([])
        let group_name = ref('')

        const close = () => {
            emit('close');
        }
        const submit = async () => {
            let res = await axios.post(`http://localhost:5000/students`, {
                name: name.value,
                gender: gender.value,
                email: email.value,
                place_of_birth: pob.value,
                date_of_birth: dob.value,
                study_group: groups.value
            });
            console.log(res)
            name.value = ""
            gender.value = ""
            email.value = ""
            pob.value = ""
            dob.value = ""
            groups.value = ""
            close();
        }
        const submitGroupEdit = async (data) => {
            let res = await axios.put(`http://localhost:5000/group-update/` + data, {
                group: newGroup.value
            })
            console.log(res)
            close();

        }

        const submitDelete = async (data) => {
            let res = await axios.delete(`http://localhost:5000/students-delete/` + data._id);
            console.log(res)
            close();
        }
        const submitGroupDelete = async (data) => {
            let res = await axios.delete(`http://localhost:5000/study-groups/` + data._id);
            console.log(res)
            close();

        }
        const submitEdit = async (editId) => {
            let res = await axios.put(`http://localhost:5000/students-update/` + editId, {
                name: newName.value.length > 0 ? newName.value : props.editName,
                gender: newGender.value.length > 0 ? newGender.value : props.editGender,
                email: newEmail.value.length > 0 ? newEmail.value : props.editEmail,
                place_of_birth: newPob.value.length > 0 ? newPob.value : props.editPob,
                date_of_birth: newDob.value.length > 0 ? newDob.value : props.editDob,
            });
            console.log(res)
            newName.value = ''
            newGender.value = ''
            newEmail.value = ''
            newPob.value = ''
            newDob.value = ''
            close();
        }
        const submitGroup = async () => {
            let res = await axios.post(`http://localhost:5000/study-groups`, {
                group: group_name.value,
            });
            console.log(res)
            group_name.value = '';
            close();
        }
        const filterGroup = (data) => {
            groups.value = data
        }
        const filterList = async () => {
            let res = await axios.get(`http://localhost:5000/study-groups`);
            list.value = res.data.group;
        }
        onMounted(() => {
            filterList()
        })


        return {
            name,
            gender,
            email,
            pob,
            dob,
            groups,
            newName,
            newGender,
            newEmail,
            newPob,
            newDob,
            newGroup,
            list,
            group_name,
            filterList,
            filterGroup,
            submitGroup,
            submitDelete,
            submitEdit,
            submitGroupDelete,
            submitGroupEdit,
            submit,
            close
        }

    }
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