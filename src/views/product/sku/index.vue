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
            @click="viewSkuInfo(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="Delete"
            title="删除"
            @click="deleteSku(row)"
          ></el-button>
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
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo?.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo?.skuAttrValueList" :key="item.id">
              {{ item.attrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo?.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import {
  reqGetSku,
  reqUpSku,
  reqDowmSku,
  reqSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
import { ElMessage } from 'element-plus'
import type {
  SkuResponseData,
  SkuInfoResponseData,
  SkuData,
} from '@/api/product/sku/type'
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let records = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>()
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
// 查看sku信息
const viewSkuInfo = async (row: SkuData) => {
  drawer.value = true
  let res: SkuInfoResponseData = await reqSkuInfo(row.id!)
  if (res.code == 200) {
    skuInfo.value = res.data
  }
}
// 删除某个sku
const deleteSku = async (row: SkuData) => {
  let res: any = await reqDeleteSku(row.id!)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getSku(currentPage.value, pageSize.value)
  } else {
    ElMessage.error('删除失败')
  }
}

watchEffect(() => {
  getSku(currentPage.value, pageSize.value)
})
onMounted(() => {
  getSku()
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
