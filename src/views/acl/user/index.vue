<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 20px 0">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button
        type="danger"
        @click="batchDeleteUser"
        :disabled="selectUser.length > 0 ? false : true"
      >
        批量删除
      </el-button>
      <el-table
        border
        :data="userArr"
        @selection-change="
          (users: User[]) => (selectUser = users.map((item) => item.id!))
        "
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="id" prop="id" width="80px"></el-table-column>
        <el-table-column
          label="用户名字"
          prop="name"
          width="100px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          width="100px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          width="180px"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="setRole(row)"
              size="small"
              icon="User"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm title="确定要删除该用户?" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
      />
    </el-card>
    <!--抽屉一：用于新增和修改用户-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="姓名" v-model="userParams.name" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input placeholder="昵称" v-model="userParams.username" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input placeholder="密码" v-model="userParams.password" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="drawer = false">取消</el-button>
      </template>
    </el-drawer>
    <!--抽屉二，用于分配职位-->
    <el-drawer v-model="drawer1">
      <template #header>分配角色用户</template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input disabled></el-input>
          </el-form-item>
          <el-form-item label="用户列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRoles"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox v-for="role in roles" :key="role" :label="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="assignRole">确认</el-button>
        <el-button @click="drawer1 = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useSettingStore from '@/store/modules/settings'
import {
  reqUserList,
  reqAddOrUpdateUser,
  reqGetAllRoles,
  reqAssignRole,
  reqDeleteUser,
  reqBatchDeleteUser,
} from '@/api/acl/user'
import type { FormRules, FormInstance } from 'element-plus'
import type {
  UserResponseData,
  User,
  RoleResponseData,
  Role,
  AssignRole,
} from '@/api/acl/user/type'
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<User[]>()
let keyword = ref<string>('')
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let roles: Role[] = []
let userRoles = ref<Role[]>([])
let userParams = reactive<User>({
  id: undefined,
  username: '',
  name: '',
  password: '',
})
let selectUser = ref<number[]>([])
let formRef = ref<FormInstance>()
let settingStore = useSettingStore()
const validateUsername = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度要大于5'))
  }
}
const validateName = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('名称长度要大于5'))
  }
}
const validatePassword = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度要大于6'))
  }
}
const rules = reactive<FormRules<User>>({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validateName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
})
const getUserList = async (current = 1, limit = 5) => {
  currentPage.value = current
  pageSize.value = limit
  let res: UserResponseData = await reqUserList(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code == 200) {
    userArr.value = res.data.records
    total.value = res.data.total
  }
}
// 重置
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加用户
const addUser = () => {
  // 清空数据
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
    id: undefined,
  })
  formRef.value?.clearValidate()
  drawer.value = true
}
// 修改用户
const updateUser = async (row: User) => {
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
    id: undefined,
  })
  formRef.value?.clearValidate()
  drawer.value = true
  userParams.id = row.id
  userParams.name = row.name
  userParams.username = row.username
}
// 删除
const deleteUser = async (row: User) => {
  let res: any = await reqDeleteUser(row.id!)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getUserList(
      userArr.value!.length > 1 ? currentPage.value : currentPage.value - 1,
      pageSize.value,
    )
  } else {
    ElMessage.error('删除失败')
  }
}
// 批量删除
const batchDeleteUser = async () => {
  let res: any = await reqBatchDeleteUser(selectUser.value)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getUserList(1, pageSize.value)
  } else {
    ElMessage.error('删除失败')
  }
}
// 获取角色
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  drawer1.value = true
  let res: RoleResponseData = await reqGetAllRoles(row.id!)
  if (res.code == 200) {
    roles = res.data.allRolesList
    userRoles.value = res.data.assignRoles
  }
}
// 分配角色
const assignRole = async () => {
  let roleIdList = userRoles.value.map((item) => item.id!)
  let assignRole: AssignRole = { roleIdList, userId: userParams.id! }
  let res: any = await reqAssignRole(assignRole)
  if (res.code == 200) {
    ElMessage.success('角色分配成功')
    drawer1.value = false
    getUserList(currentPage.value, pageSize.value)
  } else {
    ElMessage.error('角色分配失败')
  }
}
const handleCheckAllChange = (val: boolean) => {
  userRoles.value = val ? roles : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roles.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.length
}
// 保存
const save = async () => {
  // 表单验证
  await formRef.value?.validate()
  let res: any = await reqAddOrUpdateUser(userParams)
  if (res.code == 200) {
    drawer.value = false
    ElMessage.success(userParams.id ? '修改成功' : '添加成功')
    // getUserList(1, pageSize.value)
    // 刷新游览器重新获取用户信息
    window.location.reload()
  } else {
    ElMessage.error(userParams.id ? '修改失败' : '添加失败')
  }
}
watchEffect(() => {
  getUserList(currentPage.value, pageSize.value)
})
onMounted(() => {
  getUserList()
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
