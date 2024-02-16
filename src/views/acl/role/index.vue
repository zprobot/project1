<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="角色名称">
        <el-input v-model="keyword" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
          :disabled="keyword ? false : true"
        >
          搜索
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 20px 0">
    <el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
    <el-table border style="margin: 10px 0" :data="records">
      <el-table-column
        label="#"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="id"
        align="center"
        prop="id"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        prop="roleName"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" icon="User" @click="assignRule(row)">
            分配权限
          </el-button>
          <el-button type="primary" icon="Edit" @click="updateRole(row)">
            编辑
          </el-button>
          <el-button type="primary" icon="Delete" @click="deleteRole(row)">
            删除
          </el-button>
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
  <!--添加和修改对话框-->
  <el-dialog
    v-model="dialogShow"
    :title="roleParams.id ? '修改职位' : '添加职位'"
  >
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">确认</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
  </el-dialog>
  <!--分配权限的抽屉-->
  <el-drawer v-model="showDrawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        :data="permissionsMenu"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[5]"
        :props="defaultProps"
        ref="tree"
      />
    </template>
    <template #footer>
      <el-button type="primary" @click="saveRules">确认</el-button>
      <el-button @click="showDrawer = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import {
  reqGetAllRoles,
  reqAddOrUpdateRole,
  reqGetPermissions,
  reqAssignRule,
  reqDeleteRole,
} from '@/api/acl/role'
import useSettingStore from '@/store/modules/settings'
import type {
  RoleResponseData,
  Role,
  PermissionResponseData,
  PerssionList,
} from '@/api/acl/role/type'
import {
  type FormRules,
  type FormInstance,
  ElTree,
  ElMessage,
} from 'element-plus'
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let records = ref<Role[]>([])
let keyword = ref<string>('')
let settingStore = useSettingStore()
let dialogShow = ref<boolean>(false)
let form = ref<FormInstance>()
let tree = ref<InstanceType<typeof ElTree>>()
let showDrawer = ref<boolean>(false)
let roleParams = ref<Role>({
  roleName: '',
})
let permissionsMenu = ref<PerssionList>([])
let selectDefault = ref<number[]>([])
const rules: FormRules<Role> = {
  roleName: [{ required: true, trigger: 'blur' }],
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const getAllRoles = async (current = 1, limit = 10) => {
  currentPage.value = current
  pageSize.value = limit
  let res: RoleResponseData = await reqGetAllRoles(
    currentPage.value,
    pageSize.value,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
// 搜索
const search = async () => {
  let res: RoleResponseData = await reqGetAllRoles(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
// 重置
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加
const addRole = () => {
  dialogShow.value = true
  // 清除数据
  Object.assign(roleParams.value, {
    roleName: '',
    id: undefined,
  })
  nextTick(() => {
    form.value?.clearValidate('roleName')
  })
}
//
const updateRole = (row: Role) => {
  dialogShow.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value?.clearValidate()
  })
}
//
const deleteRole = async (row: Role) => {
  let res: any = await reqDeleteRole(row.id!)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getAllRoles(
      records.value.length > 1 ? currentPage.value : currentPage.value - 1,
      pageSize.value,
    )
  } else {
    ElMessage.error('删除失败')
  }
}
//
const assignRule = async (row: Role) => {
  showDrawer.value = true
  Object.assign(roleParams, row)
  let res: PermissionResponseData = await reqGetPermissions(row.id!)
  if (res.code == 200) {
    permissionsMenu.value = res.data
    selectDefault.value = filterDefaultSelectArr(res.data, [])
  }
}
//
const saveRules = async () => {
  const roleId = roleParams.value.id!
  let arr = tree.value?.getCheckedKeys()
  let arr1 = tree.value?.getHalfCheckedKeys()
  let ruleId = arr?.concat(arr1!)
  let res: any = await reqAssignRule(roleId, ruleId as number[])
  if (res.code == 200) {
    showDrawer.value = false
    ElMessage.success('更改权限成功')
    // 刷新
    window.location.reload()
  } else {
    ElMessage.error('更改权限失败')
  }
}
//
const save = async () => {
  await form.value?.validate()
  let res: any = reqAddOrUpdateRole(roleParams.value)
  if (res.code == 200) {
    ElMessage.success(roleParams.value.id ? '修改成功' : '添加成功')
    getAllRoles(roleParams.value.id ? currentPage.value : 1, pageSize.value)
  } else {
    ElMessage.success(roleParams.value.id ? '修改失败' : '添加失败')
  }
}
// 过滤
const filterDefaultSelectArr = (data: PerssionList, initArr: number[]) => {
  data.forEach((item) => {
    if (item.children && item.children.length > 0) {
      filterDefaultSelectArr(item.children, initArr)
    } else {
      if (item.select) {
        initArr.push(item.id)
      }
    }
  })
  return initArr
}
onMounted(() => {
  getAllRoles()
})
watchEffect(() => {
  getAllRoles(currentPage.value, pageSize.value)
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
