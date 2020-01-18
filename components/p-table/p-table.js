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
    hiddenColModal: false, // 显示隐藏弹窗
    isSelected: false,  // 多选状态
    isHiddenCol: {}, // 隐藏列
    currentHiddenCol: {},
    scrollLeft: 0,  // 右边的坐标，控制首行
    currentIndex: Number,  // 存放修改的当前下标
    currentTableData: Array,  // 当前显示的单一表格数据
    currentCheckedIndexs: [], // 当前选中的所有数据下标
    showColIndex: [0,1,2,3,4,5]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 多选事件 
     */
    handleSelectionChange() {
      // 点击全选时先清空当前选中的所有下标
      this.data.currentCheckedIndexs = []
      this.setData({
        isSelected: !this.data.isSelected
      })
      // 全选时
      if(this.data.isSelected){
        console.log(this.properties.tableData.length)
        for(let i = 0;i < this.properties.tableData.length;i++) {
          this.data.currentCheckedIndexs.push(i)
        }
      }else {  // 取消全选时
        this.data.currentCheckedIndexs = []
      }
      // 向外传递一个当前选中事件以获取选中的数组
      this.triggerEvent("currentCheckedIndexs",this.data.currentCheckedIndexs)
      // console.log(this.data.currentCheckedIndexs)
    },

    // 实现表头横向的滚动
    handelScrollLeft(e) {
      this.setData({
        scrollLeft: -e.detail.scrollLeft
      })
    },
    // 删除事件
    handelDelete(e) {
      // console.log(e.currentTarget.dataset['index'])
      const index = e.currentTarget.dataset.index
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
      this.setData({
        tableData: this.properties.tableData
      })
      wx.showToast({
        title: '删除成功',
        mask: true,  // 显示遮罩，防止穿透点击
      })
    },
    // 取消删除
    cancelDelete() {
      wx.showToast({
        title: '取消删除',
        icon: 'none',
        mask: true, // 显示遮罩，防止穿透点击
        duration: 1000
      })
    },
    // 修改事件
    handelUpdate(e) {
      const index = e.currentTarget.dataset.index
      // console.log(index)
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
      wx.showToast({
        title: '修改成功',
        mask: true  // 显示遮罩，防止穿透点击
      })
      this.setData({
        showModal: false,
        tableData: this.properties.tableData
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
      console.log("点击了确认")
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
      this.setData({
        tableData: this.properties.tableData.concat(e.detail.value),
        showAddModal: false,
      })
    },

    // 选择某一行的事件
    handelChecked(e) {
      const index = e.currentTarget.dataset.index  // 获取当前选中的下标值
      // this.data.currentTableData.push("aaa")
      // console.log(this.data.currentCheckedIndexs instanceof Array)
      // 判断选中数组中是否含有该下标，如果没有才进行插入，否则会乱套的
      if(!this.data.currentCheckedIndexs.includes(index)){
        this.data.currentCheckedIndexs.push(index)
        // this.setData({
        //   /**
        //    * 注意：push方法返回的是数组的长度而不是数组，而concat返回的是添加后新的数组，另外在这里没有涉及到界面的更新，所以不需要用setData方法给其赋值
        //    */
        //   // currentCheckedIndexs: this.data.currentCheckedIndexs.push(index),
        //   // currentCheckedIndexs: this.data.currentCheckedIndexs.concat(index) 
        // })
      }else {
        for(let i = 0;i < this.data.currentCheckedIndexs.length;i++){
          if(this.data.currentCheckedIndexs[i] === index){
            this.data.currentCheckedIndexs.splice(i,1)
          }
        }
      }
      // 向外传递一个当前选中事件
      this.triggerEvent("currentCheckedIndexs", this.data.currentCheckedIndexs)
      // console.log(this.data.currentCheckedIndexs)
    },

    hiddenColBtn() {
      this.setData({
        hiddenColModal: true
      })
    },
    // 多选择事件
    clickCheck(e) {
      const prop = e.currentTarget.dataset.prop
      this.data.isHiddenCol[prop] = !this.data.isHiddenCol[prop]
      this.setData({
        isHiddenCol: this.data.isHiddenCol
      })
      // console.log(!this.data.currentHiddenCol[prop])
      // console.log(this.data.isHiddenCol)
      // console.log(this.data.currentHiddenCol)
    },
    // 确认隐藏事件
    confirmHidden() {
      // console.log("-----")
      // this.setData({
      //   isHiddenCol: this.data.currentHiddenCol
      // })
    }
    
  },
  lifetimes: {
    attached: function () {
      for (let i of this.properties.colName) {
        const prop = i.prop
        this.data.isHiddenCol[prop] = true
        this.data.currentHiddenCol[prop] = true
      }
      this.setData({
        isHiddenCol: this.data.isHiddenCol
      })
      // console.log("aaaa")
      // this.data.courrentHiddenCol = this.data.isHiddenCol
      // console.log(this.data.currentHiddenCol)
    }
  },
})
