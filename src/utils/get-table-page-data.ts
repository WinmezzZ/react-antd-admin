import type { PageData } from '@/interface';

export const getTableData = <T extends any[]>(pageNum = 1, pageSize = 10, totalData: T) => {
  const total: number = totalData.length;
  const tableData: PageData<T[0]> = {
    data: [],
    pageNum,
    pageSize,
    total,
  };

  if (pageSize >= total) {
    //pageSize大于等于总数据长度，说明只有1页数据或没有数据
    tableData.data = totalData;
    tableData.pageNum = 1; //直接取第一页
  } else {
    //pageSize小于总数据长度，数据多余1页
    const num = pageSize * (pageNum - 1); //计算当前页（不含）之前的所有数据总条数

    if (num < total) {
      //如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
      const startIndex = num; //当前页第一条数据在总数据集中的索引
      const endIndex = num + pageSize - 1; //当前页最后一条数据索引

      tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex); //当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
    } else {
      //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
      const size = Math.ceil(total / pageSize); //取商
      const rest = total % pageSize; //取余数

      if (rest > 0) {
        //余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
        tableData.pageNum = size + 1; //当前页码重置，取size+1
        tableData.data = totalData.filter((_, index) => index >= pageSize * size && index <= total);
      } else if (rest === 0) {
        //余数等于0，最后一页数据条数正好是pageSize
        tableData.pageNum = size; //当前页码重置，取size
        tableData.data = totalData.filter((_, index) => index >= pageSize * (size - 1) && index <= total);
      } //注：余数不可能小于0
    }
  }

  return tableData;
};
