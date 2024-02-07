<template>
  <div>
    <Category :mode="showTable" />
    <el-card style="margin: 20px 0">
      <!--场景0-->
      <div v-show="sence == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu(categoryStore.c3Id!)"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="InfoFilled"
                title="查看SKU列表"
                @click="overviewSku(row)"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="Delete"
                title="删除SPU"
                @click="deleteSpu(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9]"
          background
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <SpuFrom v-show="sence == 1" @changeSence="changeSence" ref="spu" />
      <SkuForm v-show="sence == 2" @changeSence="changeSence" ref="sku" />
      <el-dialog title="Sku列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="sku名字" prop="skuName"></el-table-column>
          <el-table-column label="sku价格" prop="price"></el-table-column>
          <el-table-column label="sku重量" prop="weight"></el-table-column>
          <el-table-column label="sku图片">
            <template v-slot="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
import SpuFrom from './spuForm/index.vue'
import SkuForm from './skuForm/index.vue'
import type {
  SpuResponseData,
  SkuResponseData,
  Records,
  SpuData,
  SkuData,
} from '@/api/product/spu/type'
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let categoryStore = useCategoryStore()
// 场景切换
let sence = ref<number>(0)
// 模态切换
let showTable = ref<boolean>(true)
// 记录
let records = ref<Records>([])
// 总条目
let total = ref<number>(0)
// sku数据
let skuArr = ref<SkuData[]>()
// 对话框展示
let show = ref<boolean>(false)
// 组件实例
let spu = ref<any>()
let sku = ref<any>()
const handleSizeChange = () => {
  getHasSpu()
}
const handleCurrentChange = () => {
  getHasSpu(currentPage.value)
}
// 获取已有的spu
const getHasSpu = async (current = 1) => {
  currentPage.value = current
  let res: SpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.c3Id as number,
  )
  if (res.code == 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
// 添加spu
const addSpu = (c3Id: number) => {
  showTable.value = false
  sence.value = 1
  spu.value.initAddSpuData(c3Id)
}
// 添加sku
const addSku = (row: SpuData) => {
  showTable.value = false
  sence.value = 2
  sku.value.initAddSku(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 修改spu
const updateSpu = (row: SpuData) => {
  showTable.value = false
  sence.value = 1
  spu.value.initHasSpuData(row)
}
watch(
  () => categoryStore.c3Id,
  () => {
    if (categoryStore.c3Id) {
      getHasSpu()
    }
  },
)
// 查看sku列表
const overviewSku = async (row: SpuData) => {
  let res: SkuResponseData = await reqSkuInfo(row.id!)
  if (res.code === 200) {
    skuArr.value = res.data
    show.value = true
  }
}
// 删除spu
const deleteSpu = async (row: SpuData) => {
  let res: any = await reqDeleteSpu(row.id!)
  if (res.code == 200) {
    getHasSpu(
      records.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
const changeSence = (obj: { flag: number; params: string }) => {
  //给子组件的回调用于切换场景
  sence.value = obj.flag
  if (obj.params == 'update') {
    // 重新获取数据
    getHasSpu(currentPage.value)
  } else {
    getHasSpu()
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
