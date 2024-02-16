<template>
  <el-table
    :data="records"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.children.length > 1 ? false : true"
          @click="addPermissionMenu(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
          @click="updatePermissionMenu(row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
          @click="deleteMenu(row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--添加菜单对话框-->
  <el-dialog
    v-model="showDialog"
    :title="menuParams.id ? '更新菜单' : '添加菜单'"
  >
    <template #header>
      <h2>Tips</h2>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="menuParams.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="menuParams.code" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="save">确认</el-button>
      <el-button @click="showDialog = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqMenu, reqAddOrUpdateMenu, reqDeleteMenu } from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PerssionList,
  Permission,
  MenuParams,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
let showDialog = ref<boolean>(false)
let records = ref<PerssionList>([])
let menuParams = reactive<MenuParams>({
  id: undefined,
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const getPermissionMenu = async () => {
  let res: PermissionResponseData = await reqMenu()
  if (res.code == 200) {
    records.value = res.data
  }
}
//
const addPermissionMenu = (row: Permission) => {
  // 清空数据
  Object.assign(menuParams, {
    id: undefined,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  showDialog.value = true
  menuParams.pid = row.id!
  menuParams.level = row.level + 1
}
//
const updatePermissionMenu = (row: Permission) => {
  showDialog.value = true
  Object.assign(menuParams, row)
}
//
const deleteMenu = async (row: Permission) => {
  let res: any = await reqDeleteMenu(row.id!)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getPermissionMenu()
  } else {
    ElMessage.error('删除失败')
  }
}
//
const save = async () => {
  let res: any = await reqAddOrUpdateMenu(menuParams)
  if (res.code == 200) {
    ElMessage.success(menuParams.id ? '修改菜单成功' : '添加菜单成功')
    getPermissionMenu()
  } else {
    ElMessage.success(menuParams.id ? '修改菜单失败' : '添加菜单失败')
  }
}
onMounted(() => {
  getPermissionMenu()
})
</script>

<style scoped></style>
