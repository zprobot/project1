<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input v-model="skuParams.skuName" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" v-model="skuParams.price" />
      </el-form-item>
      <el-form-item label="重量(元)">
        <el-input type="number" v-model="skuParams.weight" />
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input type="textarea" v-model="skuParams.skuDesc" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.attrItem">
              <el-option
                v-for="attrV in item.attrValueList"
                :key="attrV.id"
                :label="attrV.valueName"
                :value="`${item.id}:${attrV.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.saleItem">
              <el-option
                v-for="saleV in item.spuSaleAttrValueList"
                :key="saleV.id"
                :label="saleV.saleAttrValueName"
                :value="`${item.id}:${saleV.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column
            type="selection"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" size="small" @click="setDefault(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button
          @click="
            $emit('changeSence', {
              flag: 0,
              params: '',
            })
          "
        >
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuSaleAttrList,
  reqSpuImageList,
  reqAddSku,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import type { TableInstance } from 'element-plus'
import type {
  SpuData,
  SpuAttrResponseData,
  SpuImageResponseData,
  SpuAttr,
  SpuImage,
  SkuData,
} from '@/api/product/spu/type'
import type { AttrResponseData, AttrList } from '@/api/product/attr/type'
let $emit = defineEmits(['changeSence'])
let attrArr = ref<AttrList>([])
let saleArr = ref<SpuAttr[]>([])
let imgArr = ref<SpuImage[]>([])
let skuParams = ref<SkuData>({
  category3Id: undefined,
  spuId: undefined,
  tmId: undefined,
  skuName: '',
  price: undefined,
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
let table = ref<TableInstance>()
const initAddSku = async (c1Id: number, c2Id: number, spu: SpuData) => {
  // 收据spu数据
  skuParams.value.category3Id = spu.category3Id
  skuParams.value.spuId = spu.id
  skuParams.value.tmId = spu.tmId
  // 获取平台属性
  let res1: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id!)
  // 获取销售属性
  let res2: SpuAttrResponseData = await reqSpuSaleAttrList(spu.id!)
  // 获取图片墙
  let res3: SpuImageResponseData = await reqSpuImageList(spu.id!)
  // 存储
  attrArr.value = res1.data
  saleArr.value = res2.data
  imgArr.value = res3.data
}
// 设置默认图片
const setDefault = (row: SpuImage) => {
  // 取消所有勾选
  imgArr.value.forEach((item) => table.value?.toggleRowSelection(item, false))
  skuParams.value.skuDefaultImg = row.imgUrl
  // 勾选选中行
  table.value?.toggleRowSelection(row, true)
}
// 保存
const save = async () => {
  skuParams.value.skuAttrValueList = attrArr.value.reduce(
    (
      prev: {
        attrId: number
        valueId: number
      }[],
      next,
    ) => {
      if (next.attrItem) {
        let [attrId, valueId] = next.attrItem.split(':')
        let obj = {
          attrId: +attrId,
          valueId: +valueId,
        }
        prev.push(obj)
      }
      return prev
    },
    [],
  )
  saleArr.value.forEach((item) => {
    if (item.saleItem) {
      let [saleId, saleValueId] = item.saleItem.split(':')
      let obj = {
        saleAttrId: +saleId,
        saleAttrValueId: +saleValueId,
      }
      skuParams.value.skuSaleAttrValueList!.push(obj)
    }
  })
  let res = await reqAddSku(skuParams.value)
  if (res.code == 200) {
    ElMessage.success('添加sku成功')
    $emit('changeSence', {
      flag: 0,
      params: '',
    })
  } else {
    ElMessage.error('添加失败')
  }
}
defineExpose({ initAddSku })
</script>

<style scoped></style>
