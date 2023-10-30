import { request } from './axios'

export class DataService {
    // 添加一条数据
    static async CreateOne(table: string, params: any) {
        return request(`/v5/classes/${table}`, params, 'post')
    }
    // 删除一条数据
    static async DeleteOne(table: string, id: string) {
        return request(`/v5/classes/${table}/${id}`, {}, 'delete')
    }
    // 修改一条数据
    static async UpdateOne(table: string, id: string, params: any) {
        return request(`/v5/classes/${table}/${id}`, params, 'put')
    }
    // 查询一条数据
    static async ReadOne(table: string, id: string) {
        return request(`/v5/classes/${table}/${id}`, {}, 'get')
    }
    // 查询全部数据（分页查询）
    static async ReadAll(table: string, page: number, size: number) {
        return request(
            `/v5/classes/${table}?page=${page}&size=${size}`,
            {},
            'get',
        )
    }
}
