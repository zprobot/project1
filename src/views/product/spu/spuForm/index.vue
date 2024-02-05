<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入名称" v-model="spuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择品牌" v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="描述"
        v-model="spuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imgList"
        action="/ap/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="unUseItem"
        :placeholder="`还有${unUseSaleAttr.length}个未选择`"
      >
        <el-option
          v-for="item in unUseSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        :disabled="unUseItem ? false : true"
        type="primary"
        icon="Plus"
        style="margin-left: 10px"
        @click="addSaleAttr"
      >
        添加销售属性
      </el-button>
      <el-table border :data="saleAttr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="80ps"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值">
          <template v-slot="{ row, $index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice($index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag == true"
              size="small"
              style="width: 100px"
              v-model="row.saleAttrValue"
              @blur="toLook(row)"
            />
            <el-button
              v-else
              type="primary"
              icon="Plus"
              size="small"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="{ $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label>
      <el-button
        type="primary"
        @click="save"
        :disabled="saleAttr.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button
        type="primary"
        @click="
          $emit('changeSence', {
            flag: 0,
            params: 'update',
          })
        "
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAllSaleAttrList,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import type {
  SpuData,
  AllTradeMarkResponseData,
  SpuImageResponseData,
  HasSaleAttrResponseData,
  SpuAttrResponseData,
  TradeMark,
  SpuAttr,
  SpuAttrValue,
  HasSaleAttr,
} from '@/api/product/spu/type'
import type { UploadProps, UploadUserFile } from 'element-plus'
let $emit = defineEmits(['changeSence'])
// 存储所有品牌
let allTradeMark = ref<TradeMark[]>([])
// 图片
let imgList = ref<UploadUserFile[]>([])
// 已有的销售属性
let saleAttr = ref<SpuAttr[]>([])
// 所有销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 存储已有的spu对象
let spuParams = ref<SpuData>({
  category3Id: undefined,
  spuName: '',
  description: '',
  tmId: undefined,
  spuImageList: [],
  spuSaleAttrList: [],
})
// 控制对话框
let dialogVisible = ref<boolean>(false)
// 对话框图片地址
const dialogImageUrl = ref('')
// 未使用的销售属性
let unUseSaleAttr = computed(() => {
  let unUseAttr = allSaleAttr.value.filter((item) => {
    // 所有为true才会返回ture
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unUseAttr
})
// 收集未使用属性的id和值
let unUseItem = ref<string>('')

const initHasSpuData = async (spu: SpuData) => {
  // 该方法暴露给父组键，由父组件调用
  spuParams.value = spu
  // 获取全部品牌数据
  let res1: AllTradeMarkResponseData = await reqAllTradeMark()
  // 获取某一个品牌下全部售卖商品的图片
  let res2: SpuImageResponseData = await reqSpuImageList(spu.id as number)
  // 获取已有的spu销售属性
  let res3: SpuAttrResponseData = await reqSpuSaleAttrList(spu.id as number)
  // 获取全部销售属性
  let res4: HasSaleAttrResponseData = await reqAllSaleAttrList()

  // 存储
  allTradeMark.value = res1.data
  imgList.value = res2.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  saleAttr.value = res3.data
  allSaleAttr.value = res4.data
}
const initAddSpuData = async (c3Id: number) => {
  // 清空之前数据
  Object.assign(spuParams.value, {
    category3Id: undefined,
    spuName: '',
    description: '',
    tmId: undefined,
    spuImageList: [],
    spuSaleAttrList: [],
  })
  spuParams.value.id = undefined
  imgList.value = []
  saleAttr.value = []
  unUseItem.value = ''
  spuParams.value.category3Id = c3Id
  // 获取全部品牌数据
  let res1: AllTradeMarkResponseData = await reqAllTradeMark()
  // 获取全部销售属性
  let res2: HasSaleAttrResponseData = await reqAllSaleAttrList()
  allTradeMark.value = res1.data
  allSaleAttr.value = res2.data
}
// 点击上传图片时候触发的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
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
// 添加saleattr
const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = unUseItem.value.split(':')
  let spuAttr: SpuAttr = {
    baseSaleAttrId: parseInt(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(spuAttr)
  unUseItem.value = ''
}
// 编辑
const toEdit = (row: SpuAttr) => {
  row.flag = true
}
// 查看
const toLook = (row: SpuAttr) => {
  let { baseSaleAttrId, saleAttrValue } = row
  // 整理数据
  let newSaleAttr: SpuAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 非空判断
  if ((saleAttrValue ?? '').trim() == '') {
    ElMessage.error('属性值不能为空！')
    return
  }
  // 非重判断
  let repeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName == saleAttrValue,
  )
  if (repeat) {
    ElMessage.error('属性值不能重复！')
    return
  }
  // 添加
  row.spuSaleAttrValueList.push(newSaleAttr)
  row.flag = false
  row.saleAttrValue = ''
}
// 图片上传后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  imgList.value[imgList.value.length - 1].url = response.data
}
// 保存
const save = async () => {
  spuParams.value.spuImageList = imgList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.url!,
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value
  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code == 200) {
    ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
    $emit('changeSence', {
      flag: 0,
      params: spuParams.value.id ? '更新' : '添加',
    })
  } else {
    ElMessage.error(spuParams.value.id ? '更新失败' : '添加失败')
  }
}
defineExpose({ initHasSpuData, initAddSpuData })
</script>
