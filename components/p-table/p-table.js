// components/p-table/p-table.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 表格的高度
    height: {
      type: String,
      value: '400px'
    },
    // 是否显示多选列
    isShowSelection: {
      type: Boolean,
      value: false
    },
    // 是否显示序号列
    isShowId:{
      type: Boolean,
      value: false
    },
    // 是否固定首行
    fixed: {
      type: Boolean,
      value: false
    },
    // 是否显示操作列
    isOperation: {
      type: Boolean,
      value: true
    },
    // 定义字段
    colName: {
      type: Array,
      value: [
        { prop: 'username', label: '用户名' },
        { prop: 'gender', label: '性别' },
        { prop: 'birthday', label: '生日' }
      ]
    },
    // 表格数据
    tableData: {
      type: Array,
      value: [
        {
          username: '张三',
          gender: '男',
          birthday: '1997-01-22'
        },
        {
          username: '李四',
          gender: '男',
          birthday: '1997-11-12'
        },
        {
          username: '王五',
          gender: '女',
          birthday: '2000-08-22'
        },
      ]
    },
    // 表格标题
    title: {
      type: String,
      value: ''
    }
  },
  // 外部传入的样式
  externalClasses: ['checkbox'],

  /**
   * 组件的初始数据
   */
  data: {
    value: '',  // 再次添加清空表单
    showModal: false,  // 显示修改Modal
    showAddModal: false, // 显示添加Modal
    deleteTipsModal: false, // 删除提示Modal
    isSelected: false,  // 多选状态
    scrollLeft: 0,  // 右边的坐标，控制首行
    currentIndex: Number  // 存放修改的当前下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 多选事件 
     */
    handleSelectionChange() {
      var that = this
      this.setData({
        isSelected: !that.data.isSelected
      })
    },

    // 实现表头横向的滚动
    handelScrollLeft(e) {
      if(this.properties.fixed) {
        this.setData({
          scrollLeft: -e.detail.scrollLeft
        })
      }
    },
    // 删除事件
    handelDelete(e) {
      // console.log(e.currentTarget.dataset['index'])
      const index = e.currentTarget.dataset['index']
      var that = this
      this.setData({
        deleteTipsModal: true,
        currentIndex: index,
        currentTableData: this.properties.tableData[index]
      })
      // wx.showModal({
      //   title: '提示',
      //   content: '确认删除吗？',
      //   confirmColor: 'red', 
      //   success: (res) => {
      //     if(res.confirm) {
      //       // console.log('删除成功')
      //       wx.showToast({
      //         title: '删除成功',
      //         duration: 1000
      //       })
      //       this.properties.tableData.splice(index, 1)
      //       var that = this
      //       this.setData({
      //         tableData: that.properties.tableData
      //       })
      //     }else {
      //       wx.showToast({
      //         title: '取消删除',
      //         duration: 1000
      //       })
      //       // console.log("取消删除")
      //     }
      //   }
      // })
    },
    // 确认删除
    confirmDelete() {
      this.properties.tableData.splice(this.data.currentIndex, 1)
      var that = this
      this.setData({
        tableData: that.properties.tableData
      })
      wx.showToast({
        title: '删除成功',
        mask: true,  // 显示遮罩，防止穿透点击
        duration: 3000
      })
    },
    // 取消删除
    cancelDelete() {
      wx.showToast({
        title: '取消删除',
        mask: true, // 显示遮罩，防止穿透点击
        duration: 2000
      })
    },
    // 修改事件
    handelUpdate(e) {
      const index = e.currentTarget.dataset.index
      // console.log(index)
      var that = this
      this.setData({
        showModal: true,
        currentIndex: index,
        currentTableData: this.properties.tableData[index]
      })
    },
    // 确认修改事件
    update(e) {
      const tableItem = e.detail.value
      this.properties.tableData.splice(this.data.currentIndex,1,tableItem)
      var that = this
      wx.showToast({
        title: '修改成功',
        mask: true  // 显示遮罩，防止穿透点击
      })
      this.setData({
        showModal: false,
        tableData: that.properties.tableData
      })
      // console.log(this.properties.tableData)
    },
    // 关闭Modal
    back () {
      this.setData({
        showModal: false,
        showAddModal: false
      })
    },
    // 点击取消
    modalCancel() {
      
    },
    // 点击确定
    modalConfirm(e) {
      console.log("ooo")
    },
    // 新增按钮点击事件
    addBtn() {
      this.setData({
        showAddModal: true,
        value: ''   // 每次点击新增按钮清空新增modal框的value，才可以使页面刷新
      })
    },
    // 新增表格数据
    addTableData(e) {
      console.log(e.detail.value)
      wx.showToast({
        title: '添加成功',
        mask: true
      })
      var that = this
      this.setData({
        showAddModal: false,
        tableData: that.properties.tableData.concat(e.detail.value),
      })
    }
  }
})
