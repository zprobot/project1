<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <el-table style="width: 100%; margin: 20px 0" border :data="records">
        <el-table-column label="序号" width="80" type="index" />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="品牌LOGO">
          <template v-slot="{ row }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="Delete"
              icon-color="#ca5863"
              :title="`你确定要删除${row.tmName}吗?`"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        @current-change="getHasTrademark"
        @size-change="sizeChange"
        :page-sizes="[3, 6, 9]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      label-width="80px"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkParams.tmName" />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/ap/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqRemoveTradeMark,
} from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
let currentPage = ref<number>(1) // 当前页码
let pageSize = ref<number>(3) // 一页数据条数
let total = ref<number>(0) // 总条目数
let records = ref<Records>([]) // 商品
let dialogFormVisible = ref<boolean>(false)
// 收集上传信息
let trademarkParams = reactive<TradeMark>({
  logoUrl: '',
  tmName: '',
})
let formRef = ref<FormInstance>() // 表单dom
// 获取条目
const getHasTrademark = async (page = 1) => {
  // 当通过@current-change触发时，page会接收当前页码的值
  currentPage.value = page
  let res: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (res.code === 200) {
    let { data } = res
    total.value = data.total
    records.value = data.records
  }
}
// 触发@current-change和 @size-change事件时，都会分别获取回调的参数（current page or size）
const sizeChange = async () => {
  getHasTrademark()
}
// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true
  // 清空上次收集的数据
  Object.assign(trademarkParams, { id: 0, logoUrl: '', tmName: '' })
  // 清理验证信息
  formRef.value?.clearValidate('logoUrl')
  formRef.value?.clearValidate('tmName')
}
// 修改品牌
const updateTrademark = (row: TradeMark) => {
  // 清理验证信息
  formRef.value?.clearValidate('logoUrl')
  formRef.value?.clearValidate('tmName')
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}
//删除品牌
const removeTradeMark = async (id: number) => {
  let res = await reqRemoveTradeMark(id)
  if (res.code === 200) {
    ElMessage.success('删除品牌成功')
    // 删除后重新获取已有品牌
    getHasTrademark(
      records.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error('删除品牌失败')
  }
}

// 取消上传
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定上传
const confirm = async () => {
  await formRef.value?.validate() // 触发整个表单的校验规则
  const res: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code == 200) {
    dialogFormVisible.value = false
    let msg = trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    ElMessage.success(msg)
    // 重新获取条目
    // 修改时在当前页 添加时跳转到第一页
    getHasTrademark(trademarkParams.id ? currentPage.value : 1)
  } else {
    let msg = trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    ElMessage.error(msg)
    dialogFormVisible.value = false
  }
}
// 图片上传之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif' ||
    rawFile.type == 'image/png'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('文件大小需要小于4Mb')
      return false
    }
  } else {
    ElMessage.error('格式为png/jpg/gif')
    return false
  }
}
// 图片上传后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data //存储url
  formRef.value?.clearValidate('logoUrl') //清理验证信息
}
// 表单校验
const validateTmName = (_: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名字长度大于等于2'))
  }
}
const validateLogoUrl = (_: any, value: string, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('必须上传logo'))
  }
}
const rules: FormRules<TradeMark> = {
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, validator: validateLogoUrl }],
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
