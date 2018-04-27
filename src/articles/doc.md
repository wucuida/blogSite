# wucd 数据结构

## 文章数据结构
| 字段 | 类型 | 必须 | 备注 |
|------|------|------|------|
| id | String | - | 文章标识，创建时间时间戳_4位随机数的格式 |
| title | String | true | 文章标题 |
| createTime | Long | true | 文章创建时间 |
| updateTime | Long | true | 文章更新时间 |
| summary | String | true | 文章概要 |

## 标签数据结构
| 字段 | 类型 | 备注 |
| -----| --- | ----- |
| id | String | 标签标识 |
| name | String | 标签名称 |

## 绑定关系
| 字段 | 类型 | 备注 |
| ---- |  ---- | -----|
| id | String | 绑定标识 |
| type | Integer | 绑定类型, 0: 文章-标签 |
| source | String | 绑定源 |
| target | String | 绑定目标 |
### example
```
{
	"id": "xxx",
	"type": 0,
	"source": "文章id",
	"target": "标签id"
}
```
