# p-table
小程序封装的表格组件


# 使用说明：
    title: (String类型) 表格标题
    height: （String类型，默认高度400px）表格的高度
    isShowId: （boolean类型，默认false）是否显示序号列 
    isShowSelection: （boolean类型，默认false）是否显示多选列
    isOperation: (boolean类型，默认true) 是否显示操作列
    fixed: （boolean类型，默认false）是否固定首行
    checkbox: 多选样式
    currentCheckedIndexs: 当前选中事件
    colName: 表格字段json格式：
    colName: [
      { prop: 'username', label: '用户名' },
      { prop: 'gender', label: '性别' },
      { prop: 'birthday', label: '生日' },
      { prop: 'cla', label: '班级' },
      { prop: 'age', label: '年龄' },
      { prop: 'star', label: '星座' }
    ],
    tableData: 表格数据json格式：
    tableData: [
      {
        username: '张三',
        gender: '男',
        birthday: '1997-01-22',
        cla: '2班',
        age: 18,
        star: "射手座"
      },
      {
        username: '李四',
        gender: '男',
        birthday: '1997-11-12',
        cla: '2班',
        age: 23,
        star: "射手座"
      }]