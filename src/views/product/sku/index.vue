<template>
  <el-card>
    <el-table border style="margin: 20px 0" :data="records">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="250px">
        <template v-slot="{ row }">
          <el-button
            :type="row.isSale == 1 ? 'info' : 'primary'"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            :title="row.isSale == 1 ? '下架' : '上架'"
            @click="updateSaleStatus(row)"
          ></el-button>
          <el-button type="primary" icon="Edit" title="编辑"></el-button>
          <el-button
            type="primary"
            icon="InfoFilled"
            title="完整信息"
          ></el-button>
          <el-button type="primary" icon="Delete" title="删除"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      background
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { reqGetSku, reqUpSku, reqDowmSku } from '@/api/product/sku'
import { ElMessage } from 'element-plus'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let records = ref<SkuData[]>([])
const getSku = async (current = 1, limit = 10) => {
  currentPage.value = current
  pageSize.value = limit
  let res: SkuResponseData = await reqGetSku(currentPage.value, pageSize.value)
  if (res.code == 200) {
    total.value = res.data.total
    records.value = res.data.records
  }
}
// 更新商品状态
const updateSaleStatus = async (row: SkuData) => {
  if (row.isSale == 1) {
    // 为一时为上架状态,点击更新为下架状态
    let res: any = await reqDowmSku(row.id!)
    if (res.code == 200) {
      ElMessage.success('下架成功')
      getSku(currentPage.value, pageSize.value)
    } else {
      ElMessage.error('下架失败')
    }
  } else {
    let res: any = await reqUpSku(row.id!)
    if (res.code == 200) {
      ElMessage.success('上架成功')
      getSku(currentPage.value, pageSize.value)
    } else {
      ElMessage.error('上架失败')
    }
  }
}
watchEffect(() => {
  getSku(currentPage.value, pageSize.value)
})
onMounted(() => {
  getSku()
})
</script>

<style scoped></style>
