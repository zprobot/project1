<template>
  <div>
    <!--三级分类组件-->
    <Category :mode="showTable" />
    <el-card style="margin: 10px 0">
      <div v-if="showTable">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table style="margin: 10px 0" border :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                width="220"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="DeleteFilled"
                icon-color="#626AEF"
                title="你确定要删除该属性吗？"
                @confirm="deleteAttr(row)"
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
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table border :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值">
            <template v-slot="{ row, $index }">
              <el-input
                v-if="row.flag"
                size="small"
                placeholder="请输入属性值"
                v-model="row.valueName"
                @blur="toLook(row, $index)"
                :ref="(e: InputInstance) => (inputArr[$index] = e)"
              />
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ $index }">
              <el-button
                type="primary"
                icon="Delete"
                size="small"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import type { InputInstance } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import type {
  AttrResponseData,
  AttrList,
  Attr,
  AttrValue,
} from '@/api/product/attr/type'
const categoryStore = useCategoryStore()
// 存储已有属性
let attrArr = ref<AttrList>([])
// 模态切换
let showTable = ref<boolean>(true)
// 收集新增数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: undefined,
  categoryLevel: 3,
})
// 存储input实例
let inputArr = ref<InputInstance[]>([])

watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上次的数据
    attrArr.value = []
    // 确认三级id存在
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let res: AttrResponseData = await reqAttr(
    c1Id as number,
    c2Id as number,
    c3Id as number,
  )
  if (res.code == 200) {
    attrArr.value = res.data
  }
}
// 增加属性
const addAttr = () => {
  // 点击时删除上一次收集的数据
  Object.assign(attrParams, {
    id: undefined,
    attrName: '',
    attrValueList: [],
    categoryId: undefined,
    categoryLevel: 3,
  })
  showTable.value = false
  // 收集三级分类id
  attrParams.categoryId = categoryStore.c3Id
}
// 修改属性
const updateAttr = (row: Attr) => {
  // Object.assign是浅拷贝 需要深拷贝一份row，否则影响原数组
  // Json.parse(Json.stringify()) 来返回一个新对象
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  showTable.value = false
}
// 删除属性
const deleteAttr = async (row: AttrValue) => {
  let res: any = await reqDeleteAttr(row.id as number)
  if (res.code == 200) {
    getAttr()
    ElMessage.success('删除成功')
  } else {
    ElMessage.success('删除失败')
  }
}

// 增加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '', flag: true })
  // 响应式数据发生变化后获取更新后的dom
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
// 查看模式
const toLook = (row: AttrValue, $index: number) => {
  // 属性值非空判断
  if (row.valueName.trim().length == 0) {
    // 为空时直接删除
    attrParams.attrValueList.splice($index, 1)
    ElMessage.warning('属性值不能为空')
    return
  }
  // 属性重复判断
  let repeat = attrParams.attrValueList.find((item) => {
    // 排除自身
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 重复时删除
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能重复')
  }
  row.flag = false
}
// 编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  //  响应式数据发生变化后获取下一次dom实例
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 取消操作
const cancel = () => {
  showTable.value = true
}
// 保存
const save = async () => {
  // 发送请求
  let res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code == 200) {
    showTable.value = true
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    // 重新发请求获取属性数据
    getAttr()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}
onBeforeMount(() => {
  // 组件销毁时清理仓库数据
  categoryStore.$reset()
})
</script>

<style scoped></style>
