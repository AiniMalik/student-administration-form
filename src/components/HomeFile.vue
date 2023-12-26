<template>
  <div class="upperMainWrapper">
    <div class="mainWrapper">
      <div class="innerWrapper">
        <div class="logo">
          SAF
        </div>
        <div class="userName">
          <a-dropdown>
            <a-avatar :size="50" :style="{ backgroundColor: '#2a93ad', textTransform: 'uppercase' }">{{ userName }}</a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <a v-on:click="logout">
                    Logout
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="mainContentWrapper">
        <div v-bind:class="!show ? 'untouchedCards' : 'Cards'" v-on:click="state()">
          <div class="cardFont">STUDENTS</div>
          <div class="innerCardFont">{{ count }} Students Registered</div>
        </div>
        <div v-bind:class="!show ? 'Cards' : 'untouchedCards'" v-on:click="hide()">
          <div class="cardFont">Study Groups</div>
          <div class="innerCardFont">{{ totalGroups }} Total Groups</div>
        </div>

      </div>
      <div class="contentWrapper">
        <div class="innerContent" v-if="show">
          <div class="search-filter">
            <div class="search-div">
              <div class="search-font">SEARCH FOR NAMES</div>
              <div class="search-div-input">
                <search-outlined />
                <input class="search-input" v-model="stdName" v-on:change="searchStudent()" type="search" />
              </div>
            </div>
            <div class="filter-div">
              <div class="filter-font">FILTERS FOR STUDY GROUPS <div  @click="getStudents()" ><minus-outlined  /></div></div>
              <div class="filter-list" v-for="(item, index) in list" :key="index">
                <div class="filter-input">
                  <input type="radio" name="input-filter" :checked="selected ? true : false"
                    v-on:click="filterGroup(item.group)" />
                </div>
                <div class="filter-list-data">{{ item.group }}</div>
              </div>
            </div>
          </div>
          <div class="std-data">
            <div class="upper-Std-data">
              <div class="std-data-font"><user-outlined />&nbsp; {{ count }} students</div>
              <div class="std-data-btn" @click="showModal('student')">
                <div class="std-icon"><form-outlined /></div>
                <div class="std-btn">New</div>
              </div>
            </div>
            <div>
              <a-table :columns="columns" :scroll="{ y: 240 }" size="middle"
                :data-source="studyGroupSTD.length > 0 ? studyGroupSTD : studentList.length > 0 ? studentList : searchStdName.length > 0 ? searchStdName : dataSource">
              </a-table>
            </div>
          </div>

        </div>
        <div v-else>
          <div class="study-group-main-div">
            <div class="upper-Std-data">
              <div class="std-data-font"><user-outlined />&nbsp; {{ totalGroups }} Study Groups</div>
              <div class="std-data-btn" v-on:click="showModal('group')">
                <div class="std-icon"><form-outlined /></div>
                <div class="std-btn">New</div>
              </div>
            </div>
            <div>
              <a-table :columns="groupColumn" :scroll="{ y: 240 }" size="middle" :data-source="list">
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :record="dataRecord" :type="type" v-show="isModalVisible" @close="closeModal" 
    :editName="editName" :editGender="editGender" :editEmail="editEmail" :editPob="editPob" :editDob="editDob"
    :editId="editId" :editIdGroup="editIdGroup" :editGroup="editGroup" />
  <!-- <Modal2 :type="type" v-show="isModal2Visible" @close="closeModal2" /> -->
</template>

<script >
import { SearchOutlined, MinusOutlined, UserOutlined, FormOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import Modal from './Modal.vue';
// import Modal2 from './Modal2.vue'
import { h, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';



export default {
  name: 'HomeFile',
  components: {
    SearchOutlined,
    MinusOutlined,
    UserOutlined,
    FormOutlined,
    Modal,
    // Modal2,
  },
  // data() {
  //   return {
  //     userName: "",
  //     show: true,
  //     list: [],
  //     count: "",
  //     totalGroups:"",
  //     studentsList: [],
  //     studyGroupSTD: [],
  //     searchStdName: [],
  //     selected: false,
  //     stdName: "",
  //     isModalVisible: false,
  //     //  isModal2Visible: false,
  //     type:"",
  //     dataSource: [
  //       {
  //         name: '',
  //         gender: '',
  //         place_of_birth: '',
  //         date_of_birth: '',
  //         study_groups: ''
  //       },
  //     ],  
  //   }
  // },

  setup() {
    const router = useRouter()
    let userName = ref('');
    let list = ref([]);
    let show = ref(true);
    let count = ref('');
    let totalGroups = ref('');
    let studentList = ref([]);
    let studyGroupSTD = ref([]);
    let searchStdName = ref([]);
    let selected = ref(false);
    let stdName = ref('');
    let isModalVisible = ref(false);
    let isModal2Visible = ref(false);
    let dataRecord = ref({});
    let editData = ref({})
    let type = ref('');
    let editId = ref('');
    let editName = ref('');
    let editGender = ref('');
    let editEmail = ref('');
    let editPob = ref('');
    let editDob = ref('');
    let editGroup = ref('');
    let editIdGroup = ref('');


    const loadData = () => {
      let user = JSON.parse(localStorage.getItem("userData"));
      userName.value = user.name
      if (!user) {
        router.push({ name: "Login" })
      }
    }
    const state = () => {
      show.value = true
    }
    const hide = () => {
      show.value = false
    }
    const logout = () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token")
      router.push({ name: "Login" })
    }

    const filterList = async () => {
      let res = await axios.get(`http://localhost:5000/study-groups`);
      console.log(res.data.count)
      list.value = res.data.group;
      totalGroups.value = res.data.count
    }
    const filterGroup = async (data) => {
      let res = await axios.get(`http://localhost:5000/search-students/` + data)
      selected.value = true;
      studentList.value = [];
      studyGroupSTD.value = res.data
    }
    const searchStudent = async () => {
      let res = await axios.get(`http://localhost:5000/search-students-name/` + this.stdName)
      studentList.value = [];
      studyGroupSTD.value = [];
      searchStdName.value = res.data;
    }
    const getStudents = async () => {
      let res = await axios.get(`http://localhost:5000/students`)
      selected.value = false;
      studyGroupSTD.value = []
      count.value = res.data.count
      studentList.value = res.data.data
    }
    const showModal = (data) => {
      isModalVisible.value = true;
      type.value = data;

    }
    const closeModal = () => {
      isModalVisible.value = false;
      getStudents();
      filterList();
    }
    const onRowDeleteClick = async (record) => {
      showModal('studentDelete')
      dataRecord.value = record
      // let res = await axios.delete(`http://localhost:5000/students-delete/` + record._id)
      // console.log(res)
    }
    const onRowEditClick = async (record) => {
      let res = await axios.get(`http://localhost:5000/search-students-id/` + record._id)
      // let jsonRes = JSON.parse(res.data)
      editData.value = res.data
      console.log(editData.value)
      editId.value = res.data._id
      editName.value = res.data.name
      editGender.value = res.data.gender
      editEmail.value = res.data.email
      editPob.value = res.data.place_of_birth
      editDob.value = res.data.date_of_birth
      showModal('studentEdit')
    }
    const onRowGroupDelete = async (record) => {
      showModal("groupDelete")
      dataRecord.value = record
    }
    const onRowGroupEdit = async (record) => {
      let res = await axios.get(`http://localhost:5000/study-groups/` + record._id)
      console.log(res.data)
      editIdGroup.value = res.data._id,
        editGroup.value = res.data.group
      showModal('groupEdit')
    }

    onMounted(() => {
      loadData()
      filterList()
      getStudents()
    })




    return {
      userName,
      state,
      hide,
      loadData,
      list,
      editId,
      editName,
      editGender,
      editEmail,
      editPob,
      editDob,
      editGroup,
      show,
      count,
      totalGroups,
      studentList,
      studyGroupSTD,
      searchStdName,
      selected,
      stdName,
      isModalVisible,
      isModal2Visible,
      type,
      editData,
      editIdGroup,
      searchStudent,
      showModal,
      closeModal,
      filterGroup,
      logout,
      onRowDeleteClick,
      onRowEditClick,
      dataRecord,
      groupColumn: [
        {
          title: 'Group',
          dataIndex: 'group',
          key: 'name',
          width: '30%',
        },
        {
          width: '5%',
          customRender({ record }) {
            return h('button', {
              onClick: () => onRowGroupDelete(record)
            }, 'Delete')

          }
        },
        {
          width: '5%',
          customRender({ record }) {
            return h('button', {
              onClick: () => onRowGroupEdit(record)
            }, 'Edit')
          }
        },
      ],
      columns: [
        {
          title: 'NAME',
          dataIndex: 'name',
          key: 'name',
          width: '10%',
        },
        {
          title: 'SEX',
          dataIndex: 'gender',
          key: 'gender',
          width: '10%',
        },
        {
          title: 'PLACE OF BIRTH',
          dataIndex: 'place_of_birth',
          width: '10%',
          key: 'place_of_birth',
        },
        {
          title: 'DATE OF BIRTH',
          dataIndex: 'date_of_birth',
          width: '10%',
          key: 'date_of_birth',
        },
        {
          title: 'GROUPS',
          dataIndex: 'study_group',
          width: '10%',
          key: 'study_group',
        },
        {
          width: '10%',
          customRender({ record }) {
            return h('button', {
              onClick: () => onRowDeleteClick(record)
            }, 'Delete')

          }
        },
        {
          width: '10%',
          customRender({ record }) {
            return h('button', {
              onClick: () => onRowEditClick(record)
            }, 'Edit')
          }
        },
      ]
    };

  }

  //   methods: {
  //     state() {
  //       this.show = true
  //     },
  //     hide() {
  //       this.show = false
  //     },
  //     logout() {
  //       localStorage.removeItem("userData");
  //       localStorage.removeItem("token")
  //       this.$router.push({ name: "Login" })
  //     },
  //     loadData() {
  //       let user = JSON.parse(localStorage.getItem("userData"));
  //       this.userName = user.name
  //       if (!user) {
  //         this.$router.push({ name: "Login" })
  //       }
  //     },
  //     async filterList() {
  //       let res = await axios.get(`http://localhost:5000/study-groups`);
  //       console.log(res.data.count)
  //       this.list = res.data.group;
  //       this.totalGroups= res.data.count
  //     },
  //     async filterGroup(data) {
  //       let res = await axios.get(`http://localhost:5000/search-students/` + data)
  //       this.selected = true;
  //       this.studentList = [];
  //       this.studyGroupSTD = res.data
  //     },
  //     async searchStudent() {
  //       let res = await axios.get(`http://localhost:5000/search-students-name/` + this.stdName)
  //       this.studentList = [];
  //       this.studyGroupSTD = [];
  //       this.searchStdName = res.data;
  //     },
  //     async getStudents() {
  //       let res = await axios.get(`http://localhost:5000/students`)
  //       this.selected = false;
  //       this.studyGroupSTD = []
  //       this.count = res.data.count
  //       this.studentsList = res.data.data
  //     },
  //     showModal(data) {
  //       this.isModalVisible = true;
  //       this.type = data;

  //     },
  //     closeModal() {
  //       this.isModalVisible = false;
  //     },
  //   },

  //   mounted() {
  //     this.loadData();
  //     this.filterList();
  //     this.getStudents();
  //   }




  // }
}
</script>








<style scoped>
.upperMainWrapper {
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgb(243, 239, 239);
}

.mainWrapper {
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
}

.innerWrapper {
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 40px;
  font-weight: 700;
  color: #2a93ad;
    text-decoration: underline;
}

.userName {
  font-size: 30px;
}

.mainContentWrapper {
  display: flex;
  gap: 20px;
  margin-top: 2rem;
}

.Cards {
  /* border: 2px solid rgb(224, 222, 222); */
  width: 30%;
  height: 85px;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid white;
  border-radius: 0px 5px 0px 0px;
  cursor: pointer;
}

.untouchedCards {
  border-radius: 0px 5px 0px 0px;
  width: 30%;
  height: 85px;
  padding: 20px;
  background-color: rgb(224, 223, 223);
  color: grey;
  cursor: pointer;
}

.cardFont {
  color: #65b1d1;
  font-size: 18px;
  font-weight: 700;
}

.innerCardFont {
  color: rgba(0, 0, 0, 0.877);
  font-size: 15px;
  font-weight: 500;
}

.std-data-font {
  color: rgba(0, 0, 0, 0.877);
  font-size: 15px;
  font-weight: 500;
}

.contentWrapper {
  width: 100%;
  background-color: white;
  margin-top: -1px;
}

.innerContent {
  display: flex;
  padding: 20px;
  /* justify-content:space-between; */
}

.std-data {
  width: 120%;
}

.upper-Std-data {
  display: flex;
  gap: 20px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.std-data-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.std-icon {
  background-color: #3b99c2;
  color: white;
  width: 30px;
  text-align: center;
}

.std-btn {
  background-color: #65b1d1;
  color: white;
  width: 40px;
  text-align: center;
}

.search-filter {
  width: 50%;
}

.search-font {
  font-size: 14px;
  color: gray;
  margin-bottom: 0.5rem;
}

.filter-font {
  font-size: 14px;
  color: gray;
  margin-top: 1rem;
}

.filter-list {
  display: flex;
  gap: 20px;
  margin-top: 1rem;
}

.search-div-input {
  border-radius: 2px;
  border: 1px solid #ebebeb;
  background-color: #ebebeb;
  width: 60%;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 5px;
}

.search-input {
  background-color: #ebebeb;
  border: none;
  width: 100%;
}

.search-input:focus {
  outline: none !important;
}

.search-div-input:focus {
  background-color: white;
  border: 1px solid lightgray;
  outline: none !important;
}

.filter-div {
  margin-top: 2rem;
}

.action-col {
  display: flex;
  gap: 1rem;
}

.btn-edit {
  font-weight: 600;
  cursor: pointer;
  color: #65b1d1;
}

.btn-delete {
  font-weight: 600;
  color: red;
  cursor: pointer;
}

.study-group-main-div {
  padding: 20px;

}
</style>
