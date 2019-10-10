import qs from 'qs'

/* 转换数据为URLSearchParams */
export function qsStringify (data, type = 'stringify') {
    return qs[type](data)
}
