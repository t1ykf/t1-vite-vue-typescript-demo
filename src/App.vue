<script setup lang="ts">
import { ref } from 'vue'
import { DataService } from './api/api.ts'
import { ElMessage } from 'element-plus'

// 表名
const table = 'student'
// 数据唯一ID
const objectID = ref()

// 表结构
interface Student {
    name: string
    age: number
    sex: string
}
// 数据
const textarea: Student = {
    name: '王华',
    age: 21,
    sex: '男',
}

// 创建一条数据
const CreateOne = () => {
    DataService.CreateOne(table, textarea).then((res: any) => {
        // 创建成功
        objectID.value = res.data.objectId
        ElMessage.success(res.message)
    })
}

// 删除一条数据
const DeleteOne = () => {
    DataService.DeleteOne(table, objectID.value).then((res: any) => {
        // 删除成功
        ElMessage.success(res.message)
    })
}

// 修改一条数据
const UpdateOne = () => {
    DataService.UpdateOne(table, objectID.value, { $set: { age: 22 } }).then(
        (res: any) => {
            // 修改成功
            ElMessage.success(res.message)
        },
    )
}

const result = ref()
// 查询一条数据
const ReadOne = () => {
    DataService.ReadOne(table, objectID.value).then((res: any) => {
        // 查询成功
        result.value = res.data.data
        ElMessage.success(res.message)
    })
}

// 查询全部数据（分页查询）
const ReadAll = () => {
    DataService.ReadAll(table, 1, 10).then((res: any) => {
        // 查询成功
        result.value = res.data.data
        ElMessage.success(res.message)
    })
}
</script>

<template>
    <div>
        <el-button-group>
            <el-button
                type="success"
                size="small"
                icon="Plus"
                @click="CreateOne"
                >添加一条数据</el-button
            >
            <el-button type="danger" size="small" icon="Plus" @click="DeleteOne"
                >删除一条数据</el-button
            >
            <el-button
                type="warning"
                size="small"
                icon="Plus"
                @click="UpdateOne"
                >修改一条数据</el-button
            >
            <el-button type="success" size="small" icon="Plus" @click="ReadOne"
                >查询一条数据</el-button
            >
            <el-button type="success" size="small" icon="Plus" @click="ReadAll"
                >查询全部数据</el-button
            >
        </el-button-group>
        <br /><br />
        <el-text size="small">{{ result }}</el-text>
    </div>
</template>

<style scoped></style>
